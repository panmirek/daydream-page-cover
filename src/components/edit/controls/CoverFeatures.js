import { useState, useEffect } from 'react';
import uniqid from 'uniqid';

import {
	PanelBody,
	TextControl,
	TextareaControl,
	Panel,
	Card,
	CardBody,
} from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import {
	extendArrayWithKeys,
	reorderArrayElementByKey,
	getUpdatedKeyItems,
	getListWithoutItem,
} from '../../../helpers';

import {
	MovableItemCardHeader,
	MovableItemCardFooter,
	AddItemButton,
} from './common';

export const CoverFeaturesControls = ({ attributes, setAttributes }) => {
	const { features: featuresAttr } = attributes;

	const [featureList, setFeatureList] = useState(
		extendArrayWithKeys(featuresAttr, { isExpanded: false })
	);

	const addFeature = (feature) =>
		setFeatureList((features) => [...features, feature]);

	const removeFeature = ({ key }) => {
		setFeatureList((features) => getListWithoutItem(features, key));
	};

	const createFeature = (feature = { name: '', description: '' }) => ({
		...feature,
		key: uniqid(),
	});

	const handleAddFeature = () => {
		addFeature(
			createFeature({ name: '', description: '', isExpanded: true })
		);
	};

	const handleChangeFeature = (currentKey, property) => {
		setFeatureList((features) =>
			getUpdatedKeyItems(features, currentKey, property)
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
					{featureList?.map(
						({ key, name, description, isExpanded }, index) => (
							<Card key={key} style={{ marginBottom: '1em' }}>
								<MovableItemCardHeader
									handleMoveItem={handleMoveItem}
									isFirst={index === 0}
									isLast={!(index < featureList.length - 1)}
									currentKey={key}
									isExpanded={isExpanded}
									title={name || 'Feature'}
									subtitle={description}
									onUpdate={handleChangeFeature}
								/>
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
										<MovableItemCardFooter
											onClick={() =>
												removeFeature({ key })
											}
										/>
									</CardBody>
								)}
							</Card>
						)
					)}
					<AddItemButton
						handleAdd={handleAddFeature}
						isDisabled={featureList.length >= 8}
						text="Add Label"
					/>
				</PanelBody>
			</Panel>
		</InspectorControls>
	);
};
