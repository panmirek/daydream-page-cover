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
} from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import { extendArrayWithKeys } from '../../../helpers';

import {
	MovableItemCardHeader,
	MovableItemCardFooter,
	AddItemButton,
	getUpdatedKeyItems,
	getListWithoutItem,
} from './common';

export const CTAButtonsControls = ({ attributes, setAttributes }) => {
	const { ctaButtons: ctaButtonsAttr } = attributes;

	const [ctaButtonList, setCtaButtonList] = useState(
		extendArrayWithKeys(ctaButtonsAttr, { isExpanded: false })
	);

	const addCTABtn = (button) =>
		setCtaButtonList((buttons) => [...buttons, button]);

	const createButton = (
		button = {
			url: '',
			hover: 'Send request',
			text: 'title',
			price: '999,-',
		}
	) => ({ ...button, key: uniqid() });

	const handleAddNewCTA = () => {
		addCTABtn(createButton());
	};

	const handleChangeCTA = (currentKey, property) => {
		setCtaButtonList((buttons) =>
			getUpdatedKeyItems(buttons, currentKey, property)
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
					{ctaButtonList.map(
						(
							{ url, hover, text, price, key, isExpanded },
							index
						) => (
							<Card key={key} style={{ marginBottom: '1em' }}>
								<MovableItemCardHeader
									handleMoveItem={() => console.log('moved')}
									isFirst={index === 0}
									isLast={!(index < ctaButtonList.length - 1)}
									currentKey={key}
									isExpanded={isExpanded}
									title={text || 'CTA'}
									onUpdate={handleChangeCTA}
								/>
								{isExpanded && (
									<CardBody>
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
