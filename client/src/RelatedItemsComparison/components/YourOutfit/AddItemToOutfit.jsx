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
  top: 46%;
  color: ${(props) => props.theme.secondaryColor};
`;
export default function AddItemToOutfit({ clickHandler }) {
  const productId = useSelector((state) => state.product.data.id);

  return (
    <AddCard
      onClick={() => clickHandler(productId)}
      onKeyPress={() => clickHandler(productId)}
      role="button"
      tabIndex="0"
      data-testid="add-card"
    >
      <StyledWrapper>
        <Icons.Plus aria-hidden="true" />
      </StyledWrapper>
    </AddCard>
  );
}

AddItemToOutfit.propTypes = {
  clickHandler: PropTypes.func.isRequired,
};
