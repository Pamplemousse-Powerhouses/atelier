import React, { useState, useEffect, useCallback } from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ProductDisplay from './components/ProductDisplay/ProductDisplay';
import ProductInfo from './components/ProductInfo/ProductInfo';
import ImageGalleryExpand from './components/ImageGallery/ImageGalleryExpand';

const Section = styled.section`
  width: 100%;
  height: 1000px;
  display: flex;
  flex-direction: column;
  border: solid 2px black;
`;
export default function Overview() {
  const [renderCheckout, setRenderCheckout] = useState(true);
  const [defaultList, setDefaultList] = useState([]);
  // const [product, setProduct] = useState(40344);
  const [defaultNumber, setDefaultNumber] = useState(1);
  const [bgImg, setBgImg] = useState('');
  const dispatch = useDispatch();
  // setProduct(40344);
  // 40344,40345, 40346, 40347, 40348
  // console.log(setProduct);
  // const product = 40344;
  const product = useSelector((state) => {
    if (state.product.data.id) {
      console.log('This is product data id:', state.product.data.id);
      return state.product.data.id;
    }
    return 40344;
  });
  useEffect(() => {
    dispatch({ type: '@styles/FETCH_DATA' });
    axios.get(`/products/${product}/styles`)
      .then((result) => {
        setDefaultList(result.data.results);
        setDefaultNumber(result.data.results[0].style_id);
        dispatch({ type: '@styles/SET_DATA', payload: result.data });
      })
      .catch((error) => {
        dispatch({ type: '@styles/FETCH_FAILED', payload: error.message });
      });
  }, []);
  const onClickHandler = useCallback(() => {
    setRenderCheckout(!renderCheckout);
  });
  const bgHndle = (val) => {
    setBgImg(val.url);
  };
  console.log('This is background image : ', bgImg);
  // console.log('This is default NUMBER: ', defaultNumber);
  // console.log('This is default list', defaultList);
  return (
    <Section data-testid="index">
      { renderCheckout
        ? (
          <ProductDisplay
            data-testid="ProductDisplay"
            product={product}
            defaultList={defaultList}
            defaultHandler={setDefaultList}
            defaultNumber={defaultNumber}
            defaultNumberHandler={setDefaultNumber}
            bg={bgImg}
            bgHandler={bgHndle}
            onClickHandler={onClickHandler || (() => {})}
          />
        )
        : (
          <ImageGalleryExpand
            bg={bgImg}
            onClickHandler={onClickHandler}
            defaultNumber={defaultNumber}
            bgHandler={bgHndle}
          />
        )}
      <ProductInfo />
    </Section>
  );
}
// ProductDisplay.propTypes = {
//   onClickHandler: PropTypes.func.isRequired,
// };

// ProductDisplay.defaultProps = {
//   onClickHandler: PropTypes.func.isRequired,
// };
