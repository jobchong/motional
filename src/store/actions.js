import mockApi from '../api/mockApi';

export const FETCH_SIMULATIONS_REQUEST = 'FETCH_SIMULATIONS_REQUEST';
export const FETCH_SIMULATIONS_SUCCESS = 'FETCH_SIMULATIONS_SUCCESS';
export const FETCH_SIMULATIONS_FAILURE = 'FETCH_SIMULATIONS_FAILURE';

const fetchSimulationsRequest = () => ({
    type: FETCH_SIMULATIONS_REQUEST,
});

const fetchSimulationsSuccess = (data) => ({
    type: FETCH_SIMULATIONS_SUCCESS,
    payload: data,
});

const fetchSimulationsFailure = (error) => ({
    type: FETCH_SIMULATIONS_FAILURE,
    payload: error,
});

export const fetchSimulations = () => {
    return async (dispatch) => {
	dispatch(fetchSimulationsRequest());
	try {
	    const response = await mockApi.getSimulationData();
	    dispatch(fetchSimulationsSuccess(processData(response.data)));
	} catch (error) {
	    dispatch(fetchSimulationsFailure(error));
	}
    };
};

const processData = (data) => {
  const { simulationRuns, scenarios } = data;
  const scenarioMap = new Map(scenarios.map((scenario) => [scenario.scenarioId, scenario]));

  return simulationRuns.map((run) => {
    const { endTime, startTime, scenarioId, result } = run;
    const { maxNumberOfStops, maxRunningTime } = scenarioMap.get(scenarioId);
    const runningTime = endTime - startTime;

    const doesScenarioPass = !(
      result.numberOfStops > maxNumberOfStops ||
      runningTime > maxRunningTime ||
      result.hasCollision
    );

    return {
      ...run,
      runningTime,
      maxRunningTime,
      maxNumberOfStops,
      doesScenarioPass,
    };
  });
};
