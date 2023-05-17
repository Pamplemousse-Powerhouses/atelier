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
  /* border: solid 2px black; */
  margin:0px;
  padding:0px;
`;
const StyledLoading = styled.div`
  margin: 50px auto;
  text-align: center;
`;
export default function DropdownContain({ defaultNumber }) {
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
            />
            <QuantityDropdown currentValue={currentValue} defaultNumber={defaultNumber} />
          </>
        )}
    </StyledDiv>
  );
}

DropdownContain.propTypes = {
  defaultNumber: PropTypes.number.isRequired,
};
