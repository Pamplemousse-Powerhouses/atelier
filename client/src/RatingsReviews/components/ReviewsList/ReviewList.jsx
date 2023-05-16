import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import ReviewTile from './ReviewTile';

export default function ReviewList({
  className,
}) {
  const reviews = useSelector((state) => state.ratingsReviews.reviews.results);
  const filter = useSelector((state) => state.ratingsReviews.filter);
  const sort = useSelector((state) => state.ratingsReviews.sort);

  const [reviewListView, setReviewListView] = useState(reviews);

  const filterReviews = () => {
    const results = [];
    reviews.forEach((review) => {
      const roundedRating = Math.round(review.rating);
      if (sort[roundedRating]) {
        results.push(review);
      }
    });
    return results;
  };

  useEffect(() => {
    if (filter) {
      setReviewListView(filterReviews());
    } else {
      setReviewListView(reviews);
    }
  }, [filter, sort, reviews]);

  const reviewTileMap = reviewListView.map((review) => (
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
    <div className={className}>
      { reviewTileMap }
    </div>
  );
}

ReviewList.propTypes = {
  className: PropTypes.string,
};

ReviewList.defaultProps = {
  className: '',
};
