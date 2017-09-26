import React from 'react'

export default function (props){
    console.log('add tenant', props);
    return (
        <div>
            <span>Name</span>
            <input type="text" name="tenant name" />
            <br />
            <button>Add Tenant</button>
        </div>
    )
}