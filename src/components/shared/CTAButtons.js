export const CTAButtons = ({ cta }) =>
	cta.map(({ url, hover, text, price, key }) => (
		<a href={url} className="ddy-cover__btn" key={key}>
			{text && <span>{text}</span>}
			{price && <div className="ddy-cover__btn-price">{price}</div>}
			{hover && <div className="ddy-cover__btn-hover">{hover}</div>}
		</a>
	));
