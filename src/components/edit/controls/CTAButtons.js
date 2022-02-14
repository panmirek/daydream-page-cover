import { useState, useEffect } from 'react';
import uniqid from 'uniqid';

import { useSelect } from '@wordpress/data';

import {
	PanelBody,
	PanelRow,
	TextControl,
	TextareaControl,
	Panel,
	Card,
	CardBody,
	Button,
	Popover,
} from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import {
	reorderArrayElementByKey,
	extendArrayWithKeys,
	undefinedValuesToString,
	getUpdatedKeyItems,
	getListWithoutItem,
} from '../../../helpers';

import {
	MovableItemCardHeader,
	MovableItemCardFooter,
	AddItemButton,
} from './common';
import { defaultAttributes } from '../../../data/attributes';

const generateMailto = ({ email = '', subject = '', body = '' }) => {
	const trimmedEmail = email.trim();
	const encodedSubject = encodeURIComponent(subject);
	const encodedBody = encodeURIComponent(body);

	return `mailto:${trimmedEmail}?subject=${encodedSubject}&body=${encodedBody}`;
};

const EmailPreview = ({ subject, body, email }) => {
	const [isVisible, setIsVisible] = useState(false);
	const toggleVisible = () => {
		setIsVisible((state) => !state);
	};

	return (
		<Button variant="link" onClick={toggleVisible}>
			Preview Email
			{isVisible && (
				<Popover>
					<div style={{ padding: '1em', minWidth: '6em' }}>
						<b>To:</b> {email}
						<br />
						<b>Subject:</b> {subject}
						<br />
						<b>Message:</b> {body}
					</div>
				</Popover>
			)}
		</Button>
	);
};

export const CTAButtonsControls = ({ attributes, setAttributes }) => {
	const { ctaButtons: ctaButtonsAttr, title, ctaEmail } = attributes;

	const pageLink = useSelect((select) =>
		select('core/editor').getPermalink()
	);
	const [author] = useSelect((select) =>
		select('core').getUsers({ who: 'authors' })
	) || [''];

	const [ctaButtonList, setCtaButtonList] = useState(
		extendArrayWithKeys(ctaButtonsAttr, { isExpanded: false }).map(
			(extended) => undefinedValuesToString(extended)
		)
	);

	const addCTABtn = (button) =>
		setCtaButtonList((buttons) => [...buttons, button]);

	const createButton = (button = { text: '', price: '', hover: '' }) => ({
		...button,
		key: uniqid(),
	});

	const handleAddNewCTA = () => {
		addCTABtn(
			createButton({
				isExpanded: true,
				hover: 'Send request',
				text: '',
				price: '',
			})
		);
	};

	const handleChangeCTA = (currentKey, property) => {
		setCtaButtonList((buttons) =>
			getUpdatedKeyItems(buttons, currentKey, property)
		);
	};

	const handleMoveItem = (key, vector) => {
		setCtaButtonList((buttons) =>
			reorderArrayElementByKey(buttons, key, vector)
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

	useEffect(() => {
		if (ctaEmail === defaultAttributes.ctaEmail) {
			setAttributes({ ctaEmail: author.email });
		}
	}, []);

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Cover CTA Buttons" initialOpen={false}>
					<PanelRow>
						<TextControl
							label="Email"
							value={ctaEmail}
							placeholder="john@snow.io"
							help="email used to generate 'mailto:' links"
							onChange={(value) =>
								setAttributes({ ctaEmail: value })
							}
						/>
					</PanelRow>
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
													url: value.trim(),
												})
											}
											help={
												<>
													<Button
														text="Generate mailto link"
														variant="link"
														onClick={() =>
															handleChangeCTA(
																key,
																{
																	url: generateMailto(
																		{
																			email: ctaEmail,
																			subject:
																				title,
																			body: `${text} – ${price}
																		${pageLink}`,
																		}
																	),
																}
															)
														}
													/>
													{url
														?.toLowerCase()
														.slice(0, 7) ===
														'mailto:' &&
														url?.indexOf(' ') ===
															-1 && (
															<EmailPreview
																email={ctaEmail}
																subject={title}
																body={`${text} – ${price}
														${pageLink}`}
															/>
														)}
												</>
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
