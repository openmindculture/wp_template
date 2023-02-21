<?php

if ( ! defined( 'ABSPATH' ) ) exit;

const MYPREFIX_THEME_VERSION = '1.0.0'; // use to ensure that browsers don't load outdated cached style versions

function child_theme_styles() {
	wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.scss' );
	wp_enqueue_style( 'child-theme-css', get_stylesheet_directory_uri() . '/style.scss', array('parent-style'), MYPREFIX_THEME_VERSION, 'all');
}

add_action( 'wp_enqueue_scripts', 'child_theme_styles', 20 );

/**
 * Enqueues theme styles for the editor.
 */
add_action( 'after_setup_theme', function() {

	// keep default block styles
	add_theme_support( 'wp-block-styles' );

	// Adding support for editor styles implictly regenerates our front-end styles
	// inside an .editor-styles-wrapper
	add_theme_support( 'editor-styles' );

	// explicitly state which file to use
	// Note that we can't set the priority.
	add_editor_style( 'assets/theme.css' );

} );

function myprefix_disable_emojis() {
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );
	remove_action( 'admin_print_styles', 'print_emoji_styles' );
	remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
	remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
	remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
	// omitted tinyMCE block as we are using block editor only
}
add_action( 'init', 'myprefix_disable_emojis' );

// Optionally: Whitelist only the blocks that we need
// TODO: allowed_block_types is deprecated since 5.8.0, use allowed_block_types_all filter, see:
// https://developer.wordpress.org/reference/hooks/allowed_block_types/
