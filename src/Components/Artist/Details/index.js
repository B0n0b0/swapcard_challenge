import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles, makeStyles  } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link } from 'react-router-dom';

import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';

import Releases from '../../Releases/index'
import FanArt from '../../FanArts/index'


import "./style.css"

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

function MySnackbarContentWrapper(props) {
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="Close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};


function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
  }
  
  TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
  };


  function LinkTab(props) {
    return (
      <Tab
        component="a"
        onClick={event => {
          event.preventDefault();
        }}
        {...props}
      />
    );
  }

  const styles = theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      width : '75%',
      margin : 'auto'
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor : '#00cc88'
    },
  });

export class ArtistDetails extends Component {

    constructor(props){
        super(props)

        this.state = {
            value : 0,
            setValue : 0,
            favArtists : (JSON.parse(localStorage.getItem('artist')) ? JSON.parse(localStorage.getItem('artist')) : []),
            open : false
        }
      }

      handleChange = (event, value) => {
        this.setState({ value });
      };

      handleFollow = () => {
        const favArtist = {name : this.props.artist.lookup.artist.name, mbid : this.props.artist.lookup.artist.mbid}
        let favArtists = (JSON.parse(localStorage.getItem('artist')) ? JSON.parse(localStorage.getItem('artist')) : [])
        favArtists.push(favArtist)
        localStorage.setItem("artist", JSON.stringify(favArtists))
        this.setState({
          favArtists : JSON.parse(localStorage.getItem('artist'))
        })
        this.setState({
          open : true
        })
      }

      
      handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }

        this.setState({
          open : false,
        });
      }

      handleCloseU = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }

        this.setState({
          openU : false
        });
      }

      handleClick = () => {
        this.props.enqueueSnackbar('I love snacks.');
      };

      handleUnfollow = () => {
        let unFavArtist = {name : this.props.artist.lookup.artist.name, mbid : this.props.artist.lookup.artist.mbid}
        let favArtists = JSON.parse(localStorage.getItem('artist'))
        const newFavArtists = favArtists.filter(artist => artist.name  !== unFavArtist.name);
        console.log('Favlist', newFavArtists)
        localStorage.setItem("artist", JSON.stringify(newFavArtists))
        this.setState({
          favArtists : JSON.parse(localStorage.getItem('artist'))
        })
        this.setState({
          openU : true
        })

      }
    render() {
      const {favArtists} = this.state
      let self = this
      let found = favArtists.find(function(element) {
        return element.name === self.props.artist.lookup.artist.name;
      });
        const { classes } = this.props;
        return (
            <div className="Profil">
                  <Snackbar
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                  >
                    <MySnackbarContentWrapper
                      onClose={this.handleClose}
                      variant="success"
                      message={"Vous suivez maintenant " + this.props.artist.lookup.artist.name}
                    />
                  </Snackbar>
                  <Snackbar
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    open={this.state.openU}
                    autoHideDuration={3000}
                    onClose={this.handleCloseU}
                  >
                    <MySnackbarContentWrapper
                      onClose={this.handleCloseU}
                      variant="warning"
                      message={"Vous arrétez de suivre " + this.props.artist.lookup.artist.name}
                    />
                  </Snackbar>
                <Link className="Follow" to="#">
                {!found ? <Button size="small" onClick={this.handleFollow}>Suivre</Button> : <Button size="small" onClick={this.handleUnfollow}>Unfollow</Button>}</Link>
                <img alt="" className="coverArtist" src={this.props.artist.lookup.artist.fanArt.banners.length ? this.props.artist.lookup.artist.fanArt.banners[0].url : ''}></img>
                <p>Nom : {this.props.artist.lookup.artist.name}</p>
                <p>Pays : {this.props.artist.lookup.artist.country}</p>
                {this.props.artist.lookup.artist.type === "Person" ? <div><p>Date de naissance : {this.props.artist.lookup.artist.lifeSpan.begin}</p>
                {this.props.artist.lookup.artist.lifeSpan.end ? <p>Date de decès : {this.props.artist.lookup.artist.lifeSpan.end}</p> : ''} </div>: <div><p>Début de groupe : {this.props.artist.lookup.artist.lifeSpan.begin} ({this.props.artist.lookup.artist.lifeSpan.ended ? 'Finis' : 'En cours'})</p> </div>}
                <div className={classes.root}>
                <AppBar position="static" className={classes.appBar}>
                    <Tabs variant="fullWidth" value={this.state.value} onChange={this.handleChange}>
                    <LinkTab label="Fan'Art" />
                    <LinkTab label="Chanson" />
                    </Tabs>
                </AppBar>
                {this.state.value === 0 && <TabContainer><FanArt fanarts={this.props.artist.lookup.artist.fanArt} artist={this.props.artist.lookup.artist.name}/></TabContainer>}
                {this.state.value === 1 && <TabContainer><Releases releases={this.props.artist.lookup.artist.releases.edges}/></TabContainer>}
                </div>
            </div>
        )
    }
}

ArtistDetails.propTypes = {
    artist: PropTypes.object.isRequired,
    theme: PropTypes.object,
    enqueueSnackbar: PropTypes.func.isRequired,

  };
  
  export default withStyles(styles)(ArtistDetails)
