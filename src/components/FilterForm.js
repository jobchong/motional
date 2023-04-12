import React, { useState } from 'react';

const FilterForm = ({ onFilter }) => {
    const [scenarioId, setScenarioId] = useState('');
    const [carBuild, setCarBuild] = useState('');

    const handleSubmit = (e) => {
	e.preventDefault();
	onFilter({ scenarioId, carBuild });
    };

    return (
	<form onSubmit={handleSubmit}>
	    <label style={{ margin: "0px 4px"}} htmlFor="scenarioId">Scenario ID:</label>
	    <input
		type="text"
		id="scenarioId"
		value={scenarioId}
		onChange={(e) => setScenarioId(e.target.value)}
	    />
	    <label style={{ margin: "0px 4px"}} htmlFor="carBuild">Car Build:</label>
	    <input
		type="text"
		id="carBuild"
		value={carBuild}
		onChange={(e) => setCarBuild(e.target.value)}
	    />
	    <button style={{ margin: "0px 4px" }} type="submit">Filter</button>
	</form>
    );
};

export default FilterForm;
