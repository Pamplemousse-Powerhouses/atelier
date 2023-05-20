import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';

const StyledDiv = styled.div`
  width: 70%;
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin:0px;
  padding:5px;
`;
const StyledButton = styled.button`
  width: 250px;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: solid 2px black;
  margin:0px;
  padding:5px;
  cursor: pointer;
  background-color: white;
  &:hover, &:focus {
      background: #eee;
      border-color: ${(props) => props.theme.secondaryColor};
      outline: none;
    }
`;

export default function AddToCartButton({ sku, num }) {
  const [disable, setDisable] = useState(true);
  useEffect(() => {
    if (sku !== 0 && num !== 0) {
      setDisable(false);
    }
  }, [sku, num]);
  const sendCartData = (skuNum, quantity) => {
    const obj = {
      sku_id: skuNum,
      count: quantity,
    };
    axios.post('/cart', {
      ...obj,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <StyledDiv>
      {disable
        ? <StyledButton aria-label="Button" data-testid="button" type="button">Add to Cart</StyledButton>
        : <StyledButton aria-label="Button" onClick={() => sendCartData(sku, num)} data-testid="button" type="button">Add to Cart</StyledButton>}
    </StyledDiv>
  );
}

AddToCartButton.propTypes = {
  sku: PropTypes.string.isRequired,
  num: PropTypes.string.isRequired,
};
