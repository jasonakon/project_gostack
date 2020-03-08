import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton, Typography, Grid } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';

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
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;

  const classes = useStyles();

  const [notifications] = useState([]);

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
