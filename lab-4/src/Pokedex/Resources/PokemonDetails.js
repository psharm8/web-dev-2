import React, {Component} from "react";
import {Row, Col, Panel, Image} from 'react-bootstrap';
import "./ResourceDetails.css";
class PokemonDetails extends Component{

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

        const {weight, name, abilities,moves,sprites}=data;
        let abilityList=abilities.map(a=>a.ability.name).join(", ");
        let movesList=moves.map(a=>a.move.name).join(", ");
        let img=sprites.front_default;
        return(
            <Panel className="resource-details" bsStyle="primary" header={name}>
                <Row>
                    <Col sm={2}>
                        <Image src={img}  />
                    </Col>
                    <Col sm={10}>
                        <Row>
                            <Col md={2}>Weight:</Col>
                            <Col md={10}>{weight}</Col>
                        </Row>
                        <Row>
                            <Col md={2}>Abilities:</Col>
                            <Col md={10}>{abilityList}</Col>
                        </Row>
                        <Row>
                            <Col md={2}>Moves:</Col>
                            <Col md={10}>{movesList}</Col>
                        </Row>
                    </Col>
                </Row>
            </Panel>
        );
    }
}
export default PokemonDetails;