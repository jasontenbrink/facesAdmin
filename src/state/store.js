import 'regenerator-runtime/runtime'
import { applyMiddleware, createStore, compose, combineReducers } from "redux"
import {createLogger} from "redux-logger"
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './sagas'
import reducers from './tenantsReducer'


const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(createLogger(), sagaMiddleware);


// const reducer = combineReducers({tenants});

const enhancers = compose(
  middleware
);

const store = createStore(reducers, enhancers);
sagaMiddleware.run(rootSaga);

export default store;