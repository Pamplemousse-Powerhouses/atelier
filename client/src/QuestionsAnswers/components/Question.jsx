import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';

import AnswersList from './AnswersList';
import Button from '../../components/ui/Button';
import Divider from '../../components/Divider';
import Helpful from '../../components/Helpful';
import Report from '../../components/Report';
import Popup from '../../components/Popup';
import AddAnswer from './AddAnswer';

import { LargeLetter } from '../styles';

/* * Styles * */
const StyledQuestion = styled.div`
  position: relative;

  .question {
    font-size: 1.4rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    &::before {
      content: "Q";
      ${LargeLetter}
    }
  }

  .substring {
    white-space: pre-wrap;
  }
  .mark {
    background-color: #ffffbf;
    box-shadow: 0 2px 2px #0005;
    border-radius: 5px;
  }

  .button {
    width: 300px;
    height: 100px;

    @media (max-height: 720px) {
      height: 300px;
      width: 100px;
    }
  }


  & .accordion-title {
    border-radius: 10px;
    background-color: ${(props) => props.theme.background};
    padding: 10px 40px 10px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    @media (max-width: ${({ theme }) => theme.bpTablet}) {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }

    background-color: #eee;
    border-bottom: 2px solid ${(props) => props.theme.secondaryColor};
    margin-top: 5px;
    position: relative;
    cursor: pointer;

    &:hover .question, &:focus .question {
      color: ${(props) => props.theme.secondaryColor};
    }
    &:focus-visible {
      outline: none;
      border: 3px solid ${(props) => props.theme.secondaryColor};
    }
    &.open:not(.empty-chevron)::after, &.closed:not(.empty-chevron)::after {
      content: '\uf077';
      position: absolute;
      top: 50%;
      right: 15px;
      font-family: "Font Awesome 5 Free";
      transition: 0.5s;
    }
    &.open::after {
      transform: translateY(-50%) scaleY(1);
    }
    &.closed::after {
      transform: translateY(-50%) scaleY(-1);
    }
    .question {
      padding: 0;
    }
    .bar {
      display: inline-block;
      min-width: 300px;
      margin-left: 12px;
    }
  }

  & .big-A {
    ${LargeLetter}
    top: 0;
    position: sticky;
  }
  & .accordion-body {
    transition: 0.5s ease-in-out;
    overflow: scroll;
  }
  & .open + .accordion-body {
    max-height: 50vh;
  }
  & .closed + .accordion-body {
    max-height: 0;
  }
`;

export default function Question({ question, searchText }) {
  /* * Selectors and states * */
  const productName = useSelector((state) => state.product.data.name);
  const productId = useSelector((state) => state.product.data.id);

  const [showAnswers, setShowAnswers] = useState(false);
  const answerCount = useRef(Object.entries(question.answers).length);
  const dispatch = useDispatch();

  const markStart = question.question_body.toLowerCase().indexOf(searchText.toLowerCase());
  const markEnd = markStart + searchText.length;

  const modalRef = useRef();

  // Handle `yes` and `report` click states
  const [clickedYes, setClickedYes] = useState(false);
  const [clickedReport, setClickedReport] = useState(false);

  /* * Handlers * */
  const handleCloseModal = () => modalRef.current.closeModal();

  const handleAccordionClick = () => {
    setShowAnswers(!showAnswers);
  };

  const handleHelpful = (e) => {
    e.stopPropagation();
    const temp = clickedYes;
    if (!clickedYes) {
      setClickedYes(true);
      localStorage.setItem(`atelier-question-yes/${question.question_id}`, true);
      axios.put(`/qa/questions/${question.question_id}/helpful`)
        .then(() => {
          dispatch({ type: '@questions/MARK_HELPFUL', question_id: question.question_id });
          setClickedYes(true);
          localStorage.setItem(`atelier-question-yes/${question.question_id}`, true);
        })
        .catch(() => {
          setClickedYes(temp);
          localStorage.setItem(`atelier-question-yes/${question.question_id}`, temp);
        });
    }
  };

  const handleAddAnswer = (e) => {
    e.stopPropagation();
    modalRef.current.openModal();
  };

  const handleReportQuestion = (e) => {
    e.stopPropagation();
    const temp = clickedReport;
    if (!clickedReport) {
      setClickedReport(true);
      localStorage.setItem(`atelier-question-report/${question.question_id}`, ture);
      axios.put(`/qa/questions/${question.question_id}/report`)
        .then(() => {
          dispatch({ type: '@questions/REPORT', question_id: question.question_id });
          setClickedReport(true);
          localStorage.setItem(`atelier-question-report/${question.question_id}`, true);
        })
        .catch(() => {
          setClickedReport(temp);
          localStorage.setItem(`atelier-question-report/${question.question_id}`, temp);
        });
    }
  };

  /* * Effects * */
  useEffect(() => {
    setClickedYes(localStorage.getItem(`atelier-question-yes/${question.question_id}`) || clickedYes);
    setClickedReport(localStorage.getItem(`atelier-question-report/${question.question_id}`) || clickedReport);
  }, []);

  /* * Structure * */
  return (
    <>
      <StyledQuestion>
        <div
          className={`accordion-title ${((showAnswers && answerCount.current !== 0) ? 'open' : 'closed')} ${answerCount.current === 0 ? 'empty-chevron' : ''}`}
          role="button"
          tabIndex="0"
          onClick={handleAccordionClick}
          onKeyPress={handleAccordionClick}
        >
          <span data-testid="question" className="question">
            {
              searchText.length >= 3 ? (
                <span>
                  <span className="substring">{question.question_body.substring(0, markStart)}</span>
                  <span className="substring mark">{question.question_body.substring(markStart, markEnd)}</span>
                  <span className="substring">{question.question_body.substring(markEnd)}</span>
                </span>
              ) : question.question_body
            }
          </span>
          <span className="bar">
            <Divider>
              <Helpful
                helpfulness={question.question_helpfulness || 0}
                onClick={handleHelpful}
                clickedYes={clickedYes}
              />
              <Button variant="small" onClick={handleAddAnswer}>Add Answer</Button>
              <Report clickedReport={clickedReport} onClick={handleReportQuestion} />
            </Divider>
          </span>
        </div>
        <div className="accordion-body">
          {answerCount.current !== 0
            ? (
              <>
                <span className="big-A">A</span>
                <AnswersList className="answers" questionId={question.question_id} />
              </>
            )
            : ''}
        </div>
      </StyledQuestion>
      <Popup ref={modalRef} titles={['Submit your Answer', `${productName}: ${question.question_body}`]}>
        <AddAnswer
          productId={productId}
          questionId={question.question_id}
          handleCloseModal={handleCloseModal}
        />
      </Popup>
    </>
  );
}

Question.propTypes = {
  question: PropTypes.shape({
    question_id: PropTypes.number,
    answers: PropTypes.objectOf(PropTypes.shape({
      id: PropTypes.number,
      body: PropTypes.string,
      date: PropTypes.string,
      answerer_name: PropTypes.string,
      helpfulness: PropTypes.number,
      photos: PropTypes.arrayOf(PropTypes.string),
    })),
    question_body: PropTypes.string,
    question_helpfulness: PropTypes.number,
  }).isRequired,
  searchText: PropTypes.string,
};

Question.defaultProps = {
  searchText: '',
};
