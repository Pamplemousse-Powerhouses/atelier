import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import ReviewList from './components/ReviewsList/ReviewList';
import RatingBreakdown from './components/RatingBreakdown/RatingBreakdown';
// import KeywordSearch from './components/KeywordSearch/KeywordSearch';
import SortOptions from './components/SortOptions/SortOptions';
import WriteNewReview from './components/WriteNewReview/WriteNewReview';

import Icons from '../components/Icons';
import Button from '../components/ui/Button';
import Popup from '../components/Popup';

import { fetchReviews, fetchMetadata } from './actions/index';

const StyledFlex = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${(props) => props.theme.primaryColor};
  @media (max-width: ${({ theme }) => theme.bpMobile}) {
    flex-direction: column;
  }
`;

const StyledRatingBreakdown = styled(RatingBreakdown)`
  flex-grow: 1;
  padding-right: 2.5%;
  position: sticky;
  top: 12%;
  height: min-content;
  background-color: ${(props) => props.theme.primaryColor};
  @media (max-width: ${({ theme }) => theme.bpMobile}) {
    position: static;
  }
`;

const StyledReviewList = styled.div`
  flex-grow: 3;
  max-width: 66%;
  padding: 1%;
  padding-left: 2.5%;

  .SortOptions {
    background-color: ${(props) => props.theme.primaryColor};
    position: sticky;
    top: 12%;
    padding-bottom: 2%;
    @media (max-width: ${({ theme }) => theme.bpMobile}) {
      position: relative;
    }
  }

  @media (max-width: ${({ theme }) => theme.bpMobile}) {
    max-width: 100%;
    padding: 0%;
  }
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
  max-height: calc(75vh);
  overflow-y: auto;
  @media (max-width: ${({ theme }) => theme.bpMobile}) {
    max-height: none;
    overflow-y: none;
  }
`;

const StyledContainer = styled.div`
  margin: 0 auto;
  width: 60%;

  @media (max-width: ${({ theme }) => theme.bpMobile}) {
    width: 80%;
  }

  .RatingsReviewsHeader {
    display: flex;
    flex-direction: row;
    margin-bottom: 1em;
    align-items: baseline;
    position: sticky;
    top: 9%;
    background-color: ${(props) => props.theme.primaryColor};
    @media (max-width: ${({ theme }) => theme.bpMobile}) {
      flex-direction: column;
      position: relative;
      top: none;
    }
  }

  .Header {
    font-size: 2em;
    font-family: Inter;
    align-self: center;
    flex-grow: 2;
  }

  .KeywordSearch {
    align-self: center;
    flex-grow: 1;
    @media (max-width: ${({ theme }) => theme.bpMobile}) {
      width: 100%;
      margin-bottom: 1em;
    }
  }

`;

export default function RatingsReviews() {
  const [showMoreReviews, setShowMoreReviews] = useState(true);

  const productId = useSelector((state) => state.product.data.id);
  const productName = useSelector((state) => state.product.data.name);
  const sortOption = useSelector((state) => state.sortOption);
  const rloading = useSelector((state) => state.ratingsReviews.rloading);
  const mloading = useSelector((state) => state.ratingsReviews.mloading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMetadata(productId));
    dispatch(fetchReviews(productId, sortOption, undefined, 100000));
    setShowMoreReviews(true);
    dispatch({ type: '@reviews/SET_REVIEWS_VIEWS_LENGTH', payload: 2 });
  }, [productId]);

  const fetchAllReviews = () => {
    dispatch({ type: '@reviews/SET_REVIEWS_VIEWS_LENGTH', payload: 100000 });
    setShowMoreReviews(false);
  };

  // Attaches reference to open and close functions from within modal
  const modalRef = useRef();
  const handleAddReview = () => modalRef.current.openModal();
  const handleCloseModal = () => modalRef.current.closeModal();

  return (
    <StyledContainer>
      <div className="RatingsReviewsHeader">
        <p id="ratingsReview" className="Header">
          RATINGS & REVIEWS
        </p>
        {/* <KeywordSearch className="KeywordSearch" /> */}
      </div>

      <StyledFlex>
        {
          mloading
            ? <StyledLoading><Icons.Loading size="2x" className="fa-spin" /></StyledLoading>
            : <StyledRatingBreakdown />
        }

        {
          rloading
            ? <StyledLoading><Icons.Loading size="2x" className="fa-spin" /></StyledLoading>
            : (
              <StyledReviewList>
                <SortOptions className="SortOptions" />
                <StyledReviews />
                <StyledFlex>
                  {
                    showMoreReviews
                      ? <StyledMoreReviewButton variant="large" onClick={fetchAllReviews}> MORE REVIEWS </StyledMoreReviewButton>
                      : ''
                  }
                  <StyledAddAReviewButton variant="large-add" onClick={handleAddReview}> ADD A REVIEW </StyledAddAReviewButton>
                  <Popup ref={modalRef} titles={['Write Your Review', `About the ${productName}`]}>
                    <WriteNewReview productId={productId} handleCloseModal={handleCloseModal} />
                  </Popup>
                </StyledFlex>
              </StyledReviewList>
            )
        }

      </StyledFlex>
    </StyledContainer>
  );
}
