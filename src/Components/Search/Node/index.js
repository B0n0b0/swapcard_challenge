import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link } from 'react-router-dom';

import "./style.css"

const styles  = theme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    minWidth : '200px',
    height : '150px'
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: '100%',
    backgroundRepeat : 'round',

  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  });

export class SearchNode extends Component {

    handleSearchKey = () =>{
        console.log('Handle Key', this.props.searchkey)
        localStorage.setItem('searchkey', this.props.searchkey)
    }


   render() {
    localStorage.setItem('searchkey', '')
    console.log(this.props.artist.fanArt.banners)
    const { classes} = this.props;
        return (
            <div className="Carte">
              <Card className={classes.card}>
                <div className={classes.details}>
                  <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                      {this.props.artist.name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                    {this.props.artist.country}
                    </Typography>
                  </CardContent>
                  <div className={classes.controls}>
                  <Link className="Plus" to={"/artist/"+ this.props.artist.mbid}>
                <Button size="small" onClick={() => this.handleSearchKey()}>Voir plus</Button></Link>
                  </div>
                </div>
                <CardMedia
                  className={classes.cover}
                  image={this.props.artist.fanArt.banners.length ? this.props.artist.fanArt.banners[0].url : ''}
                  title="cover"
                />
              </Card>

            </div>
        )
    }
}

SearchNode.propTypes = {
    artist: PropTypes.object.isRequired,
    searchkey: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };
  

  export default withStyles(styles, { withTheme: true })(SearchNode)