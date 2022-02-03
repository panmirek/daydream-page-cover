import { useState, useEffect } from 'react';
import uniqid from 'uniqid';

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

import {
	extendArrayWithKeys,
	reorderArrayElementByKey,
} from '../../../helpers';

export const CoverFeaturesControls = ({ attributes, setAttributes }) => {
	const { features: featuresAttr } = attributes;

	const [featureList, setFeatureList] = useState(
		extendArrayWithKeys(featuresAttr, { isExpanded: false })
	);

	const addFeature = (feature) =>
		setFeatureList((features) => [...features, feature]);

	const removeFeature = ({ key }) => {
		setFeatureList((features) =>
			features.filter((feature) => feature.key !== key)
		);
	};

	const createFeature = (feature = { name: '', description: '' }) => ({
		...feature,
		key: uniqid(),
	});

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

	const handleMoveItem = (key, vector) => {
		setFeatureList((features) =>
			reorderArrayElementByKey(features, key, vector)
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
						({ key, name, description, isExpanded }, index) => (
							<Card key={key} style={{ marginBottom: '1em' }}>
								<CardHeader
									style={{ cursor: 'pointer' }}
									size="xSmall"
								>
									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
											borderRight: 'solid 1px #e8e8e8',
										}}
									>
										<Button
											isSmall
											disabled={!(index > 0)}
											icon="arrow-up"
											onClick={() =>
												handleMoveItem(key, -1)
											}
											style={{
												paddingLeft: 0,
											}}
										/>
										<Button
											isSmall
											disabled={
												!(
													index <
													featureList.length - 1
												)
											}
											icon="arrow-down"
											onClick={() =>
												handleMoveItem(key, 1)
											}
											style={{
												paddingLeft: 0,
											}}
										/>
									</div>
									<div
										style={{ display: 'flex', flex: 1 }}
										tabIndex={0}
										role="button"
										onKeyDown={({ code }) => {
											if (code === 'Space')
												handleChangeFeature(key, {
													isExpanded: !isExpanded,
												});
										}}
										onClick={() =>
											handleChangeFeature(key, {
												isExpanded: !isExpanded,
											})
										}
									>
										<div
											style={{
												overflow: 'hidden',
												textOverflow: 'ellipsis',
												whiteSpace: 'nowrap',
												flex: 1,
												display: 'flex',
												alignItems: 'center',
											}}
										>
											{`${name || 'Feature'}${
												description &&
												`: ${description}`
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
									</div>
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
												Remove Label
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
							disabled={featureList.length >= 8}
						>
							Add Label
						</Button>
					</div>
				</PanelBody>
			</Panel>
		</InspectorControls>
	);
};
