import React from 'react';
// import Overview from './Overview';
import QuestionsAnswers from './QuestionsAnswers';
// import RatingsReviews from './RatingsReviews';
import RelatedItemsComparisons from './RelatedItemsComparison';
import RatingsReviews from './RatingsReviews';
// import RelatedItemsComparisons from './RelatedItemsComparisons';

export default function App() {
  return (
    <div>
      {/* <Overview /> */}
      <QuestionsAnswers />
      {/* <RatingsReviews /> */}
      <RelatedItemsComparisons />
      <RatingsReviews />
    </div>
  );
}
