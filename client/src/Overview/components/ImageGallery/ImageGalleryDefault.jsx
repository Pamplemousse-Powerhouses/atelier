import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ButtonNav from './ButtonNav';
import ThumbnailList from './ThumbnailList';
import Icons from '../../../components/Icons';

const StyledDiv = styled.div`
  /* width: 60%; */
  width:calc((100% - 450px));
  height: 98%;
  display: flex;
  flex-direction: column;
  cursor: {Icons.MagnifyPlus};
  background: url(${(props) => props.bg});
  background-position: center top;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  /* background-repeat: no-repeat; */
  /* background-size: contain;
  /* border: solid 2px black; */
  /* margin:2px;
  padding:5px; */
  :hover{
    cursor: ${(props) => props.pointer};
  }
`;
const StyledImageTop = styled.div`
  width: 100%;
  height: 60%;
  /* border: solid 2px black; */
  display: flex;
`;
const StyledthumbnailContainer = styled.div`
  width: 20%;
  height: 100%;
  /* border: solid 2px black; */
`;
// const Spacer = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   justify-content: flex-end;
//   /* border: solid 2px black; */
// `;
const StyledButtonContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 5px;
  /* border: solid 2px black; */
`;
const data = ['one', 'two', 'three', 'four'];

export default function ImageGalleryDefault({
  onClickHandler,
  bg,
  bgHandler,
  defaultNumber,
}) {
  // console.log('This is bg', bg);
  return (
    <StyledDiv
      className="checker"
      bg={bg}
      pointer={Icons.MagnifyPlus}
    >
      <StyledImageTop className="top">
        <StyledthumbnailContainer>
          <ThumbnailList
            defaultNumber={defaultNumber}
            bgHandler={bgHandler}
            products={data}
          />
        </StyledthumbnailContainer>
        <StyledButtonContainer onClick={() => onClickHandler()}>
          <ButtonNav />
        </StyledButtonContainer>
      </StyledImageTop>
      {/* <Spacer className="spacer" /> */}
    </StyledDiv>
  );
}
// StyledButtonContainer.propTypes = {
//   onClickHandler: PropTypes.func.isRequired,
// };
// StyledImageBottom.propTypes = {
//   onClickHandler: PropTypes.func.isRequired,
// };
ImageGalleryDefault.propTypes = {
  onClickHandler: PropTypes.func,
  bg: PropTypes.string.isRequired,
  defaultNumber: PropTypes.number.isRequired,
  // bg.url: PropTypes.objectOf(PropTypes.string),
  bgHandler: PropTypes.func.isRequired,
};
ImageGalleryDefault.defaultProps = {
  // bg: PropTypes.objectOf(PropTypes.string),
  onClickHandler: () => {},
};
