import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Icons from '../../../../components/Icons';

const StyledDiv = styled.div`
  width: 50%;
  height: 100%;
  margin:0px;
  padding:5px;
  /* border: solid 2px black; */
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const StyledSelect = styled.select`
  width: 170px;
  height: 50px;
  margin:2px;
  padding:5px;
  border: solid 2px black;
`;
const StyledLoading = styled.div`
  margin: 50px auto;
  text-align: center;
`;
export default function SizeDropdown({ defaultNumber, setCurrentValue }) {
  const [dropDownValue, setDropdownValue] = useState({});
  const [quantityValue, setQuantityValue] = useState({});
  const [mapValues, setMapValues] = useState([]);
  const isLoading = useSelector((state) => state.product.isLoading
                                        || state.overview.productStyles.loading);

  const styles = useSelector((state) => {
    if (state.overview.productStyles.styles.results) {
      // list = state.overview.productStyles.styles.results;
      return state.overview.productStyles.styles.results;
    }
    return [];
  });
  // console.log('This is styles in dropContain:', styles);
  // console.log('This is defaultNumber:', defaultNumber);
  // const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  useEffect(() => {
    if (defaultNumber !== 1) {
      // console.log('its working default is not 1: ', defaultNumber);
      const value = styles.filter((element) => element.style_id === defaultNumber);
      setDropdownValue(value[0].skus);
    }
    const reArrange = Object.entries(dropDownValue);
    console.log('This is rearrange', reArrange);
    const listToMap = reArrange.map((node, idx) => (
      {
        sku: Number(reArrange[idx][0]),
        size: reArrange[idx][1].size,
        quantity: reArrange[idx][1].quantity,
      }
    ));
    // console.log('This is effect ENTRIES****:', Object.entries(dropDownValue));
    // console.log('Thislist to map ENTRIES****:', listToMap);
    // for ( let number of dropDownValue) {

    // }
    console.log('this is list to map', listToMap);
    setMapValues(listToMap);
  }, [defaultNumber, dropDownValue]);
  // console.log('This is dropdown:', dropDownValue);
  const handleChange = (e) => {
    // console.log('HandleChange value', e.target.value);
    const size = e.target.value;
    // console.log('This is the key', e.target.key);
    // console.log('Dropdownvalue: ', dropDownValue);
    setCurrentValue(size);
    setQuantityValue(size);
  };
  return (
    <StyledDiv
      data-testid="SizeDropdown"
    >
      {isLoading ? <StyledLoading><Icons.Loading size="2x" className="fa-spin" /></StyledLoading>
        : (
          <StyledSelect
            name="Countries"
            onChange={(e) => handleChange(e)}
            value={quantityValue}
          >
            <option value="Size">Size</option>
            {mapValues.map((item) => (
              <option key={item.sku} value={item.size}>
                { item.quantity > 0
                  ? item.size
                  : <s>{item.size}</s> }
              </option>
            ))}
          </StyledSelect>
        )}
    </StyledDiv>
  );
}

SizeDropdown.propTypes = {
  defaultNumber: PropTypes.number.isRequired,
  setCurrentValue: PropTypes.func.isRequired,
};
