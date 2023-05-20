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
export default function SizeDropdown({
  defaultNumber,
  setCurrentValue,
  addsku,
  changeHandler,
}) {
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
  const previous = [];
  previous.push(defaultNumber);
  useEffect(() => {
    if (styles.length > 0) {
      if (defaultNumber !== 1) {
        const checker = styles.filter((element) => element.style_id === defaultNumber);
        if (checker.length > 0) {
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
        setMapValues(listToMap);
      }
    }
  }, [defaultNumber]);
  const handleChange = (e) => {
    const size = e.target.value;
    mapValues.map((item) => {
      if (item.size === size) {
        addsku(item.sku);
      }
      return true;
    });
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
            onClick={changeHandler}
            value={quantityValue}
          >
            <option value="Size" aria-label="Button">Size</option>
            {mapValues.map((item) => (
              <option
                onClick={changeHandler}
                key={item.sku}
                aria-label={item.size}
                value={item.size}
              >
                {item.quantity > 0
                  ? item.size
                  : <s>{item.size}</s>}
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
  changeHandler: PropTypes.func.isRequired,
  addsku: PropTypes.func.isRequired,
};
