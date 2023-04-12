import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import simulationReducer from './reducer';

const rootReducer = combineReducers({
    simulations: simulationReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
