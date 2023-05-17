import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
// import Thumbnail from '../../../components/Thumbnail';

// const StyledThumbnail = styled.img`
//   background-color: #eee;
//   /* display: inline-block;
//   margin: 10px 0 0 2%;
//   flex-grow: 1; */
//   /* height: 100px;
//   width: calc(100% * (1/4) - 10px - 1px); */
//   width: 80px;
//   height: 70px;
//   display: block;
//   border: 1px solid black;
//   margin: 10px 10px 10px 10px;
//   cursor: pointer;
//   border-radius: 5px;
//   box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
//   transition: 0.2s;
//   &:hover {
//     box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
//     transform: scale(1.05);
//   }
// `;
const StyledThumbnail = styled.div`
background-color: #eee;
/* display: inline-block;
margin: 10px 0 0 2%;
flex-grow: 1; */
/* height: 100px;
width: calc(100% * (1/4) - 10px - 1px); */
width: 90px;
height: 90px;
display: flex;
justify-content: space-around;
align-items: center;
border: 1px solid black;
margin: 5px 5px 5px 5px;
cursor: pointer;
border-radius: 50px;
box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
transition: 0.2s;
&:hover {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  transform: scale(1.05);
}
&.true {
  border: lime 3px solid;
  box-shadow: lime 0px 5px 15px;
}
.styleFont {
  font-family: sans-serif;
  font-size: 10px;
}
`;
export default function StyleThumbnail({
  id,
  defaultNumberHandler,
  className,
  name,
}) {
  // let list = [];
  let list = useSelector((state) => {
    if (state.overview.productStyles.styles.results) {
      list = state.overview.productStyles.styles.results;
      return state.overview.productStyles.styles.results;
    }
    return [];
  });
  // console.log('This is ID in stylethumbnail', id);
  // console.log('This is STYLETYPE in stylethumbnail', styletype);
  // const dispatch = useDispatch();
  const changeDefault = (event) => {
    const checker = event.target.innerText;
    list.forEach((element, i) => {
      // console.log('This is sub [i]: ', temp.styles.results[i]['default?']);
      if (element.name === checker) {
        list[i]['default?'] = true;
        defaultNumberHandler(list[i].style_id);
      }
      if (element.name !== checker) {
        list[i]['default?'] = false;
      }
    });
  };
  return (
    <StyledThumbnail
      onClick={changeDefault}
      key={id}
      id={id}
      data-testid="StyleThumbnails"
      className={className}
    >
      <p className="styleFont">{name}</p>
    </StyledThumbnail>
  );
}

StyleThumbnail.propTypes = {
  // styletype: PropTypes.node,
  id: PropTypes.number,
  defaultNumberHandler: PropTypes.func.isRequired,
  name: PropTypes.string,
  className: PropTypes.string,
};

StyleThumbnail.defaultProps = {
  // styletype: PropTypes.node,
  id: PropTypes.number,
  name: PropTypes.string,
  className: PropTypes.boolean,
};
