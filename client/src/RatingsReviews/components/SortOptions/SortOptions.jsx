import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReviews } from '../../actions/index';

const StyledInline = styled.div`
  font-size: 150%;
  display: inline;
  @media (max-width: ${({ theme }) => theme.bpTablet}) {
    font-size: 120%;
  }
`;

const StyledDropdown = styled(StyledInline)`
  position: relative;
  display: inline-block;
`;

const StyledParent = styled.div`
  white-space: nowrap;
  object-fit: scale-down;
`;

const StyledDropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: ${(props) => props.theme.background};
  font-size: 100%;
  min-width: 10%;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 0.5em;
  z-index: 1;

  ${StyledDropdown}:hover & {
    display: block;
  }
`;

const StyledOptions = styled.div`
  margin: 0.5em;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const StyledCurrentOptions = styled.div`
  text-decoration: underline;
  cursor: pointer;
  &::after {
    font-family: "Font Awesome 5 Free";
    content: '\uf078';
  }
`;

export default function SortOptions({ ...props }) {
  const ReviewsNum = useSelector((state) => state.ratingsReviews.reviews.results.length);
  const productId = useSelector((state) => state.product.data.id);
  const currentOption = useSelector((state) => state.ratingsReviews.sortOption);

  const dispatch = useDispatch();

  const sortOptions = ['Relevance', 'Helpful', 'Newest'];

  const parsedOption = (display, option) => {
    if (!display) {
      if (option === 'Relevance') {
        return 'relevant';
      }
      return option.toLowerCase();
    }

    if (option === 'relevant') {
      return 'Relevance';
    }
    return `${option[0].toUpperCase()}${option.slice(1)}`;
  };

  const handleCurrentOptionClick = (option) => {
    dispatch(fetchReviews(productId, parsedOption(false, option), undefined, 100000))
      .then(() => {
        dispatch({ type: '@reviews/SET_SORT_OPTION', payload: parsedOption(false, option) });
      });
  };

  const allowedOptions = sortOptions.map((option) => {
    if (option !== parsedOption(true, currentOption)) {
      return (
        <StyledOptions onClick={() => { handleCurrentOptionClick(option); }}>
          {option}
        </StyledOptions>
      );
    }
    return undefined;
  });

  return (
    <StyledParent {...props}>
      <StyledInline>
        {`${ReviewsNum} reviews, sorted by `}
      </StyledInline>
      <StyledDropdown>
        <StyledCurrentOptions>
          { parsedOption(true, currentOption) }
        </StyledCurrentOptions>
        <StyledDropdownContent>
          {allowedOptions}
        </StyledDropdownContent>
      </StyledDropdown>
    </StyledParent>
  );
}
