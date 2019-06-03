import React, { Component } from 'react';
import gql from 'graphql-tag'
import {Query} from 'react-apollo'
import {Redirect} from 'react-router-dom';


import SearchNode from './Node/index'


const ARTISTS_QUERY = gql` query artistQuery($name : String!)
{
    search {
      artists(query: $name
                    first: 20) {
        nodes {
            fanArt {
                banners {
                    url
                  }
              }   
          id
          name
          country
          mbid
        }
      }
    }
  }
`;

export class Artist extends Component {

    constructor(props){
        super(props)

        this.state = {
            value : 1,
        }
    }

    render() {
        console.log(localStorage.getItem("data"))
        console.log(window.location)
        let name = window.location.pathname.split('/')[2]
        console.log(name)
        return (
            <div>
                {
                    !name ? <Redirect to="/"/> : <Query query={ARTISTS_QUERY} variables={{name}} >
                    {
                        ({loading, error, data}) => {
                            if(loading) return <h4>Loading ...</h4>
                            if(error) console.log(error)
                            if (data) console.log(data)
                            return <div>
                                {<div>
                                    {data.search.artists.nodes.map(artist => (
                                        <SearchNode artist={artist} searchkey={name}/>
                                    ))}</div>
                                }
                            </div>
                        }
                    }
                </Query>
                }

            </div>
        )
    }
}

export default Artist