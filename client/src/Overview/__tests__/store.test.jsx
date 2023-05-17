// import React from 'react';
// import '@testing-library/jest-dom';
// import axios from 'axios';
// import {
//   render,
//   fireEvent,
//   waitFor,
//   screen,
// } from '@testing-library/react';
// import { useDispatch, Provider } from 'react-redux';
// import configureStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import Data from './mockData';

// import { answerMock } from './__mocks__/mockData';
// import Answer from '../components/Answer';

// // Function Mocks

// jest.mock('axios');

// jest.mock('react-redux', () => ({
//   ...jest.requireActual('react-redux'),
//   useDispatch: jest.fn(),
//   useSelector: jest.fn(),
// }));

// jest.mock('../components/AnswersList');
// const mockStore = configureStore(Data);

// export default () => {
//   let store;
//   let dispatchMock;
//   beforeEach(() => {
//     jest.clearAllMocks();

//     dispatchMock = jest.fn();
//     useDispatch.mockReturnValue(dispatchMock);
//     store = mockStore();
//   });

//   describe('Answer Widget Functionality', () => {
//     it('should make an axios request and dispatch an action when widgets are clicked',
// async () => {
//       axios.put.mockResolvedValueOnce();

//       const { getByText } = render(
//         <Provider store={store}>
//           <Answer answer={answerMock[0]} />
//         </Provider>,
//       );

//       // const reportButton = getByText('Report');
//       // const yesButton = getByText('Yes');

//       // Click report button and assert

//       // fireEvent.click(reportButton);

//       await waitFor(() => expect(axios.put)
// .toHaveBeenCalledWith(`/qa/answers/${answerMock[0].id}/report`));
//       expect(dispatchMock).toHaveBeenCalled();

//       // Clear the mock history of axios.put and dispatch
//       axios.put.mockClear();
//       axios.put.mockResolvedValueOnce();
//       dispatchMock.mockClear();

//       // Now click yes button and test
//       // fireEvent.click(yesButton);

//       await waitFor(() => expect(axios.put)
// .toHaveBeenCalledWith(`/qa/answers/${answerMock[0].id}/helpful`));
//       expect(dispatchMock).toHaveBeenCalled();
//     });

//     it('should display photos that were within answer', () => {
//       render(
//         <Provider store={store}>
//           <Answer answer={answerMock[1]} />
//         </Provider>,
//       );
//       const photos = screen.queryAllByTestId('photo');
//       expect(photos).toHaveLength(answerMock[1].photos.length);
//     });
//   });
// };
