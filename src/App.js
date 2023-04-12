import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SimulationTable from './components/SimulationTable';
import FilterForm from './components/FilterForm';
import Stats from './components/Stats';
import { fetchSimulations } from './store/actions';
import styles from './index.css'

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
	dispatch(fetchSimulations());
    }, [dispatch]);

    const { loading, data, error } = useSelector((state) => state);

    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    const handleSort = (column) => {
	if (sortColumn === column) {
	    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
	} else {
	    setSortColumn(column);
	    setSortDirection('asc');
	}
    };

    const [filters, setFilters] = useState({ scenarioId: '', carBuild: '' });

    const handleFilter = (newFilters) => {
	setFilters(newFilters);
    };

    const filteredSimulations = data
	  .filter((simulation) => {
	      const scenarioIdFilter = filters.scenarioId
		    ? simulation.scenarioId === filters.scenarioId
		    : true;
	      const carBuildFilter = filters.carBuild
		    ? simulation.carBuild === filters.carBuild
		    : true;
	      return scenarioIdFilter && carBuildFilter;
	  })
	  .sort((a, b) => {
	      if (!sortColumn) return 0;

	      const valueA = a[sortColumn];
	      const valueB = b[sortColumn];

	      if (valueA < valueB) {
		  return sortDirection === 'asc' ? -1 : 1;
	      } else if (valueA > valueB) {
		  return sortDirection === 'asc' ? 1 : -1;
	      } else {
		  return 0;
	      }
	  });

    const calculateStats = (filteredSimulations) => {
	const totalRuns = filteredSimulations.length;
	if (totalRuns < 1) {
	    return {
		exceedMaxStopsPercentage: 0,
		exceedMaxRunningTimePercentage: 0,
		collisionPercentage: 0,
		failPercentage: 0
	    }
	}
	const exceedMaxStops = filteredSimulations.filter(
	    (simulation) => simulation.result.numberOfStops > simulation.maxNumberOfStops
	).length;
	const exceedMaxRunningTime = filteredSimulations.filter(
	    (simulation) => simulation.endTime - simulation.startTime > simulation.maxRunningTime
	).length;
	const collisions = filteredSimulations.filter(
	    (simulation) => simulation.result.hasCollision
	).length;
	const failedRuns = filteredSimulations.filter(
	    (simulation) => !simulation.doesScenarioPass
	).length;

	return {
	    exceedMaxStopsPercentage: (exceedMaxStops / totalRuns) * 100,
	    exceedMaxRunningTimePercentage: (exceedMaxRunningTime / totalRuns) * 100,
	    collisionPercentage: (collisions / totalRuns) * 100,
	    failPercentage: (failedRuns / totalRuns) * 100,
	};
    };

    return (
	<div className="App">
	    <h1>Simulation Log Viewer</h1>
	    {loading ? <p>Loading...</p> :
	     error ?  <p>Error: {error.message}</p> :
	     data ? (
		 <>
		     <FilterForm onFilter={handleFilter} />
		     <Stats stats={calculateStats(filteredSimulations)} />
		     <SimulationTable simulations={filteredSimulations} onSort={handleSort} />
		 </>
	     ) : ''}
	</div>
    );
};

export default App;
