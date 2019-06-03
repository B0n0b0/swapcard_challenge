import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const styles  = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
      },
      gridList: {
        width: 'auto',
        height: 'auto',
      },
      icon: {
        color: 'rgba(255, 255, 255, 0.54)',
      },
  });

export class FanArts extends Component {

    constructor(props){
        super(props)

        this.state = {
            value : 1,
        }
    }

    render() {
        const { classes} = this.props;

        console.log('fanart ----- ', this.props.fanarts.banners)
        return (
            <div className={classes.root}>
            <GridList className={classes.gridList}>
              <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                <ListSubheader component="div">Fan Art</ListSubheader>
              </GridListTile>
                {this.props.fanarts.banners.map(fanart => (
                    <GridListTile>
                    <img src={fanart.url} alt={fanart.url} />
                    <GridListTileBar
              title={this.props.artist}
              actionIcon={
                <IconButton className={classes.icon} href={fanart.url} target="_blank">
                  <InfoIcon />
                </IconButton>
              }
            />
                    </GridListTile>
                ))}
                {this.props.fanarts.backgrounds.map(fanart => (
                    <GridListTile>
                        <img src={fanart.url} alt={fanart.url} />
                        <GridListTileBar
              title={this.props.artist}
              actionIcon={
                <IconButton className={classes.icon} href={fanart.url} target="_blank">
                  <InfoIcon />
                </IconButton>
              }
            />
                    </GridListTile>
                ))}
                </GridList>

            </div>
        )
    }
}

FanArts.propTypes = {
    fanarts: PropTypes.object.isRequired,
    artist: PropTypes.string.isRequired
  };

export default withStyles(styles, { withTheme: true })(FanArts)