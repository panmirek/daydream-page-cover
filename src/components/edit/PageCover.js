import { useState, useEffect } from 'react';
import uniqid from 'uniqid';

import { useBlockProps, InspectorControls } from '@wordpress/block-editor';

import {
	PanelBody,
	TextControl,
	TextareaControl,
	Button,
	Panel,
	Card,
	CardBody,
	CardHeader,
	CardFooter,
} from '@wordpress/components';

import { withSelect, useSelect } from '@wordpress/data';

import CoverFeatures from '../shared/CoverFeatures';
import CTAButtons from '../shared/CTAButtons';

import '../../editor.scss';

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
};

const Controls = ({ setAttributes }) => {
	const [featureList, setFeatureList] = useState([
		{
			key: 'defaultFeature',
			name: 'Feature',
			description: 'Description…',
			isExpanded: false,
		},
	]);

	const addFeature = (feature) =>
		setFeatureList((features) => [...features, feature]);

	const removeFeature = ({ key }) => {
		setFeatureList((features) =>
			features.filter((feature) => feature.key !== key)
		);
	};

	const createFeature = (
		{ name, description } = { name: '', description: '' }
	) => ({ key: uniqid(), name, description });

	const handleAddFeature = () => {
		addFeature(createFeature({ name: '', description: '' }));
	};

	const handleChangeFeature = (currentKey, property) => {
		setFeatureList((features) =>
			features.map((feature) => {
				return feature.key === currentKey
					? { ...feature, ...property }
					: feature;
			})
		);
	};

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Cover Feature Labels" initialOpen={false}>
					{featureList.map(
						({ key, name, description, isExpanded }) => (
							<Card key={key} style={{ marginBottom: '1em' }}>
								<CardHeader>
									<div
										style={{
											overflow: 'hidden',
											textOverflow: 'ellipsis',
											whiteSpace: 'nowrap',
										}}
									>
										{`${name || 'Feature'}${
											description && `: ${description}`
										}`}
									</div>
									<Button
										icon={
											isExpanded
												? 'arrow-up-alt2'
												: 'arrow-down-alt2'
										}
										showTooltip
										label="Toggle Editing"
										onClick={() =>
											handleChangeFeature(key, {
												isExpanded: !isExpanded,
											})
										}
									/>
								</CardHeader>
								{isExpanded && (
									<CardBody>
										<TextControl
											label="Name"
											value={name}
											onChange={(value) =>
												handleChangeFeature(key, {
													name: value,
												})
											}
										/>
										<TextareaControl
											label="Description"
											value={description}
											onChange={(value) =>
												handleChangeFeature(key, {
													description: value,
												})
											}
										/>
										<CardFooter
											style={{ paddingBottom: 0 }}
										>
											<Button
												icon="remove"
												showTooltip
												isDestructive
												style={{ boxShadow: 'unset' }}
												onClick={() =>
													removeFeature({ key })
												}
											>
												Remove Feature
											</Button>
										</CardFooter>
									</CardBody>
								)}
							</Card>
						)
					)}
					<div style={{ display: 'flex', placeContent: 'flex-end' }}>
						<Button
							icon="plus"
							onClick={handleAddFeature}
							showTooltip
						>
							Add Cover Feature
						</Button>
					</div>
				</PanelBody>
			</Panel>
		</InspectorControls>
	);
};

const CoverTitle = withSelect((select) => ({
	title: select('core/editor').getEditedPostAttribute('title'),
}))(({ title }) => <h1 className="ddy-cover__title">{title}</h1>);

const PageCover = ({ setAttributes }) => {
	const { features, cta } = exampleAttributes.coverAttributes;

	// check for changes
	const postEdits = useSelect((select) =>
		select('core/editor').getPostEdits()
	);

	// saved image id
	const { featured_media: featureMediaId } = useSelect((select) =>
		select('core/editor').getCurrentPost()
	);

	// get image by id
	const image = useSelect((select) =>
		select('core').getMedia(postEdits?.featured_media)
	);

	const isSavingPost = useSelect((select) =>
		select('core/editor')
	).isSavingPost();

	const thumbnail = useSelect(
		(select) =>
			select('core').getMedia(featureMediaId)?.media_details?.sizes,
		[]
	);

	const [coverImageUrl, setCoverImageUrl] = useState(
		thumbnail?.full?.source_url
	);

	useEffect(() => {
		setCoverImageUrl(
			image?.media_details?.sizes?.full?.source_url ||
				thumbnail?.full?.source_url
		);
	}, [thumbnail, isSavingPost]);

	useEffect(() => {
		setCoverImageUrl(
			(isSavingPost && thumbnail?.full?.source_url) ||
				image?.media_details?.sizes?.full?.source_url
		);
		console.log(
			'updating image to',
			(isSavingPost && thumbnail?.full?.source_url) ||
				image?.media_details?.sizes?.full?.source_url
		);
	}, [postEdits?.featured_media]);

	return (
		<div {...useBlockProps()} style={{ maxWidth: 'unset' }}>
			<Controls setAttributes={setAttributes} />
			<header className="ddy-cover">
				<div className="ddy-cover__top">
					<div className="ddy-cover__image-cell">
						<img
							className="ddy-cover__image"
							src={coverImageUrl}
							alt={''}
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
					<CoverTitle />
				</div>
			</header>
		</div>
	);
};

export default PageCover;
