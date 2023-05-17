import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import ReviewList from './components/ReviewsList/ReviewList';
import RatingBreakdown from './components/RatingBreakdown/RatingBreakdown';
import Button from '../components/ui/Button';
import SortOptions from './components/SortOptions/SortOptions';
// import WriteNewReview from './components/WriteNewReview/WriteNewReview';
import Icons from '../components/Icons';

import { fetchReviews, fetchMetadata } from './actions/index';

const StyledFlex = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledRatingBreakdown = styled(RatingBreakdown)`
  flex-grow: 1;
  padding-right: 2.5%;
  position: sticky;
  top: 4%;
  height: min-content;
`;

const StyledReviewList = styled.div`
  flex-grow: 3;
  max-width: 66%;
  padding: 1%;
  padding-left: 2.5%;
`;

const StyledRatingsReviews = styled.div`
  padding-bottom: 1%;
  position: sticky;
  top: 1%;
`;

const StyledMoreReviewButton = styled(Button)`
  margin-left: 0%;
  position: sticky;
  bottom: 2%;
`;

const StyledAddAReviewButton = styled(Button)`
  margin-left: 0%;
  position: sticky;
  top: 95%;
  $::after {
    content: font
  }
`;

const StyledLoading = styled.div`
  margin: 50px auto;
  text-align: center;
  color: gray;
`;

const StyledReviews = styled(ReviewList)`
  max-height: calc(100vh - 100px);
  overflow-y: scroll;
`;

export default function RatingsReviews() {
  const [showMoreReviews, setShowMoreReviews] = useState(true);

  const productId = useSelector((state) => state.product.data.id);
  const sortOption = useSelector((state) => state.sortOption);
  const rloading = useSelector((state) => state.ratingsReviews.rloading);
  const mloading = useSelector((state) => state.ratingsReviews.mloading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMetadata(productId));
    dispatch(fetchReviews(productId, undefined, undefined, 2))
      .then(dispatch({ type: '@reviews/SET_REVIEWS_VIEWS_LENGTH', payload: 2 }));
    setShowMoreReviews(true);
  }, [productId]);

  const fetchAllReviews = () => {
    dispatch(fetchReviews(productId, sortOption, undefined, 100000))
      .then(dispatch({ type: '@reviews/SET_REVIEWS_VIEWS_LENGTH', payload: 100000 }));
    setShowMoreReviews(false);
  };

  return (
    <div>
      <StyledRatingsReviews>
        RATINGS & REVIEWS
      </StyledRatingsReviews>
      <StyledFlex>
        {
          rloading
            ? <StyledLoading><Icons.Loading size="2x" className="fa-spin" /></StyledLoading>
            : <StyledRatingBreakdown />
        }

        {
          mloading
            ? <StyledLoading><Icons.Loading size="2x" className="fa-spin" /></StyledLoading>
            : (
              <StyledReviewList>
                <SortOptions />
                <StyledReviews />
                <StyledFlex>
                  {
                    showMoreReviews
                      ? <StyledMoreReviewButton variant="large" onClick={fetchAllReviews}> MORE REVIEWS </StyledMoreReviewButton>
                      : ''
                  }
                  <StyledAddAReviewButton variant="large-add"> ADD A REVIEW </StyledAddAReviewButton>
                </StyledFlex>
              </StyledReviewList>
            )
        }

      </StyledFlex>
    </div>
  );
}
