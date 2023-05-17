import React from 'react';
// import styled from 'styled-components';
// import PropTypes from 'prop-types';

// const StyledImg = styled.img`
// `;

export default function Twitter() {
  return (
    <a
      data-testid="Twitter"
      className="twitter-share-button"
      href="https://twitter.com/intent/tweet?text=Hello%20world"
    >
      Tweet
    </a>
  );
}

// Thumbnail.propTypes = {
//   num: PropTypes.number.isRequired,
//   url: PropTypes.string.isRequired,
//   imgUrl: PropTypes.string.isRequired,
//   classname: PropTypes.string.isRequired,
//   changeSelected: PropTypes.func.isRequired,
// };
