import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SimulationTable from './SimulationTable';

const mockSimulations = [
];

describe('SimulationTable', () => {
  test('renders the table headers correctly', () => {
    render(<SimulationTable simulations={mockSimulations} />);

    expect(screen.getByText('Scenario ID')).toBeInTheDocument();
    expect(screen.getByText('Car Build')).toBeInTheDocument();
    expect(screen.getByText('Start Time')).toBeInTheDocument();
    expect(screen.getByText('Running Time/Max Running Time')).toBeInTheDocument();
    expect(screen.getByText('Number of Stops/Max Number of Stops')).toBeInTheDocument();
    expect(screen.getByText('Has Collision')).toBeInTheDocument();
    expect(screen.getByText('Does Scenario Pass')).toBeInTheDocument();
  });

});
