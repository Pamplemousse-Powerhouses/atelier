import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { useSelector } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import AddToCart from '../AddToCart/AddToCart';
import StyleSelector from '../StyleSelector/StyleSelector';
import DropdownContain from '../DropdownContain/DropdownContain';
import Twitter from './Twitter';
import Facebook from './Facebook';
// import StarRating from '../../../components/StarRating';

const StyledDiv = styled.div`
  /* width: 40%; */
  width: 450px;
  height: 98%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  /* border: solid 2px black; */
  margin:2px;
  padding:5px;
  border-left:solid 1px black;
`;
const StyledProductDetails = styled.div`
  /* width: 40%; */
  width: 98%;
  height: 98%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: left;
  /* border: solid 2px black; */
  margin:2px;
  padding:5px;
.category {
  font-family: sans-serif;
}
.name {
  font-family: sans-serif;
  font-size: 40px;
}
.slogan {
  font-family: serif;
}
`;
const StyledSection = styled.section`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  /* border: solid 2px blue; */
  padding:2px;
`;
const StyledSocialMedia = styled.section`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
`;

export default function ProductDisplay({
  product,
  defaultHandler,
  defaultNumber,
  defaultNumberHandler,
}) {
  const [currentItem, setCurrentItem] = useState({});
  // const ReviewsNum = useSelector((state) => state.ratingsReviews.reviews.results.length);
  // console.log('This is where thangs selector is');
  useEffect(() => {
    axios.get(`/products/${product}`)
      .then((result) => {
        setCurrentItem(result.data);
      })
      .catch((error) => {
        throw error;
      });
  }, []);
  return (
    <StyledDiv>
      <StyledProductDetails>
        {/* <StarRating rating={3} className="StarRating" /> */}
        <p className="category">{currentItem.category}</p>
        <div>
          <p className="name">{currentItem.name}</p>
          <p className="defaultprice">{currentItem.default_price}</p>
        </div>
        <p className="slogan">{currentItem.slogan}</p>
        <StyledSocialMedia>
          <Twitter />
          <Facebook />
        </StyledSocialMedia>
      </StyledProductDetails>
      <StyleSelector
        defaultHandler={defaultHandler}
        defaultNumber={defaultNumber}
        defaultNumberHandler={defaultNumberHandler}
      />
      <StyledSection>
        <DropdownContain defaultNumber={defaultNumber} />
        <AddToCart />
      </StyledSection>
    </StyledDiv>
  );
}
ProductDisplay.propTypes = {
  defaultHandler: PropTypes.func.isRequired,
  defaultNumberHandler: PropTypes.func.isRequired,
  defaultNumber: PropTypes.number.isRequired,
  product: PropTypes.number.isRequired,
};
