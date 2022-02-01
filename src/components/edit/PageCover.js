import { useState, useEffect } from 'react'

import {
    MediaUpload,
    MediaUploadCheck,
    useBlockProps,
} from '@wordpress/block-editor'
import { withSelect, useSelect } from '@wordpress/data'

import CoverFeatures from '../shared/CoverFeatures'
import CTAButtons from '../shared/CTAButtons'

import '../../editor.scss'

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

const CoverTitle = withSelect((select) => ({
    title: select('core/editor').getEditedPostAttribute('title'),
}))(({ title }) => <h1 className="ddy-cover__title">{title}</h1>)

const PageCover = () => {
    const { features, cta } = exampleAttributes.coverAttributes

    // check for changes
    const postEdits = useSelect((select) =>
        select('core/editor').getPostEdits()
    )

    // saved image id
    const { featured_media: featureMediaId } = useSelect((select) =>
        select('core/editor').getCurrentPost()
    )

    // get image by id
    const image = useSelect((select) =>
        select('core').getMedia(postEdits?.featured_media)
    )

    const isSavingPost = useSelect((select) =>
        select('core/editor')
    ).isSavingPost()

    const thumbnail = useSelect(
        (select) =>
            select('core').getMedia(featureMediaId)?.media_details?.sizes,
        []
    )

    const [coverImageUrl, setCoverImageUrl] = useState(
        thumbnail?.full?.source_url
    )

    useEffect(() => {
        setCoverImageUrl(
            image?.media_details?.sizes?.full?.source_url ||
                thumbnail?.full?.source_url
        )
    }, [thumbnail, isSavingPost])

    useEffect(() => {
        setCoverImageUrl(
            (isSavingPost && thumbnail?.full?.source_url) ||
                image?.media_details?.sizes?.full?.source_url
        )
        console.log(
            'updating image to',
            (isSavingPost && thumbnail?.full?.source_url) ||
                image?.media_details?.sizes?.full?.source_url
        )
    }, [postEdits?.featured_media])

    return (
        <header {...useBlockProps()} className="ddy-cover">
            <div className="ddy-cover__top">
                <div className="ddy-cover__image-cell">
                    <img
                        className="ddy-cover__image"
                        src={coverImageUrl}
                        alt={''}
                    />
                    {/* <MediaUploadCheck>
                        <MediaUpload
                            allowedTypes="image"
                            render={({ open }) => (
                                <button
                                    onClick={open}
                                    className="ddy-cover__image ddy-cover__image_edit"
                                    style={{
                                        backgroundImage: `url(${coverImageUrl})`,
                                    }}
                                />
                            )}
                        />
                    </MediaUploadCheck> */}
                </div>
                <div className="ddy-cover__features-cell">
                    <CoverFeatures features={features} />
                    <div className="ddy-cover__cta-cell">
                        <CTAButtons cta={cta} />
                    </div>
                </div>
            </div>
            <div className="ddy-cover__bottom">
                <CoverTitle />
            </div>
        </header>
    )
}

export default PageCover
