import React from 'react';
import { AppBar, Button, Grid, Link, Menu, Typography, createStyles, makeStyles, Theme, MenuItem } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';

import { navigation, NavigationType } from '../../Navigation';

import { NavLink, useHistory } from 'react-router-dom';
import AuthLoginButton from '../../Components/Auth0/AuthLoginButton';
import AuthRegisterButton from '../../Components/Auth0/AuthRegisterButton';
import { useAuth0 } from '@auth0/auth0-react';
import PersonIcon from '@material-ui/icons/Person';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            backgroundColor: theme.palette.secondary.main,
            justifyContent: "space-between",
        },
        toolbar: {
            width: '80%',
            margin: 'auto',
        },
        logoTitle: {
            display: "flex",
            fontFamily: 'Lobster, sans-serif',
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            fontSize: 28,
            letterSpacing: 2.5,
            "&:hover": {
                textDecoration: "none",
                color: '#288131',
            },
        },
        navlinks: {
            fontWeight: 'bold',
            margin: theme.spacing(1,2.5),
            color: "#353839f2",
            fontFamily: "Quintessential, cursive",
            fontSize: 18,
            "&:hover": {
                textDecoration: `underline ${theme.palette.primary.main} 3px`,
            },
        },
        login: {
            minWidth: 100,
            marginLeft: 20,
            borderRadius: 50,
            fontWeight: "bold",
            fontFamily: 'Mitr, sans-serif',
            fontSize: 16,
            border: `2px solid ${theme.palette.primary.main}`,
            textShadow: '0px 4px 4px rgba(0, 0, 0, 0.35)',
            "&:hover": {
                color: theme.palette.primary.main,
                border: "2px solid #000000",
                backgroundColor: "	#E0E0E0",
                textShadow: '4px 4px 4px rgba(0, 0, 0, 0.35)',
            },

        },
        register: {
            minWidth: 100,
            fontFamily: 'Mitr, sans-serif',
            fontWeight: "bold",
            fontSize: 16,
            borderRadius: 50,
            border: `2px solid ${theme.palette.primary.main}`,
            textShadow: '0px 4px 4px rgba(0, 0, 0, 0.35)',
            "&:hover": {
                color: theme.palette.primary.main,
                border: "2px solid #000000",
                backgroundColor: "	#E0E0E0",
                textShadow: '4px 4px 4px rgba(0, 0, 0, 0.35)',
            },
            
        },
        linebetweenButtons: {
            border: "1.5px solid #353839f2",
            minHeight: 36,
            marginLeft: 5,
            marginRight: 5,
            backgroundColor: "#353839f2",
            borderRadius: 10,
        },
        profileButton: {
            color: theme.palette.primary.main,
            fontSize: 15,
            fontFamily: 'Oswald, sans-serif',
            letterSpacing: 1.5
        },
        profileIcon: {
            marginTop: 2,
        }

}));
export default function NavigationBar(){

    const classes = useStyles();
    const { isAuthenticated, user, logout, isLoading } = useAuth0();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleMyAccount = () => {
        history.push('/profile');
        handleClose();
    }

    const handleLogOut = () => {
        logout({
            returnTo: window.location.origin,
        })
    }
    return(
        <AppBar className={classes.appBar} position="sticky" elevation={4}>
            <Toolbar className={classes.toolbar}>
                <Link component={NavLink} className={classes.logoTitle} to='/'>
                    Partner_Finderis
                </Link>
                <Grid item xs />
                <Typography style={{ float: "right" }}>
                    {navigation.map((item: NavigationType) => (
                        <Link component={NavLink} to={item.to} className={classes.navlinks} key={item.title}>
                            {item.title}
                        </Link>
                    ))}
                </Typography>
                {isLoading ? <div></div> 
                :
                !isAuthenticated ? (
                    <>
                        <AuthLoginButton className={classes.login} name="Login" />
                        <Typography className={classes.linebetweenButtons} />
                        <AuthRegisterButton className={classes.register} name="Register"/>
                    </>
                ) : (
                    <>
                        
                        <Button className={classes.profileButton} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                            <PersonIcon className={classes.profileIcon} />
                            {user?.nickname}
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleMyAccount}>My account</MenuItem>
                            <MenuItem onClick={handleLogOut}>
                                Logout
                            </MenuItem>
                        </Menu>
                    </>
                )
                }
                
            </Toolbar>
        </AppBar>
    )
}
