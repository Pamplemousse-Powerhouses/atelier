import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import _ from 'underscore';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import StarRating from '../../../components/StarRating';
import Icons from '../../../components/Icons';

// ** STYLES ** //
const StyledModal = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => props.theme.backdropColor};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
`;

const StyledContent = styled.div`
  position: relative;
  display: grid;
  padding: 0rem 1rem 1rem 1rem;
  border-radius: 3px;
  background-color: ${(props) => props.theme.primaryColor};
  grid-template-rows: 10% 10% 80%;
  grid-template-columns: 20% 20% 20% 20% 20%;
  min-height: 400px;
  width: 600px;
  overflow-y: auto;
  z-index: 20;
  color: ${(props) => props.theme.textColor};
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`;

const StyledTitle = styled.div`
  grid-area: 1 / 0 / span 1 / span 1;
  margin-top: 1rem;
  font-style: italic;
`;

const StyledCurrent = styled.div`
  grid-area: 2 / 1 / span 1 / span 2;
  justify-self: center;
  text-align: center;
  vertical-align: middle;
  font-weight: bold;
  position: sticky;
  margin-top: 1rem;
`;

const StyledCompare = styled.div`
  grid-area: 3 / 3 / span 1 / span 1;
  justify-self: center;
  text-align: center;
  padding-bottom: 1.5rem;
`;

const StyledRelated = styled.div`
  grid-area: 2 / 4 / span 1 / span 2;
  justify-self: center;
  text-align: center;
  font-weight: bold;
  position: sticky;
  margin-top: 1rem;
`;

const StyledCharacteristic = styled.div`
  margin-top: 1rem;
`;

const StyledCurrentAttributes = styled.div`
  grid-area: 3 / 1 / span 1 / span 2;
  justify-self: center;
  text-align: center;
`;

const StyledCompareAttributes = styled.div`
  grid-area: 3 / 4 / span 1 / span 2;
  justify-self: center;
  text-align: center;
`;

const StyledWrap = styled.div`
  margin-top: 1rem;
`;

const StyledXButton = styled.button`
  grid-area: 1 / 5 / span 1 / span 1;
  color: ${(props) => props.theme.textColor};
  justify-self: end;
  text-align: end;
  position: fixed;
  cursor: pointer;
  border: none;
  background: none;
  margin-top: 1rem;
  transition: transform 250ms ease-in-out;
  &:hover {
    transform: scale(1.5)
  }
`;

// ** COMPONENT ** //
export default function ComparisonModal({
  modalOnClose,
  characteristics,
  compare,
  compareName,
  currentFeatures,
  compareFeatures,
}) {
  // ** LOCAL STATE ** //
  const [allCharacteristics, setAllCharacteristics] = useState([]);
  const [currentAttributes, setCurrentAttributes] = useState([]);
  const [compareAttributes, setCompareAttributes] = useState([]);
  const [allFeatures, setAllFeatures] = useState([]);
  const [currentFeaturesArray, setCurrentFeaturesArray] = useState([]);
  const [compareFeaturesArray, setCompareFeaturesArray] = useState([]);

  // ** GET STATE FROM REDUX STORE ** //
  const currentProduct = useSelector((state) => state.product.data.name);

  // ** ON RENDER ** //
  useEffect(() => {
    const all = _.uniq(Object.keys(characteristics).concat(Object.keys(compare)));
    const charObj = {};
    const compObj = {};
    all.forEach((characteristic) => {
      if (!characteristics[characteristic]) {
        charObj[characteristic] = 'x';
      } else {
        charObj[characteristic] = characteristics[characteristic];
      }
      if (!compare[characteristic]) {
        compObj[characteristic] = 'x';
      } else {
        compObj[characteristic] = compare[characteristic];
      }
    });

    setAllCharacteristics(all);
    setCurrentAttributes(Object.values(charObj));
    setCompareAttributes(Object.values(compObj));

    const features = _.uniq(currentFeatures.map((feature) => (feature.feature))
      .concat(compareFeatures.map((feat) => (feat.feature))));

    setAllFeatures(features);

    features.forEach((feature, i) => {
      if (feature === 'Lifetime Guarantee') {
        features.splice(i, 1, 'Guarantee');
      }
      if (feature === 'Satisfaction Guaranteed') {
        features.splice(i, 1);
      }
    });

    const currFeatures = {};
    const compFeatures = {};

    currentFeatures.forEach((feature) => {
      currFeatures[feature.feature] = feature.value;
    });

    compareFeatures.forEach((feature) => {
      compFeatures[feature.feature] = feature.value;
    });

    features.forEach((feature) => {
      if (!currFeatures[feature]) {
        currFeatures[feature] = 'x';
      }
      if ((feature === 'Non-GMO' || feature === 'button') && currFeatures[feature]) {
        currFeatures[feature] = 'check';
      }
      if (!compFeatures[feature]) {
        compFeatures[feature] = 'x';
      }
      if ((feature === 'Non-GMO' || feature === 'button') && compFeatures[feature]) {
        compFeatures[feature] = 'check';
      }
    });

    setCurrentFeaturesArray(Object.values(currFeatures));
    setCompareFeaturesArray(Object.values(compFeatures));
  }, []);

  // ** STRUCTURE **//
  return (
    <StyledModal onClick={() => modalOnClose()}>
      <StyledContent onClick={(e) => e.stopPropagation()}>
        <StyledTitle>Comparing</StyledTitle>
        <StyledCurrent>{currentProduct}</StyledCurrent>
        <StyledRelated>{compareName}</StyledRelated>
        <StyledCompare>
          {allCharacteristics.map((characteristic) => (
            <StyledCharacteristic key={characteristic}>{characteristic}</StyledCharacteristic>
          ))}
          {allFeatures.map((feature) => (
            <StyledCharacteristic key={feature}>{feature}</StyledCharacteristic>
          ))}
        </StyledCompare>
        <StyledCurrentAttributes>
          {currentAttributes.map((attribute) => (
            <StyledWrap>
              {
                attribute === 'x' ? <br /> : <StarRating key={attribute.id} rating={attribute.value} />
              }
            </StyledWrap>
          ))}
          {currentFeaturesArray.map((feat) => {
            if (feat === 'x') {
              return <br />;
            }
            if (feat === 'check') {
              return (
                <StyledWrap>
                  <Icons.Check />
                </StyledWrap>
              );
            }
            return <StyledWrap key={feat}>{feat}</StyledWrap>;
          })}
        </StyledCurrentAttributes>
        <StyledCompareAttributes>
          {compareAttributes.map((attribute) => (
            <StyledWrap>
              {
                 attribute === 'x' ? <br /> : <StarRating key={attribute.id} rating={attribute.value} />
              }
            </StyledWrap>
          ))}
          {compareFeaturesArray.map((feat) => {
            if (feat === 'x') {
              return <br />;
            }
            if (feat === 'check') {
              return (
                <StyledWrap>
                  <Icons.Check />
                </StyledWrap>
              );
            }
            return <StyledWrap key={feat}>{feat}</StyledWrap>;
          })}
        </StyledCompareAttributes>
        <StyledXButton onClick={() => modalOnClose()} onKeyPress={() => modalOnClose()} tabIndex="0" aria-label="close">
          <Icons.X aria-hidden="true" />
        </StyledXButton>
      </StyledContent>
    </StyledModal>
  );
}

// ** PROPTYPES ** //
ComparisonModal.propTypes = {
  modalOnClose: PropTypes.func.isRequired,
  characteristics: PropTypes.shape({
    characteristic: PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
    }),
  }),
  compare: PropTypes.shape({
    characteristic: PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
    }),
  }),
  compareName: PropTypes.string.isRequired,
  currentFeatures: PropTypes.arrayOf(
    PropTypes.shape({
      feature: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  compareFeatures: PropTypes.arrayOf(
    PropTypes.shape({
      feature: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
};

ComparisonModal.defaultProps = {
  characteristics: {},
  compare: {},
  currentFeatures: [],
  compareFeatures: [],
};
