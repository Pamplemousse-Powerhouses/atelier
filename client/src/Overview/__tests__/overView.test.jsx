import React from 'react';
import '@testing-library/jest-dom';
import { useSelector } from 'react-redux';
import {
  render,
  fireEvent,
  act,
  screen,
} from '@testing-library/react';
import Data from './mockData';
import AddToFavButton from '../components/AddToCart/AddToFavButton';
import StyleThumbnail from '../components/StyleThumbnail/StyleThumbnail';
import StyleSelector from '../components/StyleSelector/StyleSelector';
import ImageThumbnail from '../components/ImageGallery/ImageThumbnail';
import ImageGallery from '../components/ImageGallery/ButtonNav';
import QuantityDropdown from '../components/DropdownContain/QuantityDropdown/QuantityDropdown';
import SizeDropdown from '../components/DropdownContain/SizeDropdown/SizeDropdown';
import DropdownContain from '../components/DropdownContain/DropdownContain';
import Twitter from '../components/CheckoutDisplay/Twitter';
import Facebook from '../components/CheckoutDisplay/Facebook';
import ProductDisplay from '../components/ProductDisplay/ProductDisplay';

afterEach(() => {
  jest.clearAllMocks();
});
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));
// const mockStore = configureStore();
// let store;
// beforeEach(() => {
//   store = mockStore();
// });
export default () => {
  describe('Components Render Properly', () => {
    beforeEach(() => {
      useSelector.mockImplementation((callback) => callback(Data));
    });
    afterEach(() => {
      useSelector.mockClear();
    });
    it('This is inside Overview', () => {
      expect(true).toBe(true);
    });
    it('Should render a Style Selector Thumbnail', async () => {
      await act(async () => render(
        <StyleThumbnail />,
      ));
      const thumbnail = await screen.getByTestId('StyleThumbnails');
      expect(thumbnail).toBeInTheDocument();
    });
    it('Should render an Image Thumbnail', async () => {
      await act(async () => render(
        <ImageThumbnail />,
      ));
      const thumbnail = await screen.getByTestId('ImageThumbnails');
      expect(thumbnail).toBeInTheDocument();
    });
    it('Should render an Expand Button', async () => {
      await act(async () => render(
        <ImageGallery />,
      ));
      const thumbnail = await screen.getByTestId('ExpandButton');
      expect(thumbnail).toBeInTheDocument();
    });
    it('Should render an Expand Icon', async () => {
      await act(async () => render(
        <ImageGallery />,
      ));
      const thumbnail = await screen.getByTestId('ExpandIcon');
      expect(thumbnail).toBeInTheDocument();
    });
    it('Should render Left Icon', async () => {
      await act(async () => render(
        <ImageGallery />,
      ));
      const thumbnail = await screen.getByTestId('LeftIcon');
      expect(thumbnail).toBeInTheDocument();
    });
    it('Should render Right Icon', async () => {
      await act(async () => render(
        <ImageGallery />,
      ));
      const thumbnail = await screen.getByTestId('RightIcon');
      expect(thumbnail).toBeInTheDocument();
    });

    it('Should render Quantity Dropdown selection', async () => {
      await act(async () => render(
        <QuantityDropdown
          defaultNumber={240500}
        />,
      ));
      const dropdown = await screen.getByTestId('QuantityDropdown');
      expect(dropdown).toBeInTheDocument();
    });
    it('Should render Size Dropdown selection', async () => {
      await act(async () => render(
        <SizeDropdown
          defaultNumber={240500}
        />,
      ));
      const dropdown = await screen.getByTestId('SizeDropdown');
      expect(dropdown).toBeInTheDocument();
    });
    it('Should render Dropdown Contain Conditional', async () => {
      await act(async () => render(
        <DropdownContain
          defaultNumber={240500}
        />,
      ));
      const container = await screen.getByTestId('DropdownContainParent');
      expect(container).toBeInTheDocument();
    });
    it('Should render Facebook Link', async () => {
      await act(async () => render(
        <Facebook />,
      ));
      const component = await screen.getByTestId('Facebook');
      expect(component).toBeInTheDocument();
    });
    it('Should render Twitter Link', async () => {
      await act(async () => render(
        <Twitter />,
      ));
      const component = await screen.getByTestId('Twitter');
      expect(component).toBeInTheDocument();
    });
    it('Should render Style Selector Parent Component', async () => {
      await act(async () => render(
        <StyleSelector />,
      ));
      const component = await screen.getByTestId('StyleSelector');
      expect(component).toBeInTheDocument();
    });
    it('Should render Product Display Component', async () => {
      await act(async () => render(
        <ProductDisplay
          defaultNumber={240500}
          bgHandler={() => { }}
        />,
      ));
      const component = await screen.getByTestId('ProductDisplay');
      expect(component).toBeInTheDocument();
    });
    it('Should have a value of 1 after event fire', () => {
      const { getByTestId } = render(<AddToFavButton />);
      const countTextNode = getByTestId('counter');
      fireEvent.click(getByTestId('button-up'));
      expect(countTextNode.textContent).toBe('1');
    });
  });
};
