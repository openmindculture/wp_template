<?php
/*!
Plugin Name: MYPREFIX Register Custom Post Type
Plugin URI: https://github.com/openmindculture/wp_template
Description: Plugin to register custom post types
Version: 1.2.3
Author: Ingo Steinke
Author URI: https://www.ingo-steinke.com/
Textdomain: myprefix-register-custom-post-type
License: GPLv2
*/

// Register Custom Post Type unless exists

function myprefix_register_post_type() {

}
add_action( 'init', 'myprefix_register_post_type' );
