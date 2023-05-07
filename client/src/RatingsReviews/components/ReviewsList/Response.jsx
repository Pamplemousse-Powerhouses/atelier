import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledResponseHeader = styled.div`
  font-weight: bold;
  padding-bottom: 2%;
`;

const StyledResponseTile = styled.div`
  background-color: #eee;
  padding: 2%;
`;

export default function Response({ response, className }) {
  return (
    <StyledResponseTile className={className}>
      <StyledResponseHeader>
        Response
      </StyledResponseHeader>
      {response}
    </StyledResponseTile>
  );
}

Response.propTypes = {
  response: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Response.defaultProps = {
  className: '',
};
