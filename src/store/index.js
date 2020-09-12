import {createStore, applyMiddleware, compose} from 'redux'
import reducer from './reducer'
import ReduxThunk from 'redux-thunk'

//  redux-dev-tools和redux-thunk兼容
const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
const enhancer = composeEnhancers(
    applyMiddleware(ReduxThunk)
);

const store = createStore(reducer, enhancer);
export default store;
