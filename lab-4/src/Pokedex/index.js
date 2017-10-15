/**
 * Created by Puneet Sharma on 13-10-2017.
 */
import React, {Component} from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import {Row, Col} from 'react-bootstrap';
import Home from "./Home"
import Resources from "./Resources"
import ErrorPage from "../utils/Error"
class Pokedex extends Component {

    componentWillReceiveProps(nextProps){
        console.log(nextProps);
    }

    render() {
        let p=this.props;
        return (
            <Row>
                <Col sm={6} md={4} smOffset={6} mdOffset={4}>
                    <Switch>
                        <Route path={'/pokemon'}  render={PokemonList}/>
                        <Route path={'/berries'}  render={BerriesList}/>
                        <Route path={'/machines'}  render={MachinesList}/>
                        <Route path={'/error'} component={ErrorPage}/>
                        <Route exact path={'/'}  component={Home}/>
                        <Redirect from={'*'} to={{
                            pathname:'/error',
                            state:{status:404,statusText:'Not Found.'}
                        }}/>
                    </Switch>
                </Col>
            </Row>
        );
    }
}
// const Error=(props)=>{
//     return (<ErrorPage {...props}/>);
// };
const PokemonList=(props)=>{
    return (<Resources {...props}  resourceType="pokemon"/>);
};

const BerriesList=(props)=>{
    return (<Resources {...props}  resourceType="berries"/>);
};

const MachinesList=(props)=>{
    return (<Resources {...props}  resourceType="machines"/>);
};

export default Pokedex;