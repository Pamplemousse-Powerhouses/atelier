import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Icons from '../../../components/Icons';

const StyledAside = styled.aside`
  width: 100%;
  height: 20%;
  display: flex;
  border: solid 2px ${(props) => props.theme.textColor};
  padding: 10px;
  background-color:${(props) => props.theme.primaryColor};
  color:${(props) => props.theme.textColor};
`;
const StyledLoading = styled.div`
  margin: 50px auto;
  text-align: center;
  color: gray;
`;
export default function ProductInfo() {
  const isLoading = useSelector((state) => state.product.isLoading
    || state.overview.productStyles.loading);
  const description = useSelector((state) => state.product.data.description);

  return (
    <StyledAside>
      {isLoading ? <StyledLoading><Icons.Loading size="2x" className="fa-spin" /></StyledLoading>
        : (
          <div>{description}</div>
        )}
    </StyledAside>
  );
}
