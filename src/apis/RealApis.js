import axios from 'axios';

const api = {
    getTenants(){
        return axios.get('/tenants');
    },
    deleteTenant(){

    },
    addTenant(){

    },
    editTenant(){

    }
};

export default api;