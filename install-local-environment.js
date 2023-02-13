const compose = require('docker-compose')
const path = require('path')
const { setTimeout } = require('timers/promises')

async function init() {
    let taskName = '';

    console.log ('Starting installation of local environment.');

    await downloadDockerImage().then(async () => {
        await startServerContainer().then(async () => {
            await installPlugins().then(async () => {
                await installThemes().then(async () => {
                    await installAddonsAndCleanup().then(async () => {
                        console.log('Finished installing WordPress on localhost. Looking for content to import...')
                        if (path.existsSync('./content.xml')) {
                            compose.run(
                                'wordpress-cli',
                                'wp import ./content.xml --verbose --authors=create',
                                { cwd: path.join(__dirname), commandOptions: ['--rm'] })
                                .then(
                                    () => { console.log('Content import finished successfully.')},
                                    err => { console.log('Content import failed:', err)}
                                );
                        } else {
                            console.log('Missing content import file (content.xml).');
                        }
                    })
                })
            })
        });
    });
}

init().catch(console.error.bind(console));

async function downloadDockerImage() {
    console.log('Dowload WordPress docker image...');
    return await compose.pullAll({ cwd: path.join(__dirname), log: true});
}

async function startServerContainer() {
    console.log('Start WordPress server docker container...');
    return await compose.upAll({ cwd: path.join(__dirname), log: true, commandOptions: ['--force-recreate', '--build']});
}
async function installCore() {
    console.log('Configure Wordpress core and admin...');
    return await compose.run(
        'wordpress-cli',
        'wp core install --path=/var/www/html --url=http://localhost:8000" --title=TestSetup --admin_user=admin --admin_password=secret --admin_email=foo@bar.com --verbose',
        { cwd: path.join(__dirname), commandOptions: ['--rm'] })
}
async function installPlugins() {
    console.log('Install WordPress plugins...');
    return await compose.run(
        'wordpress-cli',
        /* specify the technical names (text domain) of plugins to be installed */
        'wp plugin install --activate --verbose updraftplus',
        { cwd: path.join(__dirname), commandOptions: ['--rm'] });
}

async function installThemes() {
    console.log('Install and activate WordPress themes...');
    /*  add and activate (child) themes for your project here: */
    await compose.run(
        'wordpress-cli',
        'wp theme install --activate --verbose twentytwentythree',
        { cwd: path.join(__dirname), commandOptions: ['--rm'] });
}
async function installAddonsAndCleanup() {
    console.log('Install additional components and cleaning up...');
    await compose.run(
        'wordpress-cli',
        'wp language core install --activate --verbose de_DE',
        { cwd: path.join(__dirname), commandOptions: ['--rm'] })
        .then(
            () => { console.log('Installed core languages')},
            err => { console.log('something went wrong:', err.message)}
        );

    await compose.run(
        'wordpress-cli',
        'wp language plugin install --all --verbose de_DE',
        { cwd: path.join(__dirname), commandOptions: ['--rm'] })
        .then(
            () => { console.log('Installed plugin languages')},
            err => { console.log('something went wrong:', err.message)}
        );

    await compose.run(
        'wordpress-cli',
        'wp language theme install --all --verbose de_DE',
        { cwd: path.join(__dirname), commandOptions: ['--rm'] })
        .then(
            () => { console.log('Installed theme languages')},
            err => { console.log('something went wrong:', err.message)}
        );

    await compose.run(
        'wordpress-cli',
        'wp theme delete twentytwentytwo twentytwentyone twentytwenty twentynineteen twentyseventeen twentysixteen twentyfifteen twentyfourteen twentythirteen twentytwelve twentyeleven twentyten --verbose',
        { cwd: path.join(__dirname), commandOptions: ['--rm'] })
        .then(
            () => { console.log('Deleted unnsecessary themes')},
            err => { console.log('something went wrong:', err.message)}
        );

    compose.run(
        'wordpress-cli',
        'wp plugin delete akismet hello --verbose',
        { cwd: path.join(__dirname), commandOptions: ['--rm'] })
        .then(
            () => { console.log('Deleted unnsecessary plugins')},
            err => { console.log('something went wrong:', err.message)}
        );
}

