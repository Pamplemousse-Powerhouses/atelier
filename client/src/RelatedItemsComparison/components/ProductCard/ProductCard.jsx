import React from 'react';
import styled from 'styled-components';
import { Card } from '../../styles';

const StyledCategory = styled.div`
`;
const StyledName = styled.div`
`;
const StyledPrice = styled.div`
`;
const Rating = styled.div`
  // will likely delete this when the Rating component is eventually imported and used
`;
const StyledImg = styled.div`
`;
export default function ProductCard() {
  return (
    <Card>
      <StyledCategory>Category</StyledCategory>
      <StyledName>Name</StyledName>
      <StyledPrice>
        Price - for the default style
        <br />
        Sale prices should be reflected
        <br />
        if on sale:
        <br />
        sale price in red and og price struckthrough
      </StyledPrice>
      <Rating />
      <StyledImg>preview image/images</StyledImg>
    </Card>
  );
}
