import React from 'react';
import styled from 'styled-components';
import Icons from '../../../components/Icons';

const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const StyledExpandButton = styled.div`
  width: 100%;
  height: 85%;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

export default function ImageGallery() {
  return (
    <StyledDiv>
      <StyledExpandButton data-testid="ExpandButton">
        <Icons.Expand data-testid="ExpandIcon" />
      </StyledExpandButton>
    </StyledDiv>
  );
}
