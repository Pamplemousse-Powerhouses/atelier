import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import AddToCartButton from './AddToCartButton';
import AddToFavButton from './AddToFavButton';

const StyledSection = styled.section`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin:0px;
  padding:5px;
`;
export default function AddToCart({ sku, num }) {
  return (
    <StyledSection>
      <AddToCartButton aria-label="Button" sku={sku} num={num} />
      <AddToFavButton />
    </StyledSection>
  );
}

AddToCart.propTypes = {
  sku: PropTypes.number.isRequired,
  num: PropTypes.string.isRequired,
};
