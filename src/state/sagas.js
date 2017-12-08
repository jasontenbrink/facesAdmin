import {put, all, takeEvery} from 'redux-saga/effects'
import api from '../apis/RealApis'

function* fetchTenants(){
    yield put({type: "FETCH_TENANTS_START"});
    try {
        const {data} = yield api.getTenants();
        const newData = data.map(tenant => {
            return {
                name: tenant.tenant_name,
                id: tenant.tenant_id
            }
        })
        yield put({type: "FETCH_TENANTS_SUCCESS", value: newData});
    }
    catch(err){
        yield put({type: "FETCH_TENANTS_FAILURE", err})
    }
}

function* watchFetchTenants(){
    yield takeEvery('FETCH_TENANTS', fetchTenants);
}

function* updateTenant(action){
    yield put({type: "UPDATE_TENANT_START"});
    try {
        const {data} = yield api.updateTenant(action.value);
        const newData = {
            name: data[0].tenant_name,
            id: data[0].tenant_id
        };
        yield put({type: "UPDATE_TENANT_SUCCESS", value: newData});
    }
    catch(err){
        yield put({type: "UPDATE_TENANT_FAILURE", err});
    }
}
function* watchUpdateTenant(){
    yield takeEvery('UPDATE_TENANT', updateTenant);
}


function* addTenant(action){
    yield put({type: "ADD_TENANT_START"});
    try {
        const {data} = yield api.addTenant(action.value);
        const tenant = {
            name: data.tenant_name,
            id: data.tenant_id
        };
        yield put({type: "ADD_TENANT_SUCCESS", value: tenant});
    }
    catch(err){
        yield put({type: "ADD_TENANT_FAILURE", err});
    }
}
function* watchAddTenant(){
    yield takeEvery('ADD_TENANT', addTenant);
}

function* deleteTenant(action){
    yield put({type: "DELETE_TENANT_START"});
    try {
        const {data} = yield api.deleteTenant(action.value);
        const newData = {
            name: data[0].tenant_name,
            id: data[0].tenant_id
        };
        yield put({type: "DELETE_TENANT_SUCCESS", value: newData});
    }
    catch(err){
        yield put({type: "DELETE_TENANT_FAILURE", err});
    }
}
function* watchDeleteTenant(){
    yield takeEvery('DELETE_TENANT', deleteTenant);
}

export function* rootSaga(){
    yield all([
        watchFetchTenants(),
        watchUpdateTenant(), 
        watchAddTenant(),
        watchDeleteTenant()
    ]);
}

