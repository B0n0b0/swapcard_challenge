import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import { fade } from '@material-ui/core/styles/colorManipulator';
import {Link } from 'react-router-dom';

import "./style.css"




const drawerWidth = '240px';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor : '#00cc88'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
    margin: 'auto !important',
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'black',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
  },
  toolbar: theme.mixins.toolbar,
});

class MenuSideBar extends Component {

  constructor(props){
    super(props)
    this.state = {
      searchInput : '',
    }
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    })
  };

  render(){

    console.log('Favoris', JSON.parse(localStorage.getItem('artist')).length)

    const { classes } = this.props;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <Link to={"/search/" + this.state.searchInput}>
                <IconButton >
                  <SearchIcon />
                </IconButton></Link>            
            </div>
            <InputBase
                id="searchInput"
                name="searchInput"
                type="text"
                  placeholder="Rechercher Artiste"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  value={this.state.searchInput}
                  onChange={this.handleChange}
            />
          </div>
          <div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <h3>Artistes Favoris</h3>
        <Divider />

        <List>
          {JSON.parse(localStorage.getItem('artist')).map((artist) => (
            <Link to={"/artist/" + artist.mbid}  className="Artiste">
            <ListItem button key={artist.name} >
              <ListItemText primary={artist.name}  className="Artiste"/>
            </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
}
  
MenuSideBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuSideBar);