<?php
/**
 * Title: Example (patterns directory)
 * Slug: twentytwentythree-child/example-block-pattern
 * Categories: featured, text
 * Block Types: post
 * Description: Example created using the file patterns/example-block-pattern.php
 */
?>
<!-- trying to use the parent theme's slug here instead of the child theme ? -->
<!-- wp:buttons {"align":"center"} -->
<div class="wp-block-buttons aligncenter"><!-- wp:button {"backgroundColor":"very-dark-gray","borderRadius":0} -->
	<div class="wp-block-button">
		<a class="wp-block-button__link has-background has-very-dark-gray-background-color no-border-radius">
			<?php esc_html_e( 'Button One', 'twentytwentythree-child' ) ?>
		</a>
	</div>
	<!-- /wp:button -->

	<!-- wp:button {"textColor":"very-dark-gray","borderRadius":0,"className":"is-style-outline"} -->
	<div class="wp-block-button is-style-outline">
		<a class="wp-block-button__link has-text-color has-very-dark-gray-color no-border-radius">
			<?php esc_html_e( 'Button Two', 'twentytwentythree-child' )  ?>
		</a>
	</div>
	<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
