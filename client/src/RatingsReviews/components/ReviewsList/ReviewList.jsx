import React from 'react';
import ReviewTile from './ReviewTile';
import reviewsTestData from '../../testData/reviews.json';

export default function ReviewList() {
  const reviewTileMap = reviewsTestData.results.map((review) => (
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
