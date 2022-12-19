const compose = require('docker-compose')
const path = require('path')
const { setTimeout } = require('timers/promises')

async function init() {
    await compose.pullAll({ cwd: path.join(__dirname), log: true})
        .then(
        () => { console.log('Downloaded newest Wordpress Version')},
        err => { console.log('something went wrong:', err.message)}
        );

    await compose.upAll({ cwd: path.join(__dirname), log: true, commandOptions: ['--force-recreate', '--build']})
        .then(
        () => { console.log('Started Wordpress Server')},
        err => { console.log('something went wrong:', err.message)}
        );
    
    await setTimeout(10000);

    await compose.run(
        'wordpress-cli',
        'wp core install --path=/var/www/html --url=http://localhost:8000" --title=TestSetup --admin_user=admin --admin_password=secret --admin_email=foo@bar.com',
        { cwd: path.join(__dirname), commandOptions: ['--rm'] })
        .then(
        () => { console.log('Configured Core')},
        err => { console.log('something went wrong:', err.message)}
        );

    await compose.run(
        'wordpress-cli',
        'wp theme activate wordpress_theme_foodtogether',
        { cwd: path.join(__dirname), commandOptions: ['--rm'] })
        .then(
        () => { console.log('Activated Theme')},
        err => { console.log('something went wrong:', err.message)}
        );

    compose.run(
        'wordpress-cli',
        'wp plugin delete akismet hello',
        { cwd: path.join(__dirname), commandOptions: ['--rm'] })
        .then(
        () => { console.log('Deleted unnsecessary plugins')},
        err => { console.log('something went wrong:', err.message)}
        );

    compose.run(
        'wordpress-cli',
        'wp theme delete twentytwentytwo twentytwentyone twentytwenty twentynineteen twentyseventeen twentysixteen twentyfifteen twentyfourteen twentythirteen twentytwelve twentyeleven twentyten',
        { cwd: path.join(__dirname), commandOptions: ['--rm'] })
        .then(
        () => { console.log('Deleted unnsecessary themes')},
        err => { console.log('something went wrong:', err.message)}
        );

    await compose.run(
        'wordpress-cli',
        /* specify the technical names (text domain) of plugins to be installed */
        'wp plugin install updraftplus --activate',
        { cwd: path.join(__dirname), commandOptions: ['--rm'] })
        .then(
        () => { console.log('Installed remote plugins')},
        err => { console.log('something went wrong:', err.message)}
        );
    
    await compose.run(
        'wordpress-cli',
        'wp language core install de_DE --activate',
        { cwd: path.join(__dirname), commandOptions: ['--rm'] })
        .then(
        () => { console.log('Installed core languages')},
        err => { console.log('something went wrong:', err.message)}
        );

    await compose.run(
        'wordpress-cli',
        'wp language plugin install --all de_DE',
        { cwd: path.join(__dirname), commandOptions: ['--rm'] })
        .then(
        () => { console.log('Installed plugin languages')},
        err => { console.log('something went wrong:', err.message)}
        );

    await compose.run(
        'wordpress-cli',
        'wp language theme install --all de_DE',
        { cwd: path.join(__dirname), commandOptions: ['--rm'] })
        .then(
        () => { console.log('Installed theme languages')},
        err => { console.log('something went wrong:', err.message)}
        );

    compose.run(
        'wordpress-cli',
        'wp language core update',
        { cwd: path.join(__dirname), commandOptions: ['--rm'] })
        .then(
        () => { console.log('Updated core languages')},
        err => { console.log('something went wrong:', err.message)}
        );

    compose.run(
        'wordpress-cli',
        'wp language plugin update --all',
        { cwd: path.join(__dirname), commandOptions: ['--rm'] })
        .then(
        () => { console.log('Updated plugin languages')},
        err => { console.log('something went wrong:', err.message)}
        );

    compose.run(
        'wordpress-cli',
        'wp language theme update --all',
        { cwd: path.join(__dirname), commandOptions: ['--rm'] })
        .then(
        () => { console.log('Updated theme languages')},
        err => { console.log('something went wrong:', err.message)}
        );

    compose.run(
        'wordpress-cli',
        'wp option update show_avatars 0',
        { cwd: path.join(__dirname), commandOptions: ['--rm'] })
        .then(
        () => { console.log('Disabled Avatars')},
        err => { console.log('something went wrong:', err.message)}
        );

    compose.run(
        'wordpress-cli',
        'wp import ./content.xml --authors=create',
        { cwd: path.join(__dirname), commandOptions: ['--rm'] })
        .then(
        () => { console.log('Added exported content')},
        err => { console.log('something went wrong:', err.message)}
        );
}

init();