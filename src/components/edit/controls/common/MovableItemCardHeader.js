import { Button, CardHeader } from '@wordpress/components';

const ReorderButtons = ({ onClick, isFirst, isLast, currentKey }) => (
	<div
		style={{
			display: 'flex',
			flexDirection: 'column',
			borderRight: 'solid 1px #e8e8e8',
		}}
	>
		<Button
			isSmall
			disabled={isFirst}
			icon="arrow-up"
			onClick={() => onClick(currentKey, -1)}
			aria-label="Push backward"
			style={{
				paddingLeft: 0,
			}}
		/>
		<Button
			isSmall
			disabled={isLast}
			icon="arrow-down"
			onClick={() => onClick(currentKey, 1)}
			aria-label="Push forward"
			style={{
				paddingLeft: 0,
			}}
		/>
	</div>
);

const MovableItemHeader = ({
	onUpdate,
	currentKey,
	isExpanded,
	title,
	subtitle,
}) => (
	<div
		style={{ display: 'flex', flex: 1 }}
		tabIndex={0}
		role="button"
		onKeyDown={({ code }) => {
			if (code === 'Space')
				onUpdate(currentKey, {
					isExpanded: !isExpanded,
				});
		}}
		onClick={() =>
			onUpdate(currentKey, {
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
			{title}
			{subtitle && `: ${subtitle}`}
		</div>
		<Button
			icon={isExpanded ? 'arrow-up-alt2' : 'arrow-down-alt2'}
			showTooltip
			label="Toggle Editing"
		/>
	</div>
);

export const MovableItemCardHeader = ({
	handleMoveItem,
	isFirst,
	isLast,
	currentKey,
	isExpanded,
	title,
	subtitle = '',
	onUpdate,
}) => (
	<CardHeader style={{ cursor: 'pointer' }} size="xSmall">
		<ReorderButtons
			onClick={handleMoveItem}
			isFirst={isFirst}
			isLast={isLast}
			currentKey={currentKey}
		/>
		<MovableItemHeader
			onUpdate={onUpdate}
			currentKey={currentKey}
			isExpanded={isExpanded}
			title={title}
			subtitle={subtitle}
		/>
	</CardHeader>
);
