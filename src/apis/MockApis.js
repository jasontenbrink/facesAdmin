const tenants = [
    {
        name: "Nora",
        tenantId: 1
    },
    {
        name: "First Universalist",
        tenantId: 2
    }
];

const api = {
    getTenants(){
        return new Promise((resolve, reject) => {
            setTimeout(()=>{
                resolve({data:tenants} );
            }, 500)
        })
    },
    deleteTenant(){

    },
    addTenant(){

    },
    updateTenant(tenant){
        
    }
};

export default api;