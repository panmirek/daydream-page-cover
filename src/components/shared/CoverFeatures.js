const CoverFeatures = ({ features }) => {
    const getFeaturesLabel = ({ feature, descriptionHtml }) => (
        <div key={feature} className="ddy-cover__features-item">
            <dt className="ddy-cover__features-item_title">{feature}:</dt>
            <dd
                className="ddy-cover__features-item_desc"
                dangerouslySetInnerHTML={{ __html: descriptionHtml }}
            />
        </div>
    )

    return (
        <dl className="ddy-cover__features">
            {features.map((label) => getFeaturesLabel(label))}
        </dl>
    )
}

export default CoverFeatures
