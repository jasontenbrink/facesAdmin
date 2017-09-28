import axios from 'axios';

const api = {
    getTenants(){
        return axios.get('/tenants');
    },
    deleteTenant(id){
        return axios.delete('/tenants', {params: {id}})
    },
    addTenant(name){
        return axios.post('/tenants', {name});
    },
    updateTenant(tenant){
        return axios.put('/tenants', {tenant})
    }
};

export default api;