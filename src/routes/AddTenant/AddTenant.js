import React from 'react'
import {connect} from 'react-redux'

function mapStateToProps(state){
    return {

    };
}

export default connect(mapStateToProps)
(class AddTenant extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: ""
        };
    }
    render() {
        return (
            <div>
                <span>Name</span>
                <input type="text" 
                    name="tenant name"
                    onChange={e => this.setState({name: e.target.value})} 
                    value={this.state.name} />
                <br />
                <button
                    onClick={() => this.props.dispatch({
                        type: "ADD_TENANT",
                        value: this.state.name
                    })}
                >
                    Add Tenant
                </button>
            </div>
        )
    }
})