import axios from 'axios';

export const fetchReviews = (
  productId,
  sort = 'relevant',
  page = 1,
  count = 10000,
) => (dispatch) => {
  dispatch({ type: '@reviews/FETCH_DATA' });
  if (productId !== undefined) {
    return axios({
      method: 'GET',
      url: '/reviews',
      params: {
        product_id: productId, sort, page, count,
      },
    })
      .then(({ data }) => {
        dispatch({ type: '@reviews/SET_DATA', payload: data });
      })
      .catch(({ message }) => {
        dispatch({ type: '@reviews/FAILED', payload: message });
      });
  }
  return new Promise((reject) => {
    reject(new Error('There is no product ID.'));
  });
};

export const fetchMetadata = (
  productId,
) => (dispatch) => {
  dispatch({ type: '@reviews/meta/FETCH_DATA' });
  if (productId !== undefined) {
    return axios({
      method: 'GET',
      url: '/reviews/meta',
      params: { product_id: productId },
    })
      .then(({ data }) => {
        dispatch({ type: '@reviews/meta/SET_DATA', payload: data });
      })
      .catch(({ message }) => {
        dispatch({ type: '@reviews/meta/FAILED', payload: message });
      });
  }
  return new Promise((reject) => {
    reject(new Error('There is no product ID.'));
  });
};

export const putHelpfulReport = (
  reviewId,
  type, // helpful, report
) => () => axios({
  method: 'PUT',
  url: `/reviews/${reviewId}/${type}`,
});
