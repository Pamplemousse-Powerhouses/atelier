import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledStarBox = styled.div`
`;

const StyledStar = styled.span`
  display:inline-block;
  position: relative;
  &::before {
    display: block;
    // TODO: Need to update the star icon based on stylin
    content: '★';
    color: #C3C3C3;
  }
  &::after {
    display: block;
    position:absolute;
    top: 0;
    content: '★';
    // TODO: Need to update the star icon based on stylin
    overflow: hidden;
    width: ${(props) => props.val * 100}%;
    color: #080808;
  }
`;

export default function StarRating({ rating, className }) {
  // TODO: Need to refactor to include onClick on each start
  const roundedRating = (Math.round(rating * 4) / 4).toFixed(2);
  const fullStars = Math.floor(roundedRating);

  const starArr = [];

  for (let i = 1; i <= fullStars; i += 1) {
    starArr.push(1);
  }

  if (rating < 5) {
    const partialStar = roundedRating - fullStars;
    starArr.push(partialStar);

    const emptyStars = 5 - starArr.length;
    for (let i = 0; i < emptyStars; i += 1) {
      starArr.push(0);
    }
  }

  const star = starArr.map((val, i) => <StyledStar key={i} id={i} val={val} />);

  return (
    <StyledStarBox className = {className}>
      {' '}
      {star}
      {' '}
    </StyledStarBox>
  );
}

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};