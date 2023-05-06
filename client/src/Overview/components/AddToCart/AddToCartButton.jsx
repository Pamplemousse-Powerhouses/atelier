import React from 'react';
import styled from 'styled-components';

const Div = styled.section`
  width: 70%;
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: solid 2px black;
  margin:0px;
  padding:5px;
`;
const Button = styled.button`
  width: 250px;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: solid 2px black;
  margin:0px;
  padding:5px;
`;
export default function AddToCartButton() {
  return (
    <Div>
      <Button type="button">Add to Cart</Button>
    </Div>
  );
}
