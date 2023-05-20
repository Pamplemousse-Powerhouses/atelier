import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const StyledThumbnail = styled.div`
background-color: #eee;
width: 80px;
height: 80px;
display: flex;
justify-content: space-around;
align-items: center;
border: 1px solid black;
margin: 2.5px 2.5px 2.5px 2.5px;
cursor: pointer;
border-radius: 50px;
box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
transition: 0.2s;
background-color:${(props) => props.theme.background};
color:${(props) => props.theme.textColor};
&:hover {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  transform: scale(1.05);
}
&.true {
  border: ${(props) => props.theme.secondaryColor} 3px solid;
  box-shadow:${(props) => props.theme.secondaryColor} 0px 5px 15px;
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
  let list = useSelector((state) => {
    if (state.overview.productStyles.styles.results) {
      list = state.overview.productStyles.styles.results;
      return state.overview.productStyles.styles.results;
    }
    return [];
  });
  const changeDefault = (event) => {
    const checker = event.target.innerText;
    list.forEach((element, i) => {
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
  id: PropTypes.number,
  defaultNumberHandler: PropTypes.func.isRequired,
  name: PropTypes.string,
  className: PropTypes.string,
};

StyleThumbnail.defaultProps = {
  id: PropTypes.number,
  name: PropTypes.string,
  className: PropTypes.boolean,
};
