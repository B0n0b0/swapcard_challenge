import React, { Component } from 'react';
import ArtistD from '../../Components/Artist/index'


class Artist extends Component {

  constructor(props){
    super(props);

    this.state = {

    }
  }

  render(){

    return (
      <div className="Artist">
          <ArtistD />
      </div>
    );
  }

}

export default Artist;
