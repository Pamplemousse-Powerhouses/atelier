import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledRatingBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  padding-top: 0.1em;
  padding-bottom: 0.1em;
`;

const StyledRating = styled(StyledRatingBar)`
  white-space: nowrap;
  flex-basis: max-content;
  text-decoration: underline;
  padding-right: 1%;
  color: ${(props) => (props.sort ? props.theme.secondaryColor : '')};
  ${StyledRatingBar}:hover & {
    color: ${(props) => props.theme.secondaryColor};
  }
`;

const StyledBar = styled.div`
  position: relative;
  height: 0.6em;
  width: 100%;
  background-color: #C3C3C3;
  &::after {
    content: "";
    position:absolute;
    top: 0;
    overflow: hidden;
    width: ${(props) => props.value * 100}%;
    height: 0.6em;
    background-color: ${(props) => (props.sort ? props.theme.secondaryColor : '#080808')};
  }

  ${StyledRatingBar}:hover &::after {
    background-color: ${(props) => props.theme.secondaryColor};
  }
`;

export default function RatingBar({
  rating,
  value,
  ...props
}) {
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.ratingsReviews.sort);

  const updateSort = () => {
    dispatch({ type: '@reviews/sort/UPDATE', payload: { ...sort, [rating]: !sort[rating] } });
  };
  return (
    <StyledRatingBar
      className="RatingBar"
      id={rating}
      {...props}
      onClick={updateSort}
    >
      <StyledRating sort={sort[rating]}>
        {`${rating} stars`}
      </StyledRating>
      <StyledBar value={value} sort={sort[rating]} />
    </StyledRatingBar>
  );
}

RatingBar.propTypes = {
  rating: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  props: PropTypes.node,
};

RatingBar.defaultProps = {
  props: null,
};
