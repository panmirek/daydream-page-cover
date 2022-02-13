import { useEffect, useState } from 'react';

import { useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { Placeholder } from '@wordpress/components';

import { CTAButtonsControls, CoverFeaturesControls } from './controls';
import { CoverFeatures, CTAButtons } from '../shared';
import { extendArrayWithKeys } from '../../helpers';

import '../../editor.scss';

const PageCover = ({ attributes, setAttributes }) => {
	const {
		features: featuresAttr,
		featuredImageUrl,
		ctaButtons: ctaButtonsAttr,
		ctaEmail,
		ctaEmailBody,
	} = attributes;
	const [features, setFeatures] = useState(extendArrayWithKeys(featuresAttr));
	const [ctaButtons, setCtaButtons] = useState(
		extendArrayWithKeys(ctaButtonsAttr)
	);

	const pageTitle = useSelect((select) =>
		select('core/editor').getEditedPostAttribute('title')
	);

	const postFreshEdits = useSelect((select) =>
		select('core/editor').getPostEdits()
	);

	const editedCoverImgUrl = useSelect(
		(select) =>
			select('core').getMedia(postFreshEdits.featured_media)
				?.media_details?.sizes?.full?.source_url
	);

	const wpSavedFeatureImgUrl = useSelect((select) => {
		const featuredMedia =
			select('core/editor').getCurrentPost().featured_media;
		const media = select('core').getMedia(featuredMedia);
		return media?.media_details.sizes.full.source_url;
	}, []);

	useEffect(() => {
		setAttributes({ featuredImageUrl: wpSavedFeatureImgUrl });
	}, [wpSavedFeatureImgUrl]);

	useEffect(() => {
		if (editedCoverImgUrl || postFreshEdits.featured_media === 0) {
			setAttributes({
				featuredImageUrl: editedCoverImgUrl || undefined,
			});
		}
	}, [editedCoverImgUrl, postFreshEdits.featured_media]);

	useEffect(() => {
		setAttributes({ title: pageTitle });
	}, [pageTitle]);

	useEffect(() => {
		setFeatures(extendArrayWithKeys(featuresAttr));
	}, [featuresAttr]);

	useEffect(() => {
		setCtaButtons(extendArrayWithKeys(ctaButtonsAttr));
	}, [ctaButtonsAttr]);

	return (
		<div {...useBlockProps()} style={{ maxWidth: 'unset' }}>
			<CoverFeaturesControls
				setAttributes={setAttributes}
				attributes={attributes}
			/>
			<CTAButtonsControls
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
						<div
							className="ddy-cover__cta-cell"
							data-email={ctaEmail}
							data-email-body={ctaEmailBody}
						>
							<CTAButtons cta={ctaButtons} />
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
