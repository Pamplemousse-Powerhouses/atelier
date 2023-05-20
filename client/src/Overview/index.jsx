import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ProductDisplay from './components/ProductDisplay/ProductDisplay';
import ProductInfo from './components/ProductInfo/ProductInfo';
import ImageGalleryExpand from './components/ImageGallery/ImageGalleryExpand';

const Section = styled.section`
 margin-left: 10%;
  width: 80%;
  height: 1000px;
  display: flex;
  flex-direction: column;
  border: solid 2px ${(props) => props.theme.textColor};
  @media(max-width: ${((props) => props.theme.bpMobile)}){
    width: 100%;
    height: 1600px;
  }
  @media(max-width: ${((props) => props.theme.bpTablet)})){
    width: 100%;
    height: 1600px;
  }
  a {
    /* background-color:${(props) => props.theme.background}; */
    color:${(props) => props.theme.textColor};
    background-color: red;
  }
`;
export default function Overview() {
  const [renderCheckout, setRenderCheckout] = useState(true);
  const [defaultList, setDefaultList] = useState([]);
  const [product, setProduct] = useState(40344);
  const [defaultNumber, setDefaultNumber] = useState(1);
  const [bgImg, setBgImg] = useState('');
  const dispatch = useDispatch();
  const productid = useSelector((state) => {
    if (state.product.data.id) {
      console.log('This is product data id:', state.product.data.id);
      console.log('This is product data xxxx:', state.product.data);
      return state.product.data.id;
    }
    console.error('This use selector in index is not working');
    return undefined;
  });
  if (productid !== product) {
    setProduct(productid);
  }
  console.log('This is default Number Index Line 39: ', defaultNumber);
  // const product = 40347;
  useEffect(() => {
    dispatch({ type: '@styles/FETCH_DATA' });
    axios.get(`/products/${product}/styles`)
      .then((result) => {
        console.log('This is set default Number Index Line 45', result.data.results[0].style_id);
        setDefaultList(result.data.results);
        setDefaultNumber(result.data.results[0].style_id);
        dispatch({ type: '@styles/SET_DATA', payload: result.data });
      })
      .catch((error) => {
        dispatch({ type: '@styles/FETCH_FAILED', payload: error.message });
      });
    console.log('This is product in index : ', product);
  }, [product]);
  const onClickHandler = useCallback(() => {
    setRenderCheckout(!renderCheckout);
  });
  const bgHndle = (val) => {
    setBgImg(val.url);
  };
  console.log('This is default Number Index Line 60: ', defaultNumber);
  return (
    <Section data-testid="index">
      {renderCheckout
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
            onClickHandler={onClickHandler || (() => { })}
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
