import { useState, useEffect } from 'react';
import uniqid from 'uniqid';

import {
	PanelBody,
	TextControl,
	TextareaControl,
	Panel,
	Card,
	CardBody,
	Button,
} from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import {
	reorderArrayElementByKey,
	extendArrayWithKeys,
	getUpdatedKeyItems,
	getListWithoutItem,
} from '../../../helpers';

import {
	MovableItemCardHeader,
	MovableItemCardFooter,
	AddItemButton,
} from './common';

const generateMailto = ({ email = '', subject = '', body = '' }) => {
	const trimmedEmail = email.trim();
	const encodedSubject = encodeURIComponent(subject);
	const encodedBody = encodeURIComponent(body);

	return `mailto:${trimmedEmail}?subject=${encodedSubject}&body=${encodedBody}`;
};

export const CTAButtonsControls = ({ attributes, setAttributes }) => {
	const { ctaButtons: ctaButtonsAttr, title } = attributes;

	const [ctaButtonList, setCtaButtonList] = useState(
		extendArrayWithKeys(ctaButtonsAttr, { isExpanded: false })
	);

	const addCTABtn = (button) =>
		setCtaButtonList((buttons) => [...buttons, button]);

	const createButton = (button) => ({ ...button, key: uniqid() });

	const handleAddNewCTA = () => {
		addCTABtn(createButton({ isExpanded: true, hover: 'Send request' }));
	};

	const handleChangeCTA = (currentKey, property) => {
		setCtaButtonList((buttons) =>
			getUpdatedKeyItems(buttons, currentKey, property)
		);
	};

	const handleMoveItem = (key, vector) => {
		setCtaButtonList((features) =>
			reorderArrayElementByKey(features, key, vector)
		);
	};

	useEffect(() => {
		setAttributes({
			ctaButtons: ctaButtonList.map(({ url, hover, text, price }) => ({
				url,
				hover,
				text,
				price,
			})),
		});
	}, [ctaButtonList]);

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Cover CTA Buttons" initialOpen={false}>
					{ctaButtonList?.map(
						(
							{ url, hover, text, price, key, isExpanded },
							index
						) => (
							<Card key={key} style={{ marginBottom: '1em' }}>
								<MovableItemCardHeader
									handleMoveItem={handleMoveItem}
									isFirst={index === 0}
									isLast={!(index < ctaButtonList.length - 1)}
									currentKey={key}
									isExpanded={isExpanded}
									title={text || 'CTA'}
									onUpdate={handleChangeCTA}
								/>
								{isExpanded && (
									<CardBody>
										<TextControl
											label="Label"
											value={text}
											placeholder="Button label"
											onChange={(value) =>
												handleChangeCTA(key, {
													text: value,
												})
											}
										/>
										<TextControl
											label="Price"
											value={price}
											placeholder="123€"
											onChange={(value) =>
												handleChangeCTA(key, {
													price: value,
												})
											}
										/>
										<TextareaControl
											label="Hyperlink"
											value={url}
											placeholder="Url or mailto"
											onChange={(value) =>
												handleChangeCTA(key, {
													url: value,
												})
											}
											help={
												<Button
													text="Generate mailto link"
													variant="link"
													onClick={() =>
														handleChangeCTA(key, {
															url: generateMailto(
																{
																	email: 'jan@wp.pl',
																	subject:
																		title,
																	body: 'ala ma kota',
																}
															),
														})
													}
												/>
											}
										/>
										<TextControl
											label="Hover text"
											value={hover}
											placeholder="Text on hover"
											onChange={(value) =>
												handleChangeCTA(key, {
													hover: value,
												})
											}
										/>
										<MovableItemCardFooter
											onClick={() =>
												setCtaButtonList((buttons) =>
													getListWithoutItem(
														buttons,
														key
													)
												)
											}
										/>
									</CardBody>
								)}
							</Card>
						)
					)}
					<AddItemButton
						handleAdd={handleAddNewCTA}
						isDisabled={ctaButtonList.length >= 3}
						text="Add CTA Button"
					/>
				</PanelBody>
			</Panel>
		</InspectorControls>
	);
};
