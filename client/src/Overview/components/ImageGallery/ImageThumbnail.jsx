import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledImg = styled.img`
background-color: #eee;
width: 80px;
height: 70px;
display: block;
border: 1px solid black;
margin: 10px 10px 10px 10px;
cursor: pointer;
border-radius: 5px;
box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
transition: 0.2s;
&:hover {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  transform: scale(1.05);
}
&.selected {
  border: ${(props) => props.theme.secondaryColor} 3px solid;
  box-shadow:${(props) => props.theme.secondaryColor} 0px 5px 15px;
}
`;

export default function ImageThumbnail(
  {
    imgUrl, url, classname, changeSelected, num,
  },
) {
  return (
    <StyledImg
      data-testid="ImageThumbnails"
      id={num}
      onClick={changeSelected}
      className={classname}
      src={imgUrl}
      url={url}
      alt="image of product"
    />
  );
}

ImageThumbnail.propTypes = {
  num: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  classname: PropTypes.string.isRequired,
  changeSelected: PropTypes.func.isRequired,
};
