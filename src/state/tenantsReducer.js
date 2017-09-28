import {combineReducers} from 'redux'

function tenants (state=[], action){
    switch(action.type){
        case "FETCH_TENANTS_SUCCESS": {
            return action.value
        }
        case "UPDATE_TENANT_SUCCESS":{
            return state.map(tenant => {
                if (tenant.id==action.value.id){
                    tenant.name = action.value.name;
                }
                return tenant;
            });
        }
        case "ADD_TENANT_SUCCESS": {
            return [...state, action.value];
        }
        case "DELETE_TENANT_SUCCESS": {
            return state.filter( tenant => tenant.id != action.value.id );
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

function updateTenantCall(state={
    isFetching: false,
    error: {}
}, action){
    switch(action.type){
        case "UPDATE_TENANT_START": {
            return {...state, isFetching: true}
        }
        case "UPDATE_TENANT_SUCCESS": {
            return {...state, isFetching: false}
        }
        case "UPDATE_TENANT_FAILURE": {
            return {
                ...state, 
                isFetching: false,
                error: action.value
            }
        }
    }
    return state;
}

function addTenantCall(state={
    isFetching: false,
    error: {}
}, action){
    switch(action.type){
        case "ADD_TENANT_START": {
            return {...state, isFetching: true}
        }
        case "ADD_TENANT_SUCCESS": {
            return {...state, isFetching: false}
        }
        case "ADD_TENANT_FAILURE": {
            return {
                ...state, 
                isFetching: false,
                error: action.value
            }
        }
    }
    return state;
}

export default combineReducers({
    tenants, 
    fetchTenants, 
    updateTenantCall,
    addTenantCall
});