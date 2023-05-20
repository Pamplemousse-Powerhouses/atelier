import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SizeDropdown from './SizeDropdown/SizeDropdown';
import QuantityDropdown from './QuantityDropdown/QuantityDropdown';
import Icons from '../../../components/Icons';

const StyledDiv = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  margin:0px;
  padding:0px;
`;
const StyledLoading = styled.div`
  margin: 50px auto;
  text-align: center;
`;
export default function DropdownContain({ defaultNumber, addsku, setNumOfOrders }) {
  const [currentValue, setCurrentValue] = useState('');
  const isLoading = useSelector((state) => state.product.isLoading
    || state.overview.productStyles.loading);
  return (
    <StyledDiv data-testid="DropdownContainParent">
      {isLoading ? <StyledLoading><Icons.Loading size="2x" className="fa-spin" /></StyledLoading>
        : (
          <>
            <SizeDropdown
              setCurrentValue={setCurrentValue}
              defaultNumber={defaultNumber}
              addsku={addsku}
            />
            <QuantityDropdown
              currentValue={currentValue}
              defaultNumber={defaultNumber}
              setNumOfOrders={setNumOfOrders}
            />
          </>
        )}
    </StyledDiv>
  );
}

DropdownContain.propTypes = {
  defaultNumber: PropTypes.number.isRequired,
  addsku: PropTypes.func.isRequired,
  setNumOfOrders: PropTypes.func.isRequired,
};
