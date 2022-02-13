import { Button, CardFooter } from '@wordpress/components';

export const MovableItemCardFooter = ({ onClick }) => (
	<CardFooter style={{ paddingBottom: 0 }}>
		<Button
			icon="remove"
			showTooltip
			isDestructive
			style={{ boxShadow: 'unset' }}
			onClick={onClick}
		>
			Remove Label
		</Button>
	</CardFooter>
);
