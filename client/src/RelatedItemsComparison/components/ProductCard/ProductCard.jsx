import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import styled from 'styled-components';
import ActionButton from './ActionButton';
import StarRating from '../../../components/StarRating';
import SalePrice from './SalePrice';
import { Card } from '../../styles';

// ** STYLES ** //
const StyledCategory = styled.div`
  font-style: italic;
  color: ${(props) => props.theme.textColor};
`;

const StyledName = styled.div`
  font-weight: bold;
  color: ${(props) => props.theme.textColor};
`;

const StyledImg = styled.img`
  max-width: 100%;
  aspect-ratio: .9;
  object-fit: cover;

  @media (min-width: 1520px) {
    aspect-ratio: 1.2;
  }
`;

const StyledStarWrap = styled.div`
  .no-stars span::before {
    color: ${(props) => props.theme.loading};
  }
`;

const StyledActionWrap = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  color: white;
  &:hover {
    transform: scale(1.5);
    transition: transform 250ms ease-in-out;
  }
  .action-button:focus {
    outline: none;
    transform: scale(1.5);
    transition: transform 250ms ease-in-out;
  }
`;

const StyledNo = styled.div`
  color: ${(props) => props.theme.loading};
  font-style: italic;
`;

// ** COMPONENT ** //
export default function ProductCard({
  id, handleRemoveItemClick, symbol, handleStarClick,
}) {
  // ** REDUX ** //
  const dispatch = useDispatch();

  // ** LOCAL STATE ** //
  const [photoURL, setPhotoURL] = useState('');
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState(null);
  const [salePrice, setSalePrice] = useState('');
  const [avgRating, setAvgRating] = useState(undefined);
  const [cardClick, setCardClick] = useState(true);

  // ** AVG STAR RATING CALCULATOR ** //
  const calculateAvgRating = (ratings) => {
    const totalRatings = Object.values(ratings)
      .reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0);
    const avg = ((ratings['1'] * 1) + (ratings['2'] * 2) + (ratings['3'] * 3) + (ratings['4'] * 4) + (ratings['5'] * 5)) / totalRatings;
    return avg;
  };

  // ** API ENDPOINTS ** //
  const getNameAndCategory = () => (
    axios.get(`/products/${id}`)
  );

  const getPhotosAndPrices = () => (
    axios.get(`/products/${id}/styles`)
  );

  const getRatings = () => (
    axios.get('/reviews/meta', {
      params: { product_id: id },
    })
  );

  // ** HANDLERS ** //
  const handleClick = () => {
    if (cardClick) {
      dispatch({ type: '@product/FETCH_DATA' });
      axios.get(`/products/${id}`)
        .then((result) => {
          dispatch({ type: '@product/SET_DATA', payload: result.data });
        })
        .catch((err) => {
          dispatch({ type: '@product/FETCH_FAILED', payload: err.message });
        });
    }
  };

  const handleMouseEnter = () => {
    setCardClick(false);
  };

  const handleMouseLeave = () => {
    setCardClick(true);
  };

  // ** ON RENDER ** //
  useEffect(() => {
    axios.all([
      getNameAndCategory(),
      getPhotosAndPrices(),
      getRatings(),
    ])
      .then((axios.spread(
        (nameAndCategory, photosAndPrices, ratings) => {
          setCategory(nameAndCategory.data.category);
          setName(nameAndCategory.data.name);
          setPhotoURL(photosAndPrices.data.results[0].photos[0].url);
          setPrice(photosAndPrices.data.results[0].original_price);
          setSalePrice(photosAndPrices.data.results[0].sale_price);
          setAvgRating(calculateAvgRating(ratings.data.ratings));
        },
      )))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // ** STRUCTURE ** //
  return (
    <Card
      onClick={() => handleClick()}
      onKeyPress={() => handleClick()}
      data-testid="product-card"
      role="button"
      tabIndex="0"
    >
      <StyledActionWrap>
        <ActionButton
          id={id}
          name={name}
          handleRemoveItemClick={handleRemoveItemClick}
          symbol={symbol}
          handleStarClick={handleStarClick}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
      </StyledActionWrap>
      <StyledImg src={photoURL} />
      <StyledCategory>{category}</StyledCategory>
      <StyledName>{name}</StyledName>
      { salePrice ? <SalePrice salePrice={salePrice} price={price} /> : `$${price}`}
      <StyledStarWrap>
        {avgRating ? <StarRating rating={avgRating} /> : <StyledNo>No Reviews</StyledNo>}
      </StyledStarWrap>
    </Card>
  );
}

// ** PROPTYPES ** //
ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  handleRemoveItemClick: PropTypes.func.isRequired,
  symbol: PropTypes.string.isRequired,
  handleStarClick: PropTypes.func.isRequired,
};
