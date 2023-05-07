import React from 'react';
import AddItemToOutfit from './AddItemToOutfit';
import ProductCard from '../ProductCard/ProductCard';
import { Title, Carousel } from '../../styles';

export default function YourOutfit() {
  return (
    <div>
      <Title>Your Outfit</Title>
      <Carousel>
        <AddItemToOutfit />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </Carousel>
    </div>
  );
}
