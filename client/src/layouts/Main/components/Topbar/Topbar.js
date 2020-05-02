import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton, Typography, Grid, Button, Menu, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Firebase from '../../../../common/Firebase'

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  },
  control: {
    padding: theme.spacing(2),
  },
  signInButton: {
    color: theme.palette.black

  }
}));

const Topbar = props => {
  const history = useHistory();

  const { className, onSidebarOpen, ...rest } = props;

  const [firebaseInitialized, setFirebaseInitialized] = useState(false)
  const [AnchorE1, setAnchorE1] = useState(null);

  const classes = useStyles();

  const [notifications] = useState([]);

  const handleLoginBut = event => {
    history.push("/signin")
  }

  const handleLoggedBut = (event) => {
    setAnchorE1(event.currentTarget);
  }

  const handleLoggedClose = () => {
    setAnchorE1(null);
  }

  const handleLogout = () => {
    Firebase.logout();
    setAnchorE1(null);
  }

	useEffect(() => {
		Firebase.isInitialized().then(val => {
			setFirebaseInitialized(val)
		})
	})

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
        <RouterLink to="/">
          <img
            alt="Logo"
            src="/images/icons/logo_new.png"
          />
        </RouterLink>
        <Typography
            variant="h5">
            &nbsp; GoStack
          </Typography>
        <div className={classes.flexGrow} />
        {firebaseInitialized !== false && Firebase.getCurrentUserName() !== null ? 
        (<div>
          <Button
          className={classes.signInButton}
          aria-controls="loggedin-menu" 
          aria-haspopup="true"
          size="medium"
          font-weight= "bold"
          variant="contained"
          startIcon= {<AccountCircleIcon/>}
          onClick={handleLoggedBut}
          >{Firebase.getCurrentUserName()}
        </Button>
        <Menu
          id="loggedin-menu"
          anchorEl={AnchorE1}
          keepMounted
          open={Boolean(AnchorE1)}
          onClose={handleLoggedClose}>
            <MenuItem onClick={handleLoggedClose}>Profile</MenuItem>
            <MenuItem onClick={handleLoggedClose}>My account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>)
        :(<Button
          className={classes.signInButton}
          size="medium"
          font-weight= "bold"
          variant="contained"
          onClick={handleLoginBut}
          >Login
        </Button>)}
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            className={classes.signOutButton}
            color="inherit"
          >
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;
