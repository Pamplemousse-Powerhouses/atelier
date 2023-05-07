import styled from 'styled-components';

const Title = styled.h2`
  margin-inline: auto;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  width: 60%;
`;

const Card = styled.div`
  height: 300px;
  border: 1px solid black;
  border-radius: 5px;
  // margin-left: 1rem; having trouble matching this on related items list. this is the space to the left of the list.

  padding: 1rem;

  scroll-snap-align: start;
`;

const Carousel = styled.div`
  display: grid;
  gap: 1rem;
  grid-auto-flow: column;
  grid-auto-columns: 23%;

  overflow-x: auto;
  overscroll-behavior-inline: contain;

  scroll-snap-type: inline mandatory; // this might change when implementing right/left buttons
`;

export { Title, Card, Carousel };
