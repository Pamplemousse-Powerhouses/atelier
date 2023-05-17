import React from 'react';
import styled from 'styled-components';
import Icons from '../../../components/Icons';

const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* border: solid 2px black; */
  /* margin:2px;
  padding:5px; */
`;
const StyledExpandButton = styled.div`
  width: 100%;
  height: 85%;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: flex-end;
  /* display: flex;
  flex-direction: column; */
  /* border: solid 2px black; */
  /* margin:2px;
  padding:5px; */
`;
const StyledLeftRightNavigation = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  /* flex-direction: column; */
  justify-content: space-between;
  /* border: solid 2px black; */
  /* margin:2px;
  padding:5px; */
`;

export default function ImageGallery() {
  return (
    <StyledDiv>
      <StyledExpandButton data-testid="ExpandButton">
        <Icons.Expand data-testid="ExpandIcon" />
      </StyledExpandButton>
      <StyledLeftRightNavigation>
        <Icons.ArrowLeft data-testid="LeftIcon" />
        <Icons.ArrowRight data-testid="RightIcon" />
      </StyledLeftRightNavigation>
    </StyledDiv>
  );
}
