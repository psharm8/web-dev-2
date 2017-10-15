import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import './App.css';
import Pokedex from "./Pokedex";
class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <div className="App-header">
                        <h1>
                            <Link to="/">{this.props.title}</Link>
                        </h1>
                        <cite>
                            Brought to you by {this.props.author} on{" "}
                            {this.props.now.toDateString()}
                        </cite>
                    </div>
                    <div className="App-body">
                        <Pokedex/>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
