/* eslint-env jest */
import React from 'react';
import '@testing-library/jest-dom';
import {
  render, within, waitFor, screen, fireEvent,
} from '@testing-library/react';
import axios from 'axios';
import configureStore from 'redux-mock-store';
import { Provider, useSelector, useDispatch } from 'react-redux';

import RelatedItems from '../components/RelatedItems/RelatedItems';
import ProductCard from '../components/ProductCard/ProductCard';

import { productMock, stylesMock, reviewsMetaMock } from './__mocks__/mockData';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('axios', () => ({
  ...jest.requireActual('axios'),
  get: jest.fn(),
}));

export default () => {
  const mockStore = configureStore();
  let store;
  let dispatchMock;

  beforeEach(() => {
    jest.clearAllMocks();

    dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);

    store = mockStore();
  });
  it('should dispatch product id to the redux store when product card is clicked', async () => {
    axios.get.mockImplementation((url) => {
      switch (url) {
        case '/products/41009':
          return Promise.resolve({
            data: productMock,
          });
        case '/products/41009/styles':
          return Promise.resolve({
            data: stylesMock,
          });
        case '/reviews/meta':
          return Promise.resolve({
            data: reviewsMetaMock,
          });
        default:
          return Promise.reject(new Error('not found'));
      }
    });

    render(
      <Provider store={store}>
        <ProductCard
          id={41009}
          handleRemoveItemClick={() => {}}
          symbol=""
          handleStarClick={() => {}}
        />
      </Provider>,
    );

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(3));

    const productCard = screen.getByTestId('product-card');

    fireEvent.click(productCard);

    expect(dispatchMock).toHaveBeenCalled();
  });

  it('should render a default card if there are no related products to show', async () => {
    useSelector.mockReturnValue(40353);
    axios.get.mockResolvedValueOnce({ data: [] });
    render(<RelatedItems />);
    await waitFor(() => expect(axios.get).toHaveBeenCalled());
    const { getByText } = within(screen.getByTestId('default-card'));
    expect(getByText('No Related Items...')).toBeInTheDocument();
  });
};
