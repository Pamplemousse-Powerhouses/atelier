const nFilter = (action) => (
  action.payload[1] || action.payload[2]
  || action.payload[3] || action.payload[3]
  || action.payload[5]);

const ratingsReviewsReducer = (
  state = {
    reviewViewLength: 2,
    reviews: {
      product: 0,
      page: 0,
      count: 0,
      results: [],
    },
    meta: {
      product_id: '0',
      ratings: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
      recommend: {
        false: 0,
        true: 0,
      },
      characteristics: {
        Size: {
          id: 0,
          value: 2.511111,
        },
      },
    },
    sortOption: 'relevant', // [newest, helpful, relevant]
    filter: false,
    sort: {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
    },
    rloading: true,
    mloading: true,
    error: null,
  },
  action = {
    type: '',
    payload: {},
  },
) => {
  switch (action.type) {
    case '@reviews/FETCH_DATA':
      return { ...state, rloading: true };
    case '@reviews/SET_DATA':
      return { ...state, rloading: false, reviews: action.payload };
    case '@reviews/FAILED':
      return { ...state, rloading: false, error: action.payload };
    case '@reviews/meta/FETCH_DATA':
      return { ...state, mloading: true };
    case '@reviews/meta/SET_DATA':
      return { ...state, mloading: false, meta: action.payload };
    case '@reviews/meta/FAILED':
      return { ...state, mloading: false, error: action.payload };
    case '@reviews/sort/UPDATE':
      return { ...state, filter: nFilter(action), sort: action.payload };
    case '@reviews/SET_SORT_OPTION':
      return { ...state, sortOption: action.payload };
    case '@reviews/SET_REVIEWS_VIEWS_LENGTH':
      return { ...state, reviewViewLength: action.payload };

    default:
      return state;
  }
};

export default ratingsReviewsReducer;
