import { useBlockProps } from '@wordpress/block-editor';

import { CoverFeatures, CTAButtons } from '../shared';
import { extendArrayWithKeys } from '../../helpers';

const PageCover = ({ attributes }) => {
	const { features, title, featuredImageUrl, ctaButtons, ctaEmail } =
		attributes;

	return (
		<div {...useBlockProps.save()} style={{ maxWidth: 'unset' }}>
			<header className="ddy-cover">
				<div className="ddy-cover__top">
					<figure className="ddy-cover__image-cell">
						<img
							className="ddy-cover__image"
							src={featuredImageUrl}
							alt=""
						/>
					</figure>
					<div className="ddy-cover__features-cell">
						<CoverFeatures
							features={extendArrayWithKeys(features)}
						/>
						<div
							className="ddy-cover__cta-cell"
							data-email={ctaEmail}
						>
							<CTAButtons cta={extendArrayWithKeys(ctaButtons)} />
						</div>
					</div>
				</div>
				<div className="ddy-cover__bottom">
					<h1 className="ddy-cover__title">{title}</h1>
				</div>
			</header>
		</div>
	);
};

export default PageCover;
