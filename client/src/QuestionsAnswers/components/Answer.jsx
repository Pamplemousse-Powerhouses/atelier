import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import Divider from '../../components/Divider';
import Helpful from '../../components/Helpful';
import Report from '../../components/Report';
import NameDate from '../../components/NameDate';
import PhotoList from './PhotoList';

import useWindowSize from '../../hooks/useWindowSize';

const StyledAnswer = styled.div`
  margin-left: 10px;
  padding: 5px 5px;

  & p {
    display: inline;
    font-size: 1.1rem;
  }
`;

export default function Answer({ answer }) {
  const [clickedYes, setClickedYes] = useState(false);
  const [clickedReport, setClickedReport] = useState(false);

  useEffect(() => {
    setClickedYes(localStorage.getItem(`atelier-answer-yes/${answer.id}`));
  }, [localStorage.getItem(`atelier-answer-yes/${answer.id}`)]);

  useEffect(() => {
    setClickedYes(localStorage.getItem(`atelier-answer-report/${answer.id}`));
  }, [localStorage.getItem(`atelier-answer-report/${answer.id}`)]);

  // Gets window size via custom hook
  const { width } = useWindowSize();

  const dispatch = useDispatch();

  const handleHelpful = () => {
    const temp = clickedYes;
    if (!clickedYes) {
      setClickedYes(true);
      localStorage.setItem(`atelier-answer-yes/${answer.id}`, true);
      axios.put(`/qa/answers/${answer.id}/helpful`)
        .then(() => {
          dispatch({ type: '@answers/MARK_HELPFUL', answer_id: answer.id });
          setClickedYes(true);
          localStorage.setItem(`atelier-answer-yes/${answer.id}`, true);
        })
        .catch(() => {
          setClickedYes(temp);
          localStorage.setItem(`atelier-answer-yes/${answer.id}`, true);
        });
    }
  };

  const handleReportAnswer = () => {
    const temp = clickedReport;
    if (!clickedReport) {
      setClickedReport(true);
      localStorage.setItem(`atelier-answer-report/${answer.id}`, true);
      axios.put(`/qa/answers/${answer.id}/report`)
        .then(() => {
          dispatch({ type: '@answers/REPORT', answer_id: answer.id });
          setClickedReport(true);
          localStorage.setItem(`atelier-answer-report/${answer.id}`, true);
        })
        .catch(() => {
          setClickedReport(temp);
          localStorage.setItem(`atelier-answer-report/${answer.id}`, temp);
        });
    }
  };

  /* * Effects * */
  useEffect(() => {
    setClickedYes(localStorage.getItem(`atelier-answer-yes/${answer.id}`) || clickedYes);
    setClickedReport(localStorage.getItem(`atelier-answer-report/${answer.id}`) || clickedReport);
  }, []);

  return (
    <StyledAnswer data-testid="answer">
      <p>{answer.body}</p>
      <PhotoList photos={answer.photos} />
      <div style={{ marginTop: '10px', color: '#666' }} data-testid="answer-bar">
        {
        width >= 1080
          ? (
            <Divider>
              <NameDate
                username={answer.answerer_name}
                date={answer.date}
                includeBy
              />
              <Helpful
                helpfulness={answer.helpfulness}
                clickedYes={clickedYes}
                onClick={handleHelpful}
              />
              <Report clickedReport={clickedReport} onClick={handleReportAnswer} />
            </Divider>
          )
          : (
            <>
              <NameDate
                username={answer.answerer_name}
                date={answer.date}
                includeBy
              />
              <br />
              <Divider>
                <Helpful
                  helpfulness={answer.helpfulness}
                  clickedYes={clickedYes}
                  onClick={handleHelpful}
                />
                <Report clickedReport={clickedReport} onClick={handleReportAnswer} />
              </Divider>
            </>
          )
        }
      </div>
    </StyledAnswer>
  );
}

Answer.propTypes = {
  answer: PropTypes.shape({
    answerer_name: PropTypes.string,
    body: PropTypes.string,
    date: PropTypes.string,
    helpfulness: PropTypes.number,
    photos: PhotoList.propTypes.photos,
    id: PropTypes.number,
  }).isRequired,
};
