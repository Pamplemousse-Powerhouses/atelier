import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AddCard } from '../../styles';
import Icons from '../../../components/Icons';

const StyledWrapper = styled.div`
  width: 100%;
  text-align: center;
  font-size: 2rem;
  position: relative;
  top: 46%;
  color: ${(props) => props.theme.secondaryColor};
`;
export default function AddItemToOutfit({ clickHandler }) {
  const productId = useSelector((state) => state.product.data.id);

  return (
    <AddCard onClick={() => clickHandler(productId)} data-testid="add-card">
      <StyledWrapper>
        <Icons.Plus />
      </StyledWrapper>
    </AddCard>
  );
}

AddItemToOutfit.propTypes = {
  clickHandler: PropTypes.func.isRequired,
};
