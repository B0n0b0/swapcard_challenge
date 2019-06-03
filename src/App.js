import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo'
import Search from './views/Search/index'

import Artist from './views/Artist/index'
import AppBar from './Components/SideBar/index'

import './App.css';

const client = new ApolloClient({
  uri: 'https://graphbrainz.herokuapp.com/'
});

class App extends Component {

  constructor(props){
    super(props);
    
    const artist = []

    localStorage.setItem("artist", JSON.stringify(artist))

  }

  render(){

    const views = (
      <Switch>
        <Route path="/search/" component={Search}/>
        <Route path="/artist/" component={Artist}/>
      </Switch>
    )


    return (
      <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <div>
            <AppBar />
            <div className="Content">
              {views}
            </div>
          </div>
        </Router>
      </div>
      </ApolloProvider>
    );
  }

}

export default App;
