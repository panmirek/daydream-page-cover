import { useState, useEffect } from 'react';

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
import { InspectorControls } from '@wordpress/block-editor';

import uniqid from 'uniqid';

export const CoverLabelsControls = ({ attributes, setAttributes }) => {
	const { features: featuresAttr } = attributes;

	const [featureList, setFeatureList] = useState(
		featuresAttr.map(({ name, description }) => ({
			key: uniqid(),
			name,
			description,
			isExpanded: false,
		}))
	);

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

	useEffect(() => {
		setAttributes({
			features: featureList.map(({ name, description }) => ({
				name,
				description,
			})),
		});
	}, [featureList]);

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Cover Labels" initialOpen={false}>
					{featureList.map(
						({ key, name, description, isExpanded }) => (
							<Card key={key} style={{ marginBottom: '1em' }}>
								<CardHeader
									onClick={() =>
										handleChangeFeature(key, {
											isExpanded: !isExpanded,
										})
									}
									style={{ cursor: 'pointer' }}
								>
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
									/>
								</CardHeader>
								{isExpanded && (
									<CardBody>
										<TextControl
											label="Name"
											value={name}
											placeholder="Some"
											onChange={(value) =>
												handleChangeFeature(key, {
													name: value,
												})
											}
										/>
										<TextareaControl
											label="Description"
											value={description}
											placeholder="Interesting feature."
											help="Description supports HTML"
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
