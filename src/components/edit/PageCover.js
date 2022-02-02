import { useEffect } from 'react';

import { useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

import { CoverLabelsControls } from './controls';
import { CoverFeatures, CTAButtons } from '../shared';

import { Placeholder } from '@wordpress/components';

import '../../editor.scss';

import { exampleAttributes } from '../../data/attributes';

const PageCover = ({ attributes, setAttributes }) => {
	const { cta } = exampleAttributes.coverAttributes;
	const { features, featuredImageUrl } = attributes;

	const pageTitle = useSelect((select) =>
		select('core/editor').getEditedPostAttribute('title')
	);

	// check for changes
	const postEdits = useSelect((select) =>
		select('core/editor').getPostEdits()
	);

	// get image by id
	const thumbnailUrl = useSelect(
		(select) =>
			select('core').getMedia(postEdits.featured_media)?.media_details
				?.sizes?.full?.source_url
	);

	useEffect(() => {
		if (thumbnailUrl) setAttributes({ featuredImageUrl: thumbnailUrl });
	}, [thumbnailUrl]);

	useEffect(() => {
		setAttributes({ title: pageTitle });
	}, [pageTitle]);

	return (
		<div {...useBlockProps()} style={{ maxWidth: 'unset' }}>
			<CoverLabelsControls
				setAttributes={setAttributes}
				attributes={attributes}
			/>
			<header className="ddy-cover">
				<div className="ddy-cover__top">
					<figure className="ddy-cover__image-cell">
						{featuredImageUrl ? (
							<img
								className="ddy-cover__image"
								src={featuredImageUrl}
								alt=""
							/>
						) : (
							<Placeholder label="Select featured image from Page Settings." />
						)}
					</figure>
					<div className="ddy-cover__features-cell">
						<CoverFeatures features={features} />
						<div className="ddy-cover__cta-cell">
							<CTAButtons cta={cta} />
						</div>
					</div>
				</div>
				<div className="ddy-cover__bottom">
					<h1 className="ddy-cover__title">{pageTitle}</h1>
				</div>
			</header>
		</div>
	);
};

export default PageCover;
