import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { Title, Carousel } from '../../styles';

export default function RelatedItems() {
  return (
    <div>
      <Title>Related Items</Title>
      <Carousel>
        <ProductCard />
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
