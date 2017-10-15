/**
 * Created by Puneet Sharma on 14-10-2017.
 */
import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";

import ResourceList from "./ResourceList"
import ResourceDetails from "./ResourceDetails"

const resourceTypes = {
    pokemon: 'pokemon',
    berries: 'berry',
    machines: 'machine'
};

class ResourceRoutes extends Component{
    constructor(props) {
        super(props);

        this.state = {
            resourceType: props.resourceType,
            apiType: resourceTypes[props.resourceType]
        };
    }

    render(){
        const { match } = this.props;
        const { url } = match;
        return (
            <Switch>
                <Route path={`${url}/page/:page`}
                       render={(props)=>{
                           return (
                               <ResourceList {...props} resourceType={this.props.resourceType} apiType={this.state.apiType}/>
                           );
                       }}
                />
                <Route path={`${url}/:id`}
                       render={(props)=>{
                           return (
                               <ResourceDetails {...props} resourceType={this.props.resourceType} apiType={this.state.apiType}/>
                           );
                       }}
                />
            </Switch>
        );
    }
}

export default ResourceRoutes;