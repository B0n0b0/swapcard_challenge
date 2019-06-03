import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Release from './Release/index'

export class Releases extends Component {

    constructor(props){
        super(props)

        this.state = {
            value : 1,
        }
    }

    render() {

        console.log('releases ----- ', this.props.releases)
        return (
            <div>

                {this.props.releases.map(release => (
                    <Release release={release.node}/>
                ))}
            </div>
        )
    }
}

Releases.propTypes = {
    releases: PropTypes.object.isRequired,
  };

export default Releases