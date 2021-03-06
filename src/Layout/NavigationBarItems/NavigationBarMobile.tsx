import { AppBar, createStyles, Drawer, List, ListItemIcon, ListItemText, makeStyles, Theme, Toolbar, Divider, IconButton, ListItem } from '@material-ui/core';
import React, { useState } from 'react';
import { Link, useHistory} from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import { navigation, NavigationType } from '../../Navigation';

import HomeIcon from '@material-ui/icons/Home';
import SportsTennisIcon from '@material-ui/icons/SportsTennis';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import { useAuth0 } from '@auth0/auth0-react';
import PersonIcon from '@material-ui/icons/Person';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            backgroundColor: theme.palette.secondary.main,
        },
        toolbar: {
            justifyContent: "space-between",
        },
        logoTitle: {
            display: "flex",
            fontFamily: 'Lobster, sans-serif',
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            fontSize: 26,
            letterSpacing: 2.5,
            textDecoration: "none",
        },
        navlist: {
            padding: 0,
        },
        listitemicon: {
            minWidth: 36,
        },
        topLine: {
            justifyContent: "space-between",
            maxHeight: 50,
        },
        mobileLogo: {
            fontFamily: 'Lobster, sans-serif',
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            fontSize: 24,
            letterSpacing: 2,
            textDecoration: "none",
            paddingLeft: 5
        }
    })   
)
export default function NavigationBarMobile(){

    const classes = useStyles();
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
    

    const handleOpen = () => {
        setIsOpen(!isOpen);
    }
    const handleNavListItemClick = (pathTo: string) => {
        history.push(pathTo);
        setIsOpen(false);
    };

    const handleIcon = (buttonName: string) =>{
        switch(buttonName){
            case 'Home':
                return <HomeIcon />;
            case 'Find Players':
                return <SportsTennisIcon />;
            case 'Find Tournaments':
                return <LocationSearchingIcon />;
            case 'Blog':
                return <NewReleasesIcon />;
            default:
        }
    }
    
    const phoneNavLink = () => (
        <List className={classes.navlist}>
            <ListItem className={classes.topLine} key="topline">
                <Link to='/' className={classes.mobileLogo} onClick={handleOpen}>
                    Partner_Finderis
                </Link> 
                <IconButton edge="end" onClick={handleOpen}>
                    <CloseIcon />
                </IconButton> 
            </ListItem>
            <Divider />
            {navigation.map((item: NavigationType) =>(
                <>
                <ListItem
                    button
                    key={item.title}
                    onClick={() => handleNavListItemClick(item.to)}
                    >

                        <ListItemIcon className={classes.listitemicon}>
                            {handleIcon(item.title)}
                        </ListItemIcon>

                        <ListItemText primary={item.title} />
                        
                </ListItem>
                <Divider />
                </>
            ))}
            {isAuthenticated ? (
                <>
                <ListItem button key='my-account' onClick={() => handleNavListItemClick('profile')}>
                    <ListItemIcon className={classes.listitemicon}>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary='My Account' />
                </ListItem>
                <Divider />
                <ListItem
                    button
                    key='logout'
                    onClick={() => logout({
                        returnTo: window.location.origin,
                    })}
                    >
                        <ListItemIcon className={classes.listitemicon}>
                            <DoubleArrowIcon />
                        </ListItemIcon>
                        <ListItemText primary='Log Out' />
                </ListItem>
                </>
            ) : (
                <ListItem
                button
                key="Login/Register"
                onClick={() => loginWithRedirect()}
                >
                    <ListItemIcon className={classes.listitemicon}>
                        <DoubleArrowIcon />
                    </ListItemIcon>
                    <ListItemText primary="Login / Register"/>

            </ListItem>
            )}

        </List>
    )
    return(
        <AppBar className={classes.appBar} position="sticky">
            <Toolbar className={classes.toolbar}>
                <Link to='/' className={classes.logoTitle}>
                    Partner_Finderis
                </Link>
                <IconButton edge="end" onClick={handleOpen}>
                    <MenuIcon />
                </IconButton> 
            </Toolbar>
            <Drawer anchor="top" open={isOpen} onClose={handleOpen}>
                {phoneNavLink()}
            </Drawer>
        </AppBar>
    )
}