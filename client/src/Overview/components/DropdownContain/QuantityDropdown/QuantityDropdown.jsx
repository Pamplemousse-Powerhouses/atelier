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
export default function QuantityDropdown({ defaultNumber, currentValue }) {
  const [dropDownValue, setDropdownValue] = useState({});
  const [quantityValue, setQuantityValue] = useState({});
  const [mapValues, setMapValues] = useState([]);
  const isLoading = useSelector((state) => state.product.isLoading
                                        || state.overview.productStyles.loading);

  const styles = useSelector((state) => {
    if (state.overview.productStyles.styles.results) {
      return state.overview.productStyles.styles.results;
    }
    return [];
  });
  useEffect(() => {
    if (defaultNumber !== 1) {
      console.log('This is default number : ', defaultNumber);
      const value = styles.filter((element) => element.style_id === defaultNumber);
      setDropdownValue(value[0].skus);
    }
    const reArrange = Object.entries(dropDownValue);
    const listToMap = reArrange.map((node, idx) => (
      {
        sku: Number(reArrange[idx][0]),
        size: reArrange[idx][1].size,
        quantity: reArrange[idx][1].quantity,
      }
    ));
    if (currentValue !== 'size') {
      const val = listToMap.filter((element) => element.size === currentValue);
      if (val.length > 0) {
        const quantityLimit = [];
        for (let i = 0; i < val[0].quantity; i += 1) {
          quantityLimit.push(i + 1);
        }
        // console.log('This is quantity limit: ', quantityLimit);
        const newLimit = quantityLimit.slice(0, 15);
        setMapValues(newLimit);
      }
    }
    // console.log('Thislist to map ENTRIES****:', listToMap);

    // setMapValues(listToMap);
  }, [defaultNumber, dropDownValue, currentValue]);
  // console.log('This is dropdown:', dropDownValue);
  const handleChange = (e) => {
    const quantity = e.target.value;
    setQuantityValue(quantity);
  };
  return (
    <StyledDiv>
      {isLoading ? <StyledLoading><Icons.Loading size="2x" className="fa-spin" /></StyledLoading>
        : (
          <StyledSelect
            name="Countries"
            onChange={(e) => handleChange(e)}
            value={quantityValue}
            data-testid="QuantityDropdown"
          >
            <option value="Quantity">Quantity</option>
            {mapValues.map((item) => (
              <option key={item} value={item}>
                {/* {item.size} */}
                {item}
              </option>
            ))}
          </StyledSelect>
        )}
    </StyledDiv>
  );
}

QuantityDropdown.propTypes = {
  defaultNumber: PropTypes.number.isRequired,
  currentValue: PropTypes.string.isRequired,
};
