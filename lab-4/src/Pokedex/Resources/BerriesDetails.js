import React, {Component} from "react";
import {Row, Col, Panel} from 'react-bootstrap';
import "./ResourceDetails.css";
class BerriesDetails extends Component{

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

        const {natural_gift_power, name,max_harvest,soil_dryness,smoothness , flavors}=data;
        let flavorList=flavors.map(a=>a.flavor.name).join(", ");
        return(
            <Panel className="resource-details" bsStyle="primary" header={name}>
                <Row>
                    <Col md={3}>Gift Power :</Col>
                    <Col md={9}>{natural_gift_power}</Col>
                </Row>
                <Row>
                    <Col md={3}>Max Harvest:</Col>
                    <Col md={9}>{max_harvest}</Col>
                </Row>
                <Row>
                    <Col md={3}>Soil Dryness:</Col>
                    <Col md={9}>{soil_dryness}</Col>
                </Row>
                <Row>
                    <Col md={3}>Smoothness:</Col>
                    <Col md={9}>{smoothness}</Col>
                </Row>
                <Row>
                    <Col md={3}>Flavors:</Col>
                    <Col md={9}>{flavorList}</Col>
                </Row>
            </Panel>
        );
    }
}
export default BerriesDetails;