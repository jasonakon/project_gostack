import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    root: {
        boxShadow: 'none'
    }
}));

const Topbar = props => {
    const { className, ...rest } = props;

    const classes = useStyles();

    return (
        <AppBar
        {...rest}
            className={clsx(classes.root, className)}
            color="primary"
            position="fixed"
        >
            <Toolbar>
                <RouterLink to='/'>
                    <img
                        alt="Logo"
                        src="/images/icons/logo.png"
                        ></img>
                </RouterLink>
            </Toolbar>
        </AppBar>
    );
};

Topbar.propTypes = {
    className: PropTypes.string
};

export default Topbar;