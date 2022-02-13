export const defaultAttributes = {
	features: [
		{
			name: 'Datum',
			description: '13.02.-27.02.2022 (zwei Wochen)',
		},
		{ name: 'Von', description: 'Korfu' },
		{ name: 'Nach', description: 'Korfu' },
		{ name: 'Yacht', description: 'Einem brandneuen Astrèa 42' },
		{
			name: 'Skipper',
			description: '<a href="#url">Thomas Brandes</a>',
		},
		{ name: 'Seemeilen', description: '1300sm' },
	],
	image: { url: 'https://picsum.photos/500/300', alt: '' },
	cta: [
		{
			url: 'https://google.com',
			title: 'Send request',
			text: 'Preis pro Koje',
			price: '1660,- €',
		},
		{
			url: 'https://google.com',
			title: 'Send request',
			text: 'Ganze Kabine',
			price: '2770,- €',
		},
	],
};

export const attributes = {
	features: {
		type: 'array',
		source: 'query',
		selector: '.ddy-cover__features-item',
		default: defaultAttributes.features,
		query: {
			name: {
				type: 'string',
				source: 'text',
				selector: '.ddy-cover__features-item_title',
			},
			description: {
				type: 'string',
				source: 'html',
				selector: '.ddy-cover__features-item_desc',
			},
		},
	},
	title: {
		type: 'string',
		source: 'text',
		selector: '.ddy-cover__title',
	},
	featuredImageUrl: {
		type: 'string',
		source: 'attribute',
		attribute: 'src',
		selector: '.ddy-cover__image',
	},
	ctaButtons: {
		type: 'array',
		source: 'query',
		selector: '.ddy-cover__btn',
		default: [
			{
				url: '',
				hover: 'Send request',
				text: 'Take me there!',
				price: '1999,-€',
			},
		],
		query: {
			hover: {
				type: 'string',
				source: 'text',
				selector: '.ddy-cover__btn-hover',
			},
			text: {
				type: 'string',
				source: 'text',
				selector: 'span',
			},
			price: {
				type: 'string',
				source: 'html',
				selector: '.ddy-cover__btn-price',
			},
			url: {
				type: 'string',
				source: 'attribute',
				attribute: 'href',
			},
		},
	},
	ctaEmail: {
		type: 'string',
		source: 'attribute',
		attribute: 'data-email',
		selector: '.ddy-cover__cta-cell',
	},
	ctaEmailBody: {
		type: 'string',
		source: 'attribute',
		attribute: 'data-email-body',
		selector: '.ddy-cover__cta-cell',
	},
};
