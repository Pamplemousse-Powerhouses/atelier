import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';

import Overview from './Overview';
import QuestionsAnswers from './QuestionsAnswers';
import RelatedItemsComparisons from './RelatedItemsComparison';
import RatingsReviews from './RatingsReviews';
import Icons from './components/Icons';
import Button from './components/ui/Button';

import { GlobalStyle, Theme } from './globalStyles';

const StyledBody = styled.div`
  background-color: ${({ theme }) => theme.primaryColor};
  color: ${({ theme }) => theme.textColor};
`;

const StyledHeader = styled.header`
  h1 {
    display: inline;
    margin: 0 2rem;
  }
  position: sticky;
  top: 0;
  z-index: 200;
  width: 100%;
  background-color: ${({ theme }) => theme.header};
  color: ${({ theme }) => theme.textColor};
  display: flex;
  justify-content: left;
  align-items: center;
  box-shadow: 0 2px 10px black;
`;

const Main = styled.main`
  margin-top: 2rem;
`;

export default function App() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.darkMode);

  useEffect(() => {
    dispatch({ type: '@product/FETCH_DATA' });
    axios.get('/products/40347')
      .then((result) => {
        dispatch({ type: '@product/SET_DATA', payload: result.data });
      })
      .catch((error) => {
        dispatch({ type: '@product/FETCH_FAILED', payload: error.message });
      });
  }, [dispatch]);

  const handleToggle = () => {
    dispatch({ type: '@darkmode/TOGGLE' });
  };

  return (
    <Theme isDarkMode={isDarkMode}>
      <StyledBody>
        <StyledHeader>
          <h1>Atelier</h1>
          {
            isDarkMode ? (
              <Button variant="large-dark" onClick={handleToggle}>
                Dark Mode
                <Icons.Sun style={{ marginLeft: '15' }} size="lg" />
              </Button>
            )
              : (
                <Button variant="large-light" onClick={handleToggle}>
                  Light Mode
                  <Icons.EmptySun style={{ marginLeft: '15' }} size="xl" />
                </Button>
              )
          }
        </StyledHeader>
        <Main>
          <GlobalStyle />
          <Overview />
          <RelatedItemsComparisons />
          <QuestionsAnswers />
          <RatingsReviews />
        </Main>
      </StyledBody>
    </Theme>
  );
}
