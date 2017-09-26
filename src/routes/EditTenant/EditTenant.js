import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import TextField from 'material-ui/TextField'

function mapStateToProps (state){
    
}

export default class EditTenant extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            //state
        };
    }
    render(){
        console.log('this.props', this.props)
        return (
            <div>
                <TextField 
                    name="name"
                    value={this.props.match.params.tenantName}
                    onChange={(e) => handleChange()}/>
               {this.props.match.params.tenantId} {this.props.match.params.tenantName}<br/>
               <button onClick={()=> {
                   
                   }}>Edit Tenant</button>
               <button>remove tenant</button>
            </div>
            
        )
    }
}