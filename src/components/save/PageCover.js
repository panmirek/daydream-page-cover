import { useBlockProps } from '@wordpress/block-editor'

import CoverFeatures from '../shared/CoverFeatures'
import CTAButtons from '../shared/CTAButtons'

const exampleAttributes = {
    coverAttributes: {
        features: [
            {
                feature: 'Datum',
                descriptionHtml: '13.02.-27.02.2022 (zwei Wochen)',
            },
            { feature: 'Von', descriptionHtml: 'Korfu' },
            { feature: 'Nach', descriptionHtml: 'Korfu' },
            { feature: 'Yacht', descriptionHtml: 'Einem brandneuen Astrèa 42' },
            {
                feature: 'Skipper',
                descriptionHtml: '<a href="#url">Thomas Brandes</a>',
            },
            { feature: 'Seemeilen', descriptionHtml: '1300sm' },
        ],
        image: { url: 'https://picsum.photos/500/300', alt: '' },
        cta: [
            {
                url: 'https://google.com',
                title: 'Send request',
                text: 'Preis pro Koje',
                price: '1660,- €',
            },
            {
                url: 'https://google.com',
                title: 'Send request',
                text: 'Ganze Kabine',
                price: '2770,- €',
            },
        ],
    },
}

const PageCover = () => {
    const { features, cta, image } = exampleAttributes.coverAttributes
    // const { image } = attributes

    return (
        <header {...useBlockProps.save()} className="ddy-cover">
            <div className="ddy-cover__top">
                <div className="ddy-cover__image-cell">
                    <img
                        className="ddy-cover__image"
                        src={image.url}
                        alt={image.alt}
                    />
                </div>
                <div className="ddy-cover__features-cell">
                    <CoverFeatures features={features} />
                    <div className="ddy-cover__cta-cell">
                        <CTAButtons cta={cta} />
                    </div>
                </div>
            </div>
            <div className="ddy-cover__bottom">
                <h1 className="ddy-cover__title">
                    Sonne, Wind, Rum &amp; Reggae
                </h1>
            </div>
        </header>
    )
}

export default PageCover
