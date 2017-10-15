/**
 * Created by Puneet Sharma on 14-10-2017.
 */
import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";
import {PageHeader, Row, Jumbotron, Pager} from 'react-bootstrap';
import axios from "../../utils/axiosInstance";
const headings = {
    pokemon: 'Pokémon',
    berries: 'Berries',
    machines: "Machines"
};

class ResourceList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            resourceType: props.resourceType,
            apiType: props.apiType,
            page: 0,
            loading: false,
            error:false,
            count: 0,
            pageSize: 20,
            resources: []
        };
    }

    async loadPage(page) {
        try {
            let pageNum = parseInt(page);
            let offset = pageNum * this.state.pageSize;
            this.setState({loading: true});
            const response = await axios.get(`${this.state.apiType}/?offset=${offset}`);
            const {count, results, previous, next} = response.data;
            const {status,statusText}=response;
            this.setState({loading: false, error:false, resources: results, count, previous, next, page: pageNum, status, statusText});
        } catch (err) {
            const {status,data}=err.response;
            this.setState({loading: false, error:true, status, statusText:data.detail});
        }
    }

    async componentDidMount() {
        const page = this.props.match.params.page;
        await this.loadPage(page);
    }

    async componentWillReceiveProps(nextProps) {
        const page = nextProps.match.params.page;
        const oldPage = this.props.match.params.page;

        if (page !== oldPage) {
            await this.loadPage(page);
        }
    }

    PagerComponent() {

        if (this.state.loading || this.state.resources.length === 0) {
            return <div/>;
        }
        const prev = this.state.page - 1;
        const next = this.state.page + 1;
        if (this.state.previous && this.state.next) {
            return (
                <Pager>
                    <Pager.Item previous href={`${prev}`}>&larr; Previous</Pager.Item>
                    <Pager.Item next href={`${next}`}>Next &rarr;</Pager.Item>
                </Pager>
            )
        }
        if (this.state.previous) {
            return (
                <Pager>
                    <Pager.Item previous href={`${prev}`}>&larr; Previous</Pager.Item>
                </Pager>
            )
        }
        if (this.state.next) {
            return (
                <Pager>
                    <Pager.Item next href={`${next}`}>Next &rarr;</Pager.Item>
                </Pager>
            )
        }
    }

    render() {
        let header = headings[this.state.resourceType];
        let body = "";

        if (this.state.loading) {
            body = (
                <Jumbotron>
                    <h1>Loading...</h1>
                    <p>Please wait while we load the list of {header}.</p>
                </Jumbotron>
            );
        }else if(this.state.error){
            return (<Redirect to={{
                pathname:'/error',
                state:{status:this.state.status,statusText:this.state.statusText}
            }}/>);
        }else {
            if (this.state.resources.length === 0) {
                body = (
                    <Jumbotron>
                        <h1>No results</h1>
                        <p>Please check the input parameters.</p>
                    </Jumbotron>
                )
            } else {
                body = this.state.resources.map((r, i) => {
                    let display = r.name ? r.name : r.url;
                    let id=i+1;
                    let url=`/${this.state.resourceType}/${id}`;
                    return (
                        <div key={`${this.state.resourceType}-${id}`}><Link  to={url} >{display}</Link></div>
                    );
                });
            }
        }

        return (
            <div>
                <PageHeader>{header}</PageHeader>
                <Row>{body}</Row>
                <Row>
                    {this.PagerComponent()}
                </Row>
            </div>
        )
    }

}

export default ResourceList;