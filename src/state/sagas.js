import {put, all, takeEvery} from 'redux-saga/effects'
import api from '../apis/RealApis'

function* helloSaga() {
    console.log('Hello Sagas!')
}

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

export function* rootSaga(){
    yield all([helloSaga(), watchFetchTenants()]);
}

