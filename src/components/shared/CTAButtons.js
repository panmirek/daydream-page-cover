const CTAButtons = ({cta}) => cta.map(({url, title, text, price}) => (
    <a href={url} title={title} className="ddy-cover__btn">
        {text}
        {price && <div className="ddy-cover__btn-price">{price}</div>}
        {title && <div className="ddy-cover__btn-hover">{title}</div>}
    </a>
))

export default CTAButtons