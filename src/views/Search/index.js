import React, { Component } from 'react';
import Artist from '../../Components/Search/index'

class Search extends Component {

  constructor(props){
    super(props);

    this.state = {

    }
  }

  render(){

    return (
      <div className="Search">
          <Artist />
      </div>
    );
  }

}

export default Search;