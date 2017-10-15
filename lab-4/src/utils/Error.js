import React, {Component} from "react";
import {Alert} from 'react-bootstrap';
class Error extends Component{
    render(){
        let status=404;
        let statusText="Not found.";
        if(this.props.location.state){
            status=this.props.location.state.status;
            statusText=this.props.location.state.statusText;
        }
        //const {status, statusText}=this.props.location.state;
        return (
            <Alert bsStyle="danger" >
                <h2>There was an error!</h2>
                <p>Code: {status}</p>
                <p>Message:{statusText}</p>
            </Alert>
        );
    }
}

export default Error;