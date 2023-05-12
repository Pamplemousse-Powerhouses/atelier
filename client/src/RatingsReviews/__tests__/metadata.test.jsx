import React from 'react';
import axios from 'axios';
import { createStore, applyMiddleware, Provider } from 'redux';
import thunkMiddleware from 'redux-thunk';
import '@testing-library/jest-dom';
import { render /* , screen */ } from '@testing-library/react';

import ratingsReviewsReducer from '../reducers/index';
import { fetchMetadata } from '../actions/index';
// import RatingBreakdown from '../components/RatingBreakdown/RatingBreakdown';
import App from '../../App';

import testdata from '../testData/metaData.json';

const testState = {
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
  rloading: true,
  mloading: true,
  error: null,
};

jest.mock('axios');

export default () => {
  describe('Metadata component mocks', () => {
    let store;
    let currentState;

    it('should render an initial state', async () => {
      store = createStore(ratingsReviewsReducer, applyMiddleware(thunkMiddleware));

      expect(store.getState()).toEqual(testState);
    });

    it('should set state.meta data after succesful axios call', async () => {
      axios.mockResolvedValue({ data: testdata });

      store = createStore(ratingsReviewsReducer, applyMiddleware(thunkMiddleware));
      await store.dispatch(fetchMetadata(40344));
      currentState = store.getState();

      expect(currentState.meta.product_id).toBe('40346');
      expect(currentState.meta.recommended.false).toBe('69');
      expect(currentState.meta.characteristics.Fit.id).toBe(135224);
    });

    xit('it should render RatingBreakdown with overall rating', async () => {
      render(
        <Provider store={store}>
          <App />
        </Provider>,
      );

      console.log(store.getState());
    });

    it('should set state.error data after failed axios call', async () => {
      axios.mockRejectedValue(new Error('error'));

      store = createStore(ratingsReviewsReducer, applyMiddleware(thunkMiddleware));
      await store.dispatch(fetchMetadata(40344));
      await store.getState();

      await expect(store.getState().error).toBe('error');
    });
  });
};
