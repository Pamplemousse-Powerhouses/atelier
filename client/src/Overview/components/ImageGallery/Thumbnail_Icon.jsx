import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// import Icons from '../../../components/Icons';
// import Thumbnail from '../../../components/Thumbnail';

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
/* opacity:1; */
&:hover {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  transform: scale(1.05);
}
&.selected {
  border: 10px solid;
  box-shadow: lime 0px 5px 15px;
  /* transform: scale(1.05); */
}
`;

export default function Thumbnail(
  {
    imgUrl, url, classname, changeSelected, num,
  },
) {
  return (
    <StyledImg
      data-testid="VerticalThumbnails"
      id={num}
      onClick={changeSelected}
      className={classname}
      src={imgUrl}
      url={url}
    />
  );
}

Thumbnail.propTypes = {
  num: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  classname: PropTypes.string.isRequired,
  changeSelected: PropTypes.func.isRequired,
};
