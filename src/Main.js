import React from 'react'
import {Route, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import TenantsList from './TenantsList'
import AddTenant from './routes/AddTenant'
import EditTenant from './routes/EditTenant'
import api from './apis/MockApis'
import { withRouter } from 'react-router-dom'

const flexContainer = {
    display: "flex"
};

function mapStateToProps (state){
    return {

    }
}

export default withRouter(connect(mapStateToProps)
(class Main extends React.Component{
    constructor(props){
        super(props);
        this.handleFieldChange = this.handleFieldChange.bind(this);
    }

    componentDidMount(){
        this.props.dispatch({type:"FETCH_TENANTS"});
    }

    handleFieldChange(inputName, e){
        this.setState({[inputName]: e.target.value})
      }

    render() {
        return (
            <div style={flexContainer}>
                <div style={{ width: "30vw", border: "3px solid black" }}>
                    <TenantsList 
                        handleChange={this.handleFieldChange} />
                </div>
                <div style={{ width: "70vw", border: "3px solid green", display: "flex", justifyContent: "center" }}>
                    <Route exact={true} path="/" render={() => (
                        <h1>Faces Admin</h1>
                    )} />
                    <Route path="/add-tenant" component={AddTenant} />
                    <Route path="/edit-tenant/:tenantId/:tenantName" component={EditTenant} />
                </div>
            </div>

        )
    }
}));
