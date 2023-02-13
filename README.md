# WordPress Test Setup

[wp_cli_docker](https://github.com/openmindculture/wp_cli_docker) is a simple local host WordPress setup using Docker, docker-compose, and wp-cli to install themes and plugins, in order to quickly evaluate and ensure compatibility of a certain setup of components and software versions.

## Introduction

Using this setup, we can try to mimic our customer's plugins, themes, and web hosting provider's technical setup as good as possible to check for any possible problems, bugs, or incompatibility before applying changes and updates to the actual WordPress installation on their production server.

We can use the [incompatibility-status](https://wordpress.org/plugins/incompatibility-status/) checker plugin for a quick overview of WordPress Core, PHP, and themes versions with a specific focus on support for the block editor, custom blocks, and (full) site editing compatibilities.

## Usage

`npm start` should set up WordPress on http://localhost:8000/

You can open http://localhost:8000/wp-admin and check the dashboard, health status, additional information provided by the incompatibility status plugin, and add more plugins, themes, and content.

You can use the [WordPress content import/export tool](https://learn.wordpress.org/tutorial/tools-import-and-export/) to add content from other existing WordPress sites.

## Requirements

- npm
- Docker
- docker-compose

## Configuration

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

For an optional WordPress theme / plugin development base / template, use the downstream version which adds linting etc. 

Note: `eslint` is configured to honor WordPress theme / plugin development style guides. It does _not_ check the installation script `install-local-environment.js` which should be checked used the `eslint-recommended` rules instead.

TODO: 
- clean up and remove project skeleton stuff after forking a downstream repository.
- add link to template repo to this `wp_cli_docker` README file.
- revert eslint to check installation script in `wp_cli_docker`
- merge upcoming installer improvements into downstream template repo
- add stylelint to template repo
- add phpsniffer etc. to template repo

## Troubleshooting

- make sure that there is no other local service listening on port 8000



