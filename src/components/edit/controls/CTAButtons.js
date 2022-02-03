import { useState, useEffect } from 'react';
import uniqid from 'uniqid';

import {
	PanelBody,
	PanelRow,
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

import { extendArrayWithKeys } from '../../../helpers';

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
					<PanelRow>
						{ctaButtonList.map(({ url, hover, text, price }) => (
							<Card key={text}>
								<CardHeader>{text}</CardHeader>
							</Card>
						))}
						<Button label="" />
					</PanelRow>
					<div style={{ display: 'flex', placeContent: 'flex-end' }}>
						<Button
							icon="plus"
							onClick={handleAddNewCTA}
							disabled={ctaButtonList.length >= 3}
						>
							Add CTA Button
						</Button>
					</div>
				</PanelBody>
			</Panel>
		</InspectorControls>
	);
};
