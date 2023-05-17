import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  margin-left: 10px;
`;
export default function Facebook() {
  return (
    <StyledDiv data-testid="Facebook">
      <div
        className="fb-share-button"
        data-href="https://developers.facebook.com/docs/plugins/"
        data-layout="button_count"
        data-size="small"
      >
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse"
          className="fb-xfbml-parse-ignore"
        >
          Share
        </a>
      </div>
    </StyledDiv>
  );
}
