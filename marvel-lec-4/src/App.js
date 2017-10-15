import React, {Component} from "react";
import "./App.css";
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
class App extends Component {

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>{this.props.title}</h2>
                    <cite>
                        Brought to you by {this.props.author} on{" "}
                        {this.props.now.toDateString()}
                    </cite>
                </div>
                <div className="App-body">
                    <Router>
                        <div>
                            <Route exact path="/" component="{CharacterSearchPage}"/>
                        </div>
                    </Router>

                </div>
            </div>
        );
    }
}
export default App;
