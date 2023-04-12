import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FilterForm from './FilterForm';

describe('FilterForm', () => {
    test('renders input fields and submit button', () => {
	render(<FilterForm />);

	expect(screen.getByLabelText('Scenario ID:')).toBeInTheDocument();
	expect(screen.getByLabelText('Car Build:')).toBeInTheDocument();
	expect(screen.getByRole('button', { name: 'Filter' })).toBeInTheDocument();
    });

    test('calls the onFilter callback when the form is submitted', () => {
	const handleFilter = jest.fn();
	render(<FilterForm onFilter={handleFilter} />);

	fireEvent.change(screen.getByLabelText('Scenario ID:'), { target: { value: 'scenario1' } });
	fireEvent.change(screen.getByLabelText('Car Build:'), { target: { value: 'build1' } });
	fireEvent.click(screen.getByRole('button', { name: 'Filter' }));

	expect(handleFilter).toHaveBeenCalledTimes(1);
	expect(handleFilter).toHaveBeenCalledWith({ scenarioId: 'scenario1', carBuild: 'build1' });
    });

});
