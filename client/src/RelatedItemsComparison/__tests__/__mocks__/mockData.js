export const productMock = {
  id: 41014,
  campus: 'hr-rfp',
  name: 'Hipolito Suit',
  slogan: 'Aut commodi reiciendis eius id esse debitis ipsa optio.',
  description: 'Mollitia dolores iusto quis magnam repellendus vitae reprehenderit voluptas. Non qui id et occaecati. Itaque ut dicta accusamus provident architecto aspernatur et quia quis. Et eos voluptatum aut. Hic corrupti accusantium.',
  category: 'Suit',
  default_price: 956.00,
  created_at: '2021-08-13T14:38:44.588Z',
  updated_at: '2021-08-13T14:38:44.588Z',
  features: [
    {
      feature: 'Cut',
      value: 'Skinny',
    },
  ],
};

export const relatedProductsMock = [
  40500,
  40996,
  40617,
  40718,
  41039,
  40757,
];

export const stylesMock = {
  product_id: 41016,
  results: [
    {
      style_id: 244840,
      name: 'Black',
      original_price: 668.00,
      sale_price: null,
      'default?': true,
      photos: [
        {
          thumbnail_url: 'https://images.unsplash.com/photo-1519689373023-dd07c7988603?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
          url: 'https://images.unsplash.com/photo-1465877783223-4eba513e27c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
        },
      ],
      skus: {
        1419739: {
          quantity: 19,
          size: 'XS',
        },
        1419740: {
          quantity: 27,
          size: 'S',
        },
        1419741: {
          quantity: 39,
          size: 'M',
        },
        1419742: {
          quantity: 31,
          size: 'L',
        },
        1419743: {
          quantity: 46,
          size: 'XL',
        },
        1419744: {
          quantity: 51,
          size: 'XXL',
        },
      },
    },
    {
      style_id: 244841,
      name: 'Silver',
      original_price: 668.00,
      sale_price: null,
      'default?': false,
      photos: [
        {
          thumbnail_url: 'uhttps://images.unsplash.com/photo-1515243061678-14fc18b93935?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
          url: 'https://images.unsplash.com/photo-1519862170344-6cd5e49cb996?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
        },
      ],
      skus: {
        1419745: {
          quantity: 20,
          size: 'XS',
        },
        1419746: {
          quantity: 10,
          size: 'S',
        },
        1419747: {
          quantity: 58,
          size: 'M',
        },
        1419748: {
          quantity: 2,
          size: 'L',
        },
        1419749: {
          quantity: 52,
          size: 'XL',
        },
        1419750: {
          quantity: 3,
          size: 'XXL',
        },
      },
    },
  ],
};

export const reviewsMetaMock = {
  product_id: '40389',
  ratings: {
    1: '4',
    2: '5',
    3: '2',
    4: '5',
    5: '9',
  },
  recommended: {
    false: 4,
    true: 21,
  },
  characteristics: {
    Fit: {
      id: 135366,
      value: '3.0400000000000000',
    },
    Length: {
      id: 135367,
      value: '2.9200000000000000',
    },
    Comfort: {
      id: 135368,
      value: '3.1200000000000000',
    },
    Quality: {
      id: 135369,
      value: '2.8000000000000000',
    },
  },
};

export const mockState = {};

// axios.get.mockImplementation((url) => {
//   switch (url) {
//     case '/products/40353/related':
//       return Promise.resolve({
//         data: [],
//       });
//     case '/products/40353':
//       return Promise.resolve({
//         data: [],
//       });
//     case '/products/40353/styles':
//       return Promise.resolve({
//         data: [],
//       });
//     default:
//       return Promise.resolve({ data: [] });
//   }
// });
