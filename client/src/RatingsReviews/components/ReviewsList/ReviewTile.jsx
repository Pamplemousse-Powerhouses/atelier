import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NameDate from '../../../components/NameDate';
import StarRating from '../../../components/StarRating';
import Divider from '../../../components/Divider';
import Report from '../../../components/Report';
import Helpful from '../../../components/Helpful';
import Response from './Response';

// Example Review Object
// {
//   "review_id": 1274707,
//   "rating": 3,
//   "summary": "w",
//   "recommend": true,
//   "response": null,
//   "body": "w",
//   "date": "2022-05-29T00:00:00.000Z",
//   "reviewer_name": "w",
//   "helpfulness": 0,
//   "photos": [
//       {
//           "id": 2454928,
//           "url": "text"
//       }
//   ]
// }

const StyledUserInfo = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 2%;
`;

const StyledStarRating = styled(StarRating)`
  display: flex;
  flex-direction: row;
  align-self: flex-start;
`;

const StyledNameDate = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;
`;

const StyledSummary = styled.div`
  font-weight: bold;
  font-size: 150%;
  padding-bottom: 2%;
`;

const StyledBody = styled.div`
  padding-bottom: 2%;
`;

const StyledRecommend = styled.div`
  padding-bottom: 2%;
`;

const StyledResponse = styled(Response)`
  margin-bottom: 2%;
  border: transparent;
`;

const StyledReviewTile = styled.div`
  padding-top: 5%;
  padding-bottom: 3%;
  border-bottom: solid black 2px;
`;

export default function ReviewTile({
  rating,
  summary,
  recommend,
  response,
  body,
  date,
  reviewerName,
  helpfulness,
  photos,
  className,
}) {
  const hasResponse = () => response !== null;

  return (
    <StyledReviewTile className={`${className} ReviewTile`}>
      <StyledUserInfo>
        <StyledStarRating rating={rating} className="StarRating" />
        <StyledNameDate className="NameDate">
          <NameDate
            username={reviewerName}
            date={date}
            // TODO: Will have to update isVerified and isSeller
            // once we learn how to query for this data
            isVerified={false}
          />
        </StyledNameDate>
      </StyledUserInfo>
      <StyledSummary className="Summary">
        {' '}
        {summary}
        {' '}
      </StyledSummary>
      <StyledBody className="Body">
        {' '}
        {body}
        {' '}
      </StyledBody>
      {
        recommend
          ? <StyledRecommend className="Recommned"> ✓ I recommend this product </StyledRecommend>
          : ''
      }
      {
        hasResponse()
          ? <StyledResponse className="Response" response={response} />
          : ''
      }
      <Divider>
        <Helpful className="Helpful" helpfulness={helpfulness} />
        <Report className="Report" />
      </Divider>
      {/* <div>
        {photos}
      </div> */}
    </StyledReviewTile>
  );
}

ReviewTile.propTypes = {
  rating: PropTypes.number.isRequired,
  summary: PropTypes.string.isRequired,
  recommend: PropTypes.bool,
  response: PropTypes.string,
  body: PropTypes.string,
  date: PropTypes.string.isRequired,
  reviewerName: PropTypes.string.isRequired,
  helpfulness: PropTypes.number.isRequired,
  // photos: PropTypes.array.isRequired,
  className: PropTypes.string,
};

ReviewTile.defaultProps = {
  recommend: false,
  response: null,
  body: '',
  className: '',
};
