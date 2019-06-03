import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

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

export class Release extends Component {
   render() {
    const { classes} = this.props;
    console.log('release ====', this.props.release)
        return (
            <div className="Carte">
                              <Card className={classes.card}>
                <div className={classes.details}>
                  <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                      {this.props.release.title}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                    {this.props.release.date}
                    </Typography>
                  </CardContent>
                </div>
                <CardMedia
                  className={classes.cover}
                  image={this.props.release.coverArtArchive.front}
                  title="Live from space album cover"
                />
              </Card>
            </div>
        )
    }
}

Release.propTypes = {
    release: PropTypes.object.isRequired,
  };
  

  export default withStyles(styles, { withTheme: true })(Release)