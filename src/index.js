import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import 'normalize.css';
import './style.scss';

import save from './save';
import PageCover from './components/edit/PageCover';

registerBlockType('create-block/daydream-cover', {
	edit: PageCover,
	save,
});
