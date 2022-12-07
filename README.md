# WordPress Test Setup

[wp_cli_docker](https://github.com/openmindculture/wp_cli_docker) is a simple local host WordPress setup using Docker, docker-compose, and wp-cli to install themes and plugins, so that we can quickly evaluate and ensure compatibility of a certain setup of components and software versions.

We can use the incompatibility-checker plugin for a quick overview of WordPress Core, PHP, and themes versions with a specific focus on support for the block editor, custom blocks, and (full) site editing compatibilities.

TODO add some dhort introudction, link to upcoming blog post

describe aim , how to install, how to modify / configure,

how to troubleshoot if other docker containers running on the same port,

where to start localhost 8000 wp admin,

how to stop and clean up

and what about incompatibility-checker plugin

FROM wordpress:latest
- use other tags in docker/wordpress.Dockerfile to test specific versions, see
- https://hub.docker.com/_/wordpress/
- FROM wordpress:6.1.1-php8.0-apache