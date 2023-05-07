import React from 'react';
// import Overview from './Overview';
import QuestionsAnswers from './QuestionsAnswers';
import RelatedItemsComparisons from './RelatedItemsComparison';
import RatingsReviews from './RatingsReviews';

import { GlobalStyle, Theme } from './globalStyles';

export default function App() {
  return (
    <div>
      <Theme>
        <GlobalStyle />
        {/* <Overview /> */}
        <RelatedItemsComparisons />
        <QuestionsAnswers />
        <RatingsReviews />
      </Theme>
    </div>
  );
}
