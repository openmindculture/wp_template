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

function myprefix_register_post_type() {
	$labels = array(
		'name'                  => 'Books',
		'singular_name'         => 'Book',
		'menu_name'             => 'Books',
		'name_admin_bar'        => 'Book',
		'archives'              => 'Book Archives',
		'attributes'            => 'Book Attributes',
		'parent_item_colon'     => 'Parent Book:',
		'all_items'             => 'All Books',
		'add_new_item'          => 'Add New Book',
		'add_new'               => 'Add New',
		'new_item'              => 'New Book',
		'edit_item'             => 'Edit Book',
		'update_item'           => 'Update Book',
		'view_item'             => 'View Book',
		'view_items'            => 'View Books',
		'search_items'          => 'Search Book',
		'not_found'             => 'Not found',
		'not_found_in_trash'    => 'Not found in Trash',
		'featured_image'        => 'Featured Image',
		'set_featured_image'    => 'Set featured image',
		'remove_featured_image' => 'Remove featured image',
		'use_featured_image'    => 'Use as featured image',
		'insert_into_item'      => 'Insert into item',
		'uploaded_to_this_item' => 'Uploaded to this book',
		'items_list'            => 'Books list',
		'items_list_navigation' => 'Books list navigation',
		'filter_items_list'     => 'Filter books list',
	);
	$args = array(
		'label'                 => 'Book',
		'description'           => 'Book Type Description',
		'labels'                => $labels,
		'supports'              => array( 'title', 'editor' ),
		'taxonomies'            => array( 'category', 'post_tag' ),
		'hierarchical'          => false,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 5,
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => true,
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'capability_type'       => 'page',
	);
	register_post_type( 'post_type', $args );
}
add_action( 'init', 'myprefix_register_post_type' );
