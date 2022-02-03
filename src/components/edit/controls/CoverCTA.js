import { useState, useEffect } from 'react';

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

export const CoverCTAControls = ({ attributes, setAttributes }) => {
	const { ctaButtons: ctaButtonsAttr } = attributes;

	const [ctaButtons, setCtaButtons] = useState([...ctaButtonsAttr]);
	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Cover CTA Buttons" initialOpen={false}>
					<PanelRow>
						{ctaButtons.map(({ url, hover, text, price }) => (
							<Card key={text}>
								<CardHeader>{text}</CardHeader>
							</Card>
						))}
						<Button label="" />
					</PanelRow>
				</PanelBody>
			</Panel>
		</InspectorControls>
	);
};
