import React from 'react';

const SimulationTable = ({ simulations, onSort }) => {
    const handleSort = (column) => {
	onSort(column);
    };

    const renderRows = () => {
	return simulations.map((simulation) => (
	    <tr key={`${simulation.scenarioId}-${simulation.startTime}`}>
		<td>{simulation.scenarioId}</td>
		<td>{simulation.carBuild}</td>
		<td>{new Date(simulation.startTime * 1000).toLocaleString()}</td>
		<td>{simulation.runningTime / simulation.maxRunningTime}</td>
		<td>{simulation.result.numberOfStops / simulation.maxNumberOfStops}</td>
		<td>{simulation.result.hasCollision ? 'Yes' : 'No'}</td>
		<td>{simulation.doesScenarioPass ? 'Yes' : 'No'}</td>
	    </tr>
	));
    };

    return (
	<table>
	    <thead>
		<tr>
		    <th onClick={() => handleSort('scenarioId')}>Scenario ID</th>
		    <th onClick={() => handleSort('carBuild')}>Car Build</th>
		    <th onClick={() => handleSort('startTime')}>Start Time</th>
		    <th onClick={() => handleSort('runningTime')}>Running Time/Max Running Time</th>
		    <th onClick={() => handleSort('numberOfStops')}>Number of Stops/Max Number of Stops</th>
		    <th onClick={() => handleSort('hasCollision')}>Has Collision</th>
		    <th onClick={() => handleSort('doesScenarioPass')}>Does Scenario Pass</th>
		</tr>
	    </thead>
	    <tbody>{renderRows()}</tbody>
	</table>
    );
};

export default SimulationTable;
