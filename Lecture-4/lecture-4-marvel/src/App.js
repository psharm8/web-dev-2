import React, { Component } from "react";
//import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import CharacterList from "./CharacterList";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: "",
      matchingPeople:[]
    };
  }

  componentWillReceiveProps(props) {}

  componentDidMount() {}

  changeSearchQuery(searchQuery) {
    this.setState({ searchQuery });
  }
  searchForMatches(searchQuery){
    //const {searchQuery}=this.state;
    const url=`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${searchQuery}&apikey=e090d166c16d747e4013ff258dff7aec`;
   // alert(url);
   //const response = axios.get(url);
   //console.log(response);
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <form onSubmit={e=>{
          e.preventDefault();
          this.searchForMatches(this.state.searchQuery);
          }}>
          <input
            type="text"
            value={this.state.searchQuery}
            onChange={e => {
              e.preventDefault();
              this.changeSearchQuery(e.target.value);
            }}
          />
          <button type="submit">Submit</button>
        </form>
        <hr/>
        <CharacterList />
      </div>
    );
  }
}

export default App;
