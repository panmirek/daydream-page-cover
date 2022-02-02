const CoverFeatures = ({ features }) => {
	const getFeaturesLabel = ({ key, name, description }) => (
		<div key={key} className="ddy-cover__features-item">
			<dt className="ddy-cover__features-item_title">
				{name || 'Label'}
			</dt>
			<dd
				className="ddy-cover__features-item_desc"
				dangerouslySetInnerHTML={{
					__html: description || 'Description…',
				}}
			/>
		</div>
	);

	return (
		<dl className="ddy-cover__features">
			{features.map((label) => getFeaturesLabel(label))}
		</dl>
	);
};

export default CoverFeatures;
