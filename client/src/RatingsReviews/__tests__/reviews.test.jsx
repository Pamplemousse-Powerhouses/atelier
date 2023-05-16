import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import '@testing-library/jest-dom';
// import { render /* , screen */ } from '@testing-library/react';

import ratingsReviewsReducer from '../reducers/index';
import { fetchReviews } from '../actions/index';
// import RatingBreakdown from '../components/RatingBreakdown/RatingBreakdown';

import testdata from '../testData/reviews.json';

const testState = {
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
};

jest.mock('axios');

export default () => {
  describe('ReviewList component mocks', () => {
    let store;
    let currentState;

    it('should render an initial state', async () => {
      store = createStore(ratingsReviewsReducer, applyMiddleware(thunkMiddleware));

      expect(store.getState()).toEqual(testState);
    });

    it('should set state.reviews data after succesful axios call', async () => {
      axios.mockResolvedValue({ data: testdata });

      store = createStore(ratingsReviewsReducer, applyMiddleware(thunkMiddleware));
      await store.dispatch(fetchReviews(40344));
      currentState = store.getState();

      expect(currentState.reviews.product).toBe('40344');
      expect(currentState.reviews.results.length).toBe(5);
    });

    it('should set state.error data after failed axios call', async () => {
      axios.mockRejectedValue(new Error('error'));

      store = createStore(ratingsReviewsReducer, applyMiddleware(thunkMiddleware));
      await store.dispatch(fetchReviews(40344));
      currentState = store.getState();

      expect(currentState.error).toBe('error');
    });
  });
};
