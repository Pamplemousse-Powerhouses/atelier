// import React from 'react';
// import { Provider } from 'react-redux';
// import '@testing-library/jest-dom';
// import {
//   render, within, waitFor, screen,
// } from '@testing-library/react';
// import axios from 'axios';
// import Overview from '../index';
// import Data from './mockData';

// jest.mock('react-redux', () => ({
//   ...jest.requireActual('react-redux'),
//   useDispatch: jest.fn(),
//   useSelector: jest.fn()
//     .mockReturnValue(40353),
// }));

// jest.mock('axios');

// afterEach(() => {
//   jest.clearAllMocks();
// });

// export default () => {
//   describe('Axios request to get product data for store', () => {
//     it('should render app component with data', async () => {
//       axios.get.mockResolvedValueOnce({ data: Data });
//       render(
//         <Provider>
//           <Overview />
//         </Provider>,
//       );
//       await waitFor(() => expect(axios.get).toHaveBeenCalled());
//       const { getByText } = within(screen.getByTestId('ProductDisplay'));
//       expect(getByText).toBeInTheDocument();
//     });
//   });
// };
