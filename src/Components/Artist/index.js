import React, { Component } from 'react';
import gql from 'graphql-tag'
import {Query} from 'react-apollo'

import ArtistDetails from './Details/index'

import Button from '@material-ui/core/Button';
import {Link } from 'react-router-dom';

const ARTISTS_QUERY = gql` query artistDetailsQuery($mbid : MBID!)
{
    lookup{
        artist (mbid: $mbid){
          name
          country
          type
          mbid
          lifeSpan {
            begin
            end
            ended
          }
          fanArt {
            banners {
                url
              }
              backgrounds {
                url
              }
          }
          releases {
            edges {
              node {
                title
                id
                date
                coverArtArchive {
                  front
                }
              }
            }
          }
        }
      }
  }
`;

export class Artist extends Component {

    render() {
        let mbid = window.location.pathname.split('/')[2]
        console.log(mbid)
        return (
            <div>
                <Query query={ARTISTS_QUERY} variables={{mbid}} >
                    {
                        ({loading, error, data}) => {
                            if(loading) return <h4>Loading ...</h4>
                            if(error) console.log(error)
                            if (data) {console.log(data)
                                localStorage.setItem("data", JSON.stringify(data))
                                return <div>
                                {
                                        <div>
                                          <Link className="Retour" to={"/search/"+ localStorage.getItem('searchkey')}>
                                            <Button size="small">Retour</Button></Link>
                                            <ArtistDetails artist={data}/>
                                        </div>
                                        
                                }
                            </div>}
                            return <h4>No result ...</h4>
                        }
                    }
                </Query>
            </div>
        )
    }
}

export default Artist