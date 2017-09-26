import {combineReducers} from 'redux'

function tenants (state=[], action){
    switch(action.type){
        case "FETCH_TENANTS_SUCCESS": {
            return action.value
        }
    }
    return state;
}

function fetchTenants(state={
    isFetching: false,
    error: {}
}, action){
    switch(action.type){
        case "FETCH_TENANTS_START": {
            return {...state, isFetching: true}
        }
        case "FETCH_TENANTS_SUCCESS": {
            return {...state, isFetching: false}
        }
        case "FETCH_TENANTS_FAILURE": {
            return {
                ...state, 
                isFetching: false,
                error: action.value
            }
        }
    }
    return state;
}
export default combineReducers({tenants, fetchTenants})