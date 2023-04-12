import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Stats from './Stats';

const mockStats = {
  exceedMaxStopsPercentage: 20,
  exceedMaxRunningTimePercentage: 10,
  collisionPercentage: 5,
  failPercentage: 25,
};

describe('Stats', () => {
  test('renders the stats correctly', () => {
    render(<Stats stats={mockStats} />);
  });
});
