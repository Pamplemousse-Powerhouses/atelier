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

const StyledContainer = styled.div`
  margin: 0 auto;
  width: 60%;
  display: flex;
  flex-direction: column;

  @media (max-width: ${({ theme }) => theme.bpMobile}) {
    width: 80%;
  }

  .RatingsReviewsHeader {
    flex-direction: row;
    margin-bottom: 2%;
    align-items: baseline;
    position: sticky;
    top: 9%;
    background-color: ${(props) => props.theme.primaryColor};

    @media (max-width: ${({ theme }) => theme.bpTablet}) {
      flex-direction: column;
      position: relative;
      top: none;
    }

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
    position: sticky;
    top: 9%;
  }

  .KeywordSearch {
    align-self: center;
    flex-grow: 1;
    @media (max-width: ${({ theme }) => theme.bpMobile}) {
      width: 100%;
      margin-bottom: 1em;
    }
  }

  .Loading {
    width: 100%;
    height:100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .RatingsReviewsContent {
    display: flex;
    flex-direction: row;
    gap: 2%;

    @media (max-width: ${({ theme }) => theme.bpMobile}) {
      flex-direction: column;
    }

    @media (max-width: ${({ theme }) => theme.bpTablet}) {
      flex-direction: column;
    }

    .MetadataContent {
      height: min-content;
      min-width: 33%;
      position: sticky;
      top: 12%;
      @media (max-width: ${({ theme }) => theme.bpTablet}) {
        position: relative;
      }
      @media (max-width: ${({ theme }) => theme.bpMobile}) {
        position: relative;
      }
    }

    .ReviewsContent {
      min-width: 66%;

      .SortOptions {
        background-color: ${(props) => props.theme.primaryColor};
        position: sticky;
        top: 12%;
        padding-bottom: 2%;

        @media (max-width: ${({ theme }) => theme.bpMobile}) {
          position: relative;
        }
      }

      .ReviewList {
        z-index: -1;
        height: calc(65vh);
        overflow-y: auto;
        @media (max-width: ${({ theme }) => theme.bpMobile}) {
          max-height: none;
          overflow-y: none;
        }
      }

      .ReviewButtons {
        display: flex;
        flex-direction: row;
        gap: 1%;
      }
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

      <div className="RatingsReviewsContent">
        <div className="MetadataContent">
          {
            mloading
              ? (
                <div className="RatingBreakdown Loading">
                  <Icons.Loading size="2x" className="fa-spin" />
                </div>
              )
              : <RatingBreakdown className="RatingBreakdwon" />
          }
        </div>

        <div className="ReviewsContent">

          <SortOptions className="SortOptions" />
          {
            rloading
              ? (
                <div className="ReviewList Loading">
                  <Icons.Loading size="2x" className="fa-spin" />
                </div>
              )
              : <ReviewList className="ReviewList" />
          }

          <div className="ReviewButtons">
            {
              showMoreReviews
                ? (
                  <Button variant="large" onClick={fetchAllReviews} class="MoreReviews">
                    MORE REVIEWS
                  </Button>
                )
                : ''
            }

            <Button variant="large-add" onClick={handleAddReview} className="AddReview">
              ADD A REVIEW
            </Button>

            <Popup ref={modalRef} titles={['Write Your Review', `About the ${productName}`]}>
              <WriteNewReview productId={productId} handleCloseModal={handleCloseModal} />
            </Popup>
          </div>
        </div>
      </div>
    </StyledContainer>
  );
}
