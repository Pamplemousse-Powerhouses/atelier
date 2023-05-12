import React from 'react';
import { useSelector } from 'react-redux';

import ReviewTile from './ReviewTile';

export default function ReviewList() {
  const reviews = useSelector((state) => state.ratingsReviews.reviews);

  const reviewTileMap = reviews.results.map((review) => (
    <ReviewTile
      key={review.review_id}
      id={review.review_id}
      rating={review.rating}
      summary={review.summary}
      recommend={review.recommend}
      response={review.response}
      body={review.body}
      date={review.date}
      reviewerName={review.reviewer_name}
      helpfulness={review.helpfulness}
      photos={review.photos}
    />
  ));

  return (
    <div>
      { reviewTileMap }
    </div>
  );
}
