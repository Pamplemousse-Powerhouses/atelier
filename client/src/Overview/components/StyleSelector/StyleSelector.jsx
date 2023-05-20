import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import StyleThumbnail from '../StyleThumbnail/StyleThumbnail';
import Icons from '../../../components/Icons';

const StyledThumbnailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  background-color:${(props) => props.theme.primaryColor};
  color:${(props) => props.theme.textColor};
`;
const StyledSurround = styled.div`
  border: lightgrey 3px solid;
  border-radius: 5px;
  padding: 5px;
  width:95%;
`;
const StyledLoading = styled.div`
  margin: 50px auto;
  text-align: center;
  color: gray;
`;
const StyledButtonContainer = styled.div`
  width:100%;
  height: 20px;
  display: flex;
  justify-content: space-around;
`;
const StyledHeader = styled.div`
  font-family: sans-serif;
`;
const StyledButtonReplacement = styled.div`
  width: 100%;
  height: 10px;
`;
export default function StyleSelector({
  defaultHandler,
  defaultNumberHandler,
}) {
  const [renderList1, setRenderList1] = useState([]);
  const [leftOverList, setLeftOverList] = useState([]);
  const [listToMap, setListToMap] = useState([]);
  const isLoading = useSelector((state) => state.product.isLoading
    || state.overview.productStyles.loading);
  const styles = useSelector((state) => {
    if (state.overview.productStyles.styles.results) {
      return state.overview.productStyles.styles.results;
    }
    return [];
  });
  const getPhotoList = (style) => {
    if (style.length === 0) {
      return [];
    }
    return style;
  };
  const photoList = getPhotoList(styles);
  let newList = photoList.slice();
  const photoList1 = getPhotoList(styles);
  const newList1 = photoList1.slice();
  const moveDefaultOnLoad = () => {
    const index = newList1.map((e) => e['default?']).indexOf(true);
    const tempList = newList1.slice();
    const value = tempList.splice(index, 1);
    tempList.unshift(...value);
    newList = tempList;
  };
  useEffect(() => {
    if (newList.length > 0) {
      if (newList[0]['default?'] !== true) {
        moveDefaultOnLoad();
      }
    }
    const doSome = (val) => {
      const groups = [];
      for (let i = 0; i < val.length; i += 4) {
        groups.push(val.slice(i, i + 4));
      }
      return groups;
    };
    const vals = doSome(newList);
    if (newList1.length < 8) {
      setRenderList1([vals[0], vals[1]]);
      setListToMap(newList.slice(0, 8));
    } else {
      setRenderList1([vals[0], vals[1]]);
      setLeftOverList(vals.slice(2));
      setListToMap(newList.slice(0, 8));
    }
  }, [isLoading]);
  const rotateUp = () => {
    const main = [...renderList1];
    const leftOvr = [...leftOverList];
    const toAddToRender = leftOvr.shift();
    const toAddToLeftOver = main.pop();
    main.unshift(toAddToRender);
    leftOvr.push(toAddToLeftOver);
    setRenderList1(main);
    setListToMap([...main[0], ...main[1]]);
    setLeftOverList(leftOvr);
  };
  const rotateDown = () => {
    const main = [...renderList1];
    const leftOvr = [...leftOverList];
    const toAddToRender = leftOvr.pop();
    const toAddToLeftOver = main.shift();
    main.push(toAddToRender);
    leftOvr.unshift(toAddToLeftOver);
    setRenderList1(main);
    setListToMap([...main[0], ...main[1]]);
    setLeftOverList(leftOvr);
  };
  return (
    <StyledSurround data-testid="StyleSelector">
      {isLoading ? <StyledLoading><Icons.Loading size="2x" className="fa-spin" /></StyledLoading>
        : (
          <>
            <StyledHeader>STYLE SELECTED</StyledHeader>
            <StyledThumbnailGrid>
              {listToMap.map((styletype, i) => (
                <StyleThumbnail
                  className={`${styletype['default?']}`}
                  data-testid={`styleSelector${i}`}
                  name={styletype.name}
                  key={styletype.style_id}
                  id={styletype.style_id}
                  defaultHandler={defaultHandler}
                  defaultNumberHandler={defaultNumberHandler}
                />
              ))}
            </StyledThumbnailGrid>
            { newList.length > 8
              ? (
                <StyledButtonContainer>
                  <Icons.ChevronDown onClick={rotateDown} />
                  <Icons.ChevronUp onClick={rotateUp} />
                </StyledButtonContainer>
              )
              : <StyledButtonReplacement />}
          </>
        )}
    </StyledSurround>
  );
}
StyleSelector.propTypes = {
  defaultHandler: PropTypes.func.isRequired,
  defaultNumberHandler: PropTypes.func.isRequired,
};
