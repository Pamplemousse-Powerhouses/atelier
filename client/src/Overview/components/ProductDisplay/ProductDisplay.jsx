import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { useSelector } from 'react-redux';
import ImageGalleryDefault from '../ImageGallery/ImageGalleryDefault';
// import ImageGalleryExpand from '../ImageGallery/ImageGalleryExpand';
import CheckoutDisplay from '../CheckoutDisplay/CheckoutDisplay';

const StyledDiv = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  border: solid 2px black;
`;
export default function ProductDisplay({
  product,
  onClickHandler,
  bg,
  bgHandler,
  defaultHandler,
  defaultNumber,
  defaultNumberHandler,
}) {
  // const [renderCheckout, setRenderCheckout] = useState(true);
  // const onClickHandler = function Clicker() {
  //   console.log('I have been clicked!');
  //   setRenderCheckout(!renderCheckout);
  // };
  // const styles = useSelector((state) => {
  //   console.log('This is state in productDisplay: ', state);
  //   return state.overview.productStyles.styles.results;
  // });
  return (
    <StyledDiv data-testid="ProductDisplay">
      <ImageGalleryDefault
        bg={bg}
        // defaultHandler={defaultHandler}
        bgHandler={bgHandler}
        onClickHandler={onClickHandler || (() => {})}
        defaultNumber={defaultNumber}
      />
      <CheckoutDisplay
        product={product}
        defaultHandler={defaultHandler}
        defaultNumber={defaultNumber}
        defaultNumberHandler={defaultNumberHandler}
      />
    </StyledDiv>
  );
}

ProductDisplay.propTypes = {
  onClickHandler: PropTypes.func,
  bg: PropTypes.string.isRequired,
  bgHandler: PropTypes.func.isRequired,
  // defaultList: PropTypes.array.isRequired,
  defaultHandler: PropTypes.func.isRequired,
  defaultNumberHandler: PropTypes.func.isRequired,
  defaultNumber: PropTypes.number.isRequired,
  product: PropTypes.number.isRequired,
};

ProductDisplay.defaultProps = {
  onClickHandler: () => {},
  // bg: PropTypes.objectOf(PropTypes.string),
  // defaultList: PropTypes.arrayof(PropTypes.strings),
  // bgHandler: PropTypes.func.isRequired,
};
