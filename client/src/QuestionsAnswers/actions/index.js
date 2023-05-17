import axios from 'axios';

// The thunk for question-data.
export const fetchInitialQuestions = (productId) => (dispatch) => {
  dispatch({ type: '@questions/FETCH_DATA' });
  return axios.get('/qa/questions/', { params: { product_id: productId, page: 1, count: 6 } })
    .then(({ data }) => {
      dispatch({ type: '@questions/SET_DATA', payload: data.results });
    })
    .catch(({ message }) => dispatch({ type: '@questions/FETCH_FAILED', payload: message }));
};

// A thunk with a closure to keep track of the current page
export const fetchMoreQuestions = (() => {
  let currentPage = 2;
  return (productId) => (dispatch) => {
    dispatch({ type: '@questions/FETCH_DATA' });
    return axios.get('/qa/questions/', { params: { product_id: productId, page: currentPage, count: 6 } })
      .then(({ data }) => {
        dispatch({ type: '@questions/ADD_QUESTIONS', payload: data.results });
        currentPage += 1;
        return data;
      })
      .catch(({ message }) => dispatch({ type: '@questions/FETCH_FAILED', payload: message }));
  };
})();

export const postQuestion = (productId, question) => (dispatch) => {
  dispatch({ type: '@questions/FETCH_DATA' });
  return axios.post('/qa/questions', { ...question, product_id: productId })
    .then(() => {
      dispatch({ type: '@questions/ADD_QUESTIONS', payload: [question] });
    })
    .then(() => {
      dispatch(fetchMoreQuestions(productId));
    })
    .catch(({ message }) => dispatch({ type: '@questions/FETCH_FAILED', payload: message }));
};

export const postAnswer = (productId, questionId, answer) => (dispatch) => {
  dispatch({ type: '@questions/FETCH_DATA' });
  return axios.post(`/qa/questions/${questionId}/answers`, answer)
    .then(() => {
      dispatch({ type: '@answers/ADD_ANSWER', payload: answer });
    })
    .then(() => {
      dispatch(fetchMoreQuestions(productId));
    })
    .catch(({ message }) => dispatch({ type: '@questions/FETCH_FAILED', payload: message }));
};

// Template thunk
export const example = () => () => {};
