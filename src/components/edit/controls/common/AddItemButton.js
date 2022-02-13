import { Button } from '@wordpress/components';

export const AddItemButton = ({ handleAdd, isDisabled, text }) => (
	<div style={{ display: 'flex', placeContent: 'flex-end' }}>
		<Button icon="plus" onClick={handleAdd} disabled={isDisabled}>
			{text}
		</Button>
	</div>
);
