/* eslint-env jest */

import reviews from './reviews.test';
import metadata from './metadata.test';

describe('Ratings Review Test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  reviews();
  metadata();
});
