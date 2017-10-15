import React, {Component} from "react";
import {Row, Col, Panel} from 'react-bootstrap';
import "./ResourceDetails.css";
class MachineDetails extends Component{

    constructor(props) {
        super(props);

        this.state = {
            data: props.data
        };
    }
    render(){
        const {data}=this.state;

        if(!data){
            return (<div>Nothing yet!</div>);
        }

        const {item, move}=data;
        return(
            <Panel className="resource-details" bsStyle="primary" header={item.name}>
                <Row>
                    <Col md={3}>Move :</Col>
                    <Col md={9}>{move.name}</Col>
                </Row>
            </Panel>
        );
    }
}
export default MachineDetails;