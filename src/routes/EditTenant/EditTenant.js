import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import TextField from 'material-ui/TextField'
import api from '../../apis/RealApis'

function mapStateToProps (state){
    return {};
}
export default connect(mapStateToProps)
(class EditTenant extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            id: ""
        };
    }
    componentDidMount(){
        this.setState({
            name: this.props.match.params.tenantName,
            id: this.props.match.params.tenantId
        });
    }
    componentWillReceiveProps(nextProps){
        if(this.props.match.params.tenantId != nextProps.match.params.tenantId){
            this.setState({
                name: nextProps.match.params.tenantName,
                id: nextProps.match.params.tenantId
            });    
        }
    }
    render(){
        return (
            <div>
                <TextField 
                    name="name"
                    value={this.state.name}
                    onChange={e => this.setState({name: e.target.value})}/>
               {this.props.match.params.tenantId} {this.props.match.params.tenantName}<br/>
               <button onClick={()=> {
                    this.props.dispatch({
                        type: "UPDATE_TENANT",
                        value: {
                            name: this.state.name,
                            id: this.props.match.params.tenantId
                        }
                    })
                   }}>Edit Tenant</button>
               <button 
                onClick={() => {
                    this.props.dispatch({
                        type: "DELETE_TENANT",
                        value: this.state.id
                    })
                }}
               >remove tenant</button>
            </div>
            
        )
    }
})