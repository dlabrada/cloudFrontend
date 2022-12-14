import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
 
import usuariosReducer from './usersDucks'
import organizationReducer from './organizationDucks'
import trafficligthReducer from './trafficligthDucks'
import logReducer from './logDucks'
import mapReducer from './mapDucks'
import authReducer from './authDucks'
 
const rootReducer = combineReducers({
    log:logReducer,
    map:mapReducer,
    user: usuariosReducer,
    trafficligth:trafficligthReducer,
    organization:organizationReducer,
    auth:authReducer
})


export default function generateStore() {
    const store = createStore( rootReducer, composeWithDevTools( applyMiddleware(thunk) ) )
    return store
}