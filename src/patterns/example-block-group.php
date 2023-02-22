<?php
/**
 * Title: Example Block Group (patterns directory)
 * Slug: twentytwentythree-child/example-block-group
 * Categories: featured, text
 * Block Types: post,page
 * Description: Example created using the file patterns/example-block-group.php
 */
?>
<!-- wp:group  -->
<div class="wp-block-group">
	<!-- wp:heading {"level":2} -->
	<h2><?php esc_html_e( 'Heading Two', 'twentytwentythree-child' ) ?></h2>
	<!-- /wp:heading -->

	<!-- wp:group {"className":"cta"} -->
	<div class="wp-block-group cta">
		<!-- wp:heading {"level":3} -->
		<h3 class="cta__title"><?php esc_html_e( 'Heading Three', 'twentytwentythree-child' ) ?></h3>
		<!-- /wp:heading -->
		<!-- wp:paragraph {"className":"myprefix__content"} -->
		<p class="myprefix__content">Lorem ipsum dolor sit amet.</p>
		<!-- /wp:paragraph -->
		<!-- wp:buttons {"align":"center", "className":"myprefix__button-wrapper"} -->
		<div class="wp-block-buttons myprefixv__button-wrapper">
			<!-- wp:button {"className":"is-style-outline"} -->
			<div class="wp-block-button is-style-outline">
				<a class="wp-block-button">
					<?php esc_html_e( 'Button Two', 'twentytwentythree-child' )  ?>
				</a>
			</div>
			<!-- /wp:button -->
		</div>
		<!-- /wp:buttons -->
	</div>
	<!-- /wp:group -->
</div>
<!-- /wp:group -->
