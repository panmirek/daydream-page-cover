<?php
/**
 * Plugin Name:       Daydream – Page Cover
 * Description:       Page cover block for daydream-yachting theme.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           1.0.0
 * Author:            STRM Jan Mirecki
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       daydream-cover
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_daydream_cover_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_daydream_cover_block_init' );
