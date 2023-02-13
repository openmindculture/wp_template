# WordPress Template / Starter Theme Boilerplate

[wp_template](https://github.com/openmindculture/wp_template) is a simple local host WordPress setup using Docker, docker-compose, wp-cli, and SCSS to install, develop, and test themes and plugins. It was forked from [wp_cli_docker](https://github.com/openmindculture/wp_cli_docker). This template can help you build a classic (child) theme from scratch (without exporting from the block editor), that follows the official WordPress coding standards.

- The theme in a subdirectory of `/themes` will be rebuilt when `/src` files have changed.
- Use SCSS and write verbose code in `/src`.
- Add or configure other build tools, like minifying or transpiling if needed.
- Create a zip archive of that subdirectory to export the theme to another WordPress installation.

To persist important content like example posts or pages, use the default WordPress exporter to save an XML export as `content.xml`, which will automatically be imported when setting up the local environment using `npm install`.

## Usage

- `npm start` should set up WordPress on http://localhost:8000/
- `npm run watch` adds file watcher to automatically rebuild the theme.
- `npm stop` stops the server without destroying data and configuration.
- `npm run destroy` removes the installation and its data.

## Requirements

- npm
- Docker
- docker-compose

## Configuration

### Set Theme name and Target Directory

- Create a subdirectory below `themes` matching your theme name.
- Open `package.json` and edit `build:core`, `"build:scss:sass:theme`, `build:scss:postcss:theme` etc. accordingly.
- Edit `build:core` to make sure all necessary files will be exported.
- Edit your `style.css` and `theme.json` to match name, author, version etc.

### Configure pre-installed Themes and Plugins

Modify [install-local-environment.js](./install-local-environment.js) to select which themes and plugins will be installed automatically using `wp-cli`. You must specify the technical names (text domains), not the current titles! The technical names are the same as the directory names in the plugin paths.

```js
/* specify the technical names (text domain) of plugins to be installed */
'wp plugin install incompatibility-status updraftplus --activate';
```

Some commercial / paid plugins cannot be installed automatically. They have to be uploaded or installed manually later.

### Configure WordPress Core, Web Server, PHP Version used

Modify [docker/WordPress.Dockerfile](./docker/WordPress.Dockerfile) to choose one of various predefined configurations using different PHP versions like 7.4, 8.0, 8.1 etc. and popular web servers like Apache or nginx to copy our customer's web hosting provider's technical setup as good as possible.

See https://hub.docker.com/_/wordpress/ for available docker tags, or keep `wordpress:latest` for the newest (latest) stable release.

```Dockerfile
FROM wordpress:latest
# use other tags in docker/wordpress.Dockerfile to test specific versions, see
# https://hub.docker.com/_/wordpress/
# FROM wordpress:6.1.1-php8.0-apache
```

## Inspection

To facilitate debugging, `plugins` is mounted as a local directory, so you can search files and view error messages and annotations, to collect details for filing issues or for creating patches yourself.

You can enter the Docker container and use it much like a remote server.

Type

`docker exec -it wordpress_setup_test_wordpress_1 bash`

Replace `wp_cli_docker_wordpress_1` with the appropriate name found in `docker ps`, if necessary.

Inside the docker container, you will find WordPress in `/var/www/html`.

## Stop, Clean Up, Uninstall

- stop the current server by exiting the process (by pressing `Ctrl C` or your operating system's break key), or type
- `npm stop`

After stopping the server, the data will still be ready for another session and for inspection and backup of plugin files.

Use

`npm run destroy`

to remove the installation.

## Development

Follow the [detailled WordPress plugin development guidelines](https://developer.wordpress.org/plugins/wordpress-org/detailed-plugin-guidelines/).

In JetBrains IDEA (PhpStorm, WebStorm, etc.) enable WordPress support and set `wp_data` as WordPress path, so that the local code inspections like SonarLint can recognize the built-in functions. You can still mark the directory as excluded to avoid unnecessary indexing and search results.

Some SonarLint warnings (and PHP PSR conventions) should be ignored, like avoiding underscores in function names. As we operate in a global namespace shared with other plugins, it is considered best practice to use a unique prefix for identifiers used for `function`, `class`, and `define`.

A local code sniffer validation can be set up using the provided `composer.json` configuration. Note that this currently does not work with PHP 8, so you need to use a PHP 7.4 runtime (`/usr/bin/php74`). You may need to adjust the IDE settings to WordPress coding standards and code sniffer configurations according to the provided tutorial.

- https://packagist.org/packages/wp-coding-standards/wpcs
- https://www.jetbrains.com/help/idea/using-php-code-sniffer.html#installing-configuring-code-sniffer
- https://www.linuxbabe.com/ubuntu/php-multiple-versions-ubuntu

## Troubleshooting

- make sure that there is no other local service listening on port 8000



