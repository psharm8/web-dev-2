import React, {Component} from "react";
import {Alert} from 'react-bootstrap';
class Error extends Component{
    render(){
        const {status, statusText}=this.props.location.state;
        return (
            <Alert bsStyle="danger" >
                <h4>There was an error!</h4>
                <p>Code: {status}</p>
                <p>Message:{statusText}</p>
            </Alert>
        );
    }
}

export default Error;