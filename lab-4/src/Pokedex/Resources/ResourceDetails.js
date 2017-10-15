/**
 * Created by Puneet Sharma on 14-10-2017.
 */

import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {Jumbotron, PageHeader, Row} from 'react-bootstrap';
import axios from "../../utils/axiosInstance";
import Pokemon from "./PokemonDetails";
import Berry from "./BerriesDetails";
import Machine from "./MachineDetails";

const headings = {
    pokemon: 'Pokémon',
    berries: 'Berries',
    machines: "Machines"
};
class ResourceDetails extends Component{
    constructor(props) {
        super(props);

        this.state = {
            resourceType: props.resourceType,
            apiType: props.apiType,
            loading: false,
            error:false,
            data: undefined
        };
    }
    async loadDetails(id) {
        try {
            let idNum = parseInt(id);
            this.setState({loading: true});
            const response = await axios.get(`${this.state.apiType}/${idNum}`);
            const {data, status,statusText} = response;

            this.setState({loading: false, error:false, data, status,statusText});
        } catch (err) {
            let e=JSON.stringify(err.response,null,4);
            console.log(e);
            let status="500";
            let data={
                detail:"Unknown Error"
            };
            if(err.response)            {
                status=err.response.status;
                data = err.response.data;
            }
            this.setState({loading: false, error:true, status, statusText:data.detail});
        }
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        await this.loadDetails(id);
    }

    async componentWillReceiveProps(nextProps) {
        const id = nextProps.match.params.id;
        const oldId = this.props.match.params.id;

        if (id !== oldId) {
            await this.loadDetails(id);
        }
    }

    render(){
        let header = headings[this.state.resourceType];
        let body="";
        if(this.state.loading){
            body= (
                <Jumbotron>
                    <h1>Loading...</h1>
                    <p>Please wait while we load the details.</p>
                </Jumbotron>
            );
        }
        else if(this.state.error){
            body= (<Redirect to={{
                pathname:'/error',
                state:{status:this.state.status,statusText:this.state.statusText}
            }}/>);
        }else if(this.state.resourceType === "pokemon"){
            body= (<Pokemon  data={this.state.data}/>);
        }else if(this.state.resourceType === "berries"){
            body= (<Berry  data={this.state.data}/>);
        }else if(this.state.resourceType === "machines"){
            body= (<Machine  data={this.state.data}/>);
        }
        return(
            <div>
                <PageHeader>{header}</PageHeader>
                <Row>{body}</Row>
            </div>
        );
    }
}

export default ResourceDetails;