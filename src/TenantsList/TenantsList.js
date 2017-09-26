import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

function mapStateToProps(state){
    return {
        tenants: state.tenants
    }
}
export default connect(mapStateToProps)
(function ({tenants}){
    console.log('tenants', tenants);
    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            {tenants.map(tenant => (
                <Link key={tenant.id} to={`/edit-tenant/${tenant.id}/${tenant.name}`}>{tenant.name}</Link> 
            ))}
            <br />
            <Link to="/add-tenant">Add Tenant</Link>
        </div>
)})