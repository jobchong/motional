const simulationData = {
    simulationRuns: [
	{
	    startTime: 1620032400,
	    endTime: 1620036000,
	    scenarioId: 'scenario-1',
	    carBuild: 'build-1',
	    result: {
		numberOfStops: 2,
		hasCollision: false,
	    },
	},
	{
	    startTime: 1620032401,
	    endTime: 1620036001,
	    scenarioId: 'scenario-2',
	    carBuild: 'build-2',
	    result: {
		numberOfStops: 3,
		hasCollision: true,
	    },
	},
    ],
    scenarios: [
	{
	    scenarioId: 'scenario-1',
	    maxNumberOfStops: 5,
	    maxRunningTime: 3600,
	},
	{
	    scenarioId: 'scenario-2',
	    maxNumberOfStops: 1,
	    maxRunningTime: 3600,
	},
    ],
};

const getSimulationData = () => {
    return new Promise((resolve) => {
	setTimeout(() => {
	    resolve({ data: simulationData });
	}, 1000);
    });
};

const mockApi = {
    getSimulationData,
};

export default mockApi;
