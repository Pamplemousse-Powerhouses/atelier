import styled from 'styled-components';

// GLOBAL STYLES FOR RELATED ITEMS WIDGET ** //
const List = styled.div`
 display: grid;
 grid-template-columns: 25% 25% 25% 25%;
 margin: 0 auto;
 list-style-type: none;
 overflow-x: hidden;
`;

const Container = styled.div`
  grid-area: 2 / 1 / span 1 / span 4;
  align-self: center;
  height: 100%;
  overflow-x: hidden;
`;

const OutfitContainer = styled(Container)`
  grid-area: 2 / 2 / span 1 / span 4;
  margin: 0;
  display: inline-block;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-family: 'Inter';
  margin: 1rem;
  min-width: 200px;
  margin-inline: auto;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  color: ${(props) => props.theme.textColor};
`;

const Carousel = styled.div`
  --slider-index: 0;
  display: grid;
  gap: 1.2%;
  grid-auto-flow: column;
  grid-auto-columns: 24%;
  list-style-type: none;
  transform: translateX(calc(var(--slider-index) * 25%));
  transition: transform 250ms ease-in-out 0s;
  padding-left: 1.5rem;
  min-height: 400px;

  @media (max-width: ${(props) => props.theme.bpTablet}) {
    grid-auto-columns: 32.3%;
    gap: 1.1%;
    transform: translateX(calc(var(--slider-index) * (33.3%)));
  }
`;

const OutfitCarousel = styled(Carousel)`
  grid-auto-columns: 32.3%;
  gap: 1.2%;
  transform: translateX(calc(var(--slider-index) * (33.3%)));
  border-left: 1rem;

  @media (max-width: ${(props) => props.theme.bpTablet}) {
    grid-auto-columns: 49%;
    gap: 1%;
    transform: translateX(calc(var(--slider-index) * (50%)));
  }
`;

const DefaultCard = styled.li`
  position: relative;
  align-self: center;
  min-height: 350px;
  width: 95%;
  background-color: ${(props) => props.theme.background};
  border-radius: 3px;
  justify-content: space-between;

  padding: 1rem 0.5rem;
  z-index: 9;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  transition: 0.2s;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    transform: scale(1.05);
  }
`;

const AddCard = styled(DefaultCard)`
  grid-area: 2 / 1 / span 1 / span 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 90%;
  margin-left: 1.5rem;
`;

const Card = styled(DefaultCard)`
  border: none;
  display: flex;
  flex-direction: column;
`;

const ChevronButton = styled.button`
  align-self: center;
  height: 60%;
  width: 20%;
  color: white;
  -webkit-text-stroke: 5px black;
  font-size: 1.5em;
  z-index: 10;
  background-color: transparent;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  .chevron {
    font-weight: 900;
  }
  &:hover {
    transform: scale(1.1);
    background-color: rgba(0, 128, 128, 0.8);
    transition: background-color 500ms, transform 500ms ease-in-out;
  }
`;

const StyledRightButton = styled(ChevronButton)`
  grid-area: 2 / 4 / span 1 / span 1;
  justify-self: end;
  padding-right: 0.7rem;
`;

const StyledLeftButton = styled(ChevronButton)`
  grid-area: 2 / 1 / span 1 / span 1;
  padding-left: 0.7rem;
`;

const StyledLeftOutfitButton = styled(StyledLeftButton)`
    grid-area: 2 / 2 / span 1 / span 1;
`;

export {
  Title,
  DefaultCard,
  Card,
  AddCard,
  Carousel,
  OutfitCarousel,
  Container,
  OutfitContainer,
  List,
  StyledRightButton,
  StyledLeftButton,
  StyledLeftOutfitButton,
};
