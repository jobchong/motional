import {
    FETCH_SIMULATIONS_REQUEST,
    FETCH_SIMULATIONS_SUCCESS,
    FETCH_SIMULATIONS_FAILURE,
} from './actions';

const initialState = {
    loading: false,
    data: [],
    error: null,
};

const simulationReducer = (state = initialState, action) => {
    switch (action.type) {
    case FETCH_SIMULATIONS_REQUEST:
	return { ...state, loading: true };
    case FETCH_SIMULATIONS_SUCCESS:
	return { ...state, loading: false, data: action.payload };
    case FETCH_SIMULATIONS_FAILURE:
	return { ...state, loading: false, error: action.payload };
    default:
	return state;
    }
};

export default simulationReducer;
