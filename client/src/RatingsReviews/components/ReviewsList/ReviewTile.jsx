import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import NameDate from '../../../components/NameDate';
import StarRating from '../../../components/StarRating';
import Divider from '../../../components/Divider';
import Report from '../../../components/Report';
import Helpful from '../../../components/Helpful';
import Response from './Response';
import Thumbnail from '../../../components/Thumbnail';
import Popup from '../../../components/Popup';
// import Icons from '../../../components/Icons';

import { putHelpfulReport } from '../../actions/index';

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

const StyledFlex = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-left: 1%;
`;

const StyledImg = styled.img`
  min-height: 40%;
  max-width: 100%;
  object-fit: contain;
`;

const StyledUserInfo = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 2%;
  @media (max-width: ${({ theme }) => theme.bpTablet}) {
    flex-direction: column;
  }
  @media (max-width: ${({ theme }) => theme.bpMobile}) {
    flex-direction: column;
  }
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
  @media (max-width: ${({ theme }) => theme.bpTablet}) {
    padding-top: 2%;
    margin: 0;
  }
  @media (max-width: ${({ theme }) => theme.bpMobile}) {
    padding-top: 2%;
    margin: 0;
  }
`;

const StyledSummary = styled.div`
  font-weight: bold;
  font-size: 150%;
  padding-bottom: 2%;
`;

const StyledBody = styled.div`
  overflow: hidden;
  overflow-wrap: break-word;
  padding-bottom: 2%;
`;

const StyledRecommend = styled.div`
  padding-bottom: 2%;

  &::before {
    content: "\uf00c";
    font-family: "Font Awesome 5 Free";
  }
`;

const StyledResponse = styled(Response)`
  margin-bottom: 2%;
  border: transparent;
`;

const StyledReviewTile = styled.div`
  padding-bottom: 3%;
  padding-top: 3%;
  border-bottom: solid ${(props) => props.theme.textColor} 2px;
`;

export default function ReviewTile({
  id,
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
  const hasPhotos = () => photos.length > 0;
  const [clickedYes, setClickedYes] = useState(false);
  const [helpfulnessCount, setHelpfulness] = useState(helpfulness);
  const [clickedReport, setClickedReport] = useState(false);

  const dispatch = useDispatch();

  const photoMap = photos.map((photo) => {
    const modalRef = useRef();
    const handleCloseModal = () => modalRef.current.closeModal();
    const handleOpenModal = () => modalRef.current.openModal();
    return (
      <StyledFlex>
        <Thumbnail
          src={photo.url}
          key={photo.id}
          onClick={handleOpenModal}
        />
        <Popup
          ref={modalRef}
          titles={[summary]}
        >
          <StyledImg
            src={photo.url}
            handleCloseModal={handleCloseModal}
          />
        </Popup>
      </StyledFlex>
    );
  });

  const handleClickYes = () => {
    if (!clickedYes) {
      setClickedYes(true);
      dispatch(putHelpfulReport(id, 'helpful'))
        .then(() => {
          setHelpfulness(helpfulnessCount + 1);
        })
        .catch(() => {
          setClickedYes(false);
        });
    }
  };

  const handleClickReport = () => {
    if (!clickedReport) {
      setClickedReport(true);
      dispatch(putHelpfulReport(id, 'report'))
        .then(() => {
          setHelpfulness(helpfulnessCount + 1);
        })
        .catch(() => {
          setClickedReport(false);
        });
    }
  };

  return (
    <StyledReviewTile key={id} className={`${className} ReviewTile`}>
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
        {summary}
      </StyledSummary>
      <StyledBody className="Body">
        {body}
      </StyledBody>
      {
        recommend
          ? (
            <StyledRecommend className="Recommend">
              {' I recommend this product'}
            </StyledRecommend>
          )
          : ''
      }
      {
        hasResponse()
          ? <StyledResponse className="Response" response={response} />
          : ''
      }
      {
        hasPhotos
          ? (
            <StyledFlex>
              { photoMap }
            </StyledFlex>
          )
          : ''
      }
      <Divider>
        <Helpful
          className="Helpful"
          helpfulness={helpfulnessCount}
          onClick={handleClickYes}
          clickedYes={clickedYes}
        />
        <Report
          className="Report"
          onClick={handleClickReport}
          clickedReport={clickedReport}
        />
      </Divider>
    </StyledReviewTile>
  );
}

ReviewTile.propTypes = {
  id: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  summary: PropTypes.string.isRequired,
  recommend: PropTypes.bool,
  response: PropTypes.string,
  body: PropTypes.string,
  date: PropTypes.string.isRequired,
  reviewerName: PropTypes.string.isRequired,
  helpfulness: PropTypes.number.isRequired,
  photos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    url: PropTypes.string,
  })),
  className: PropTypes.string,
};

ReviewTile.defaultProps = {
  recommend: false,
  response: null,
  body: '',
  className: '',
  photos: [],
};
