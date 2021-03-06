import React from 'react';
import theme from './theme';
import { CssBaseline, makeStyles, ThemeProvider, Typography } from '@material-ui/core';
import {Route, Switch} from 'react-router-dom';
import ResponsiveNavigationBar from './Layout/NavigationBarItems/ResponsiveNavigationBar';
import './App.css';
import ProtectedRoute from './Components/Auth0/ProtectedRoute';
import ProtectedAdminRoute from './Components/Auth0/ProtectedAdminRoute';
import ScrollToTop from './Components/ScrollToTop';


const useStyles = makeStyles({
  root: {
      backgroundColor: "#E6F7F3",
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
  },
});

export default function App() {

  const classes = useStyles();


  return (
    
    <ThemeProvider theme={theme}> 
      <CssBaseline />
      <ScrollToTop />
      <div className={classes.root}>
        <ResponsiveNavigationBar />
        <React.Suspense fallback={<Typography style={{textAlign: "center"}}>Loading...</Typography>}>
          <Switch>
            <Route exact path='/' component={React.lazy(() => import('./Pages/Home'))}/>
            <Route exact path='/findplayers' component={React.lazy(() => import('./Pages/FindPlayers'))}/>
            <Route exact path='/findtournaments' component={React.lazy(() => import('./Pages/FindTournaments'))}/>
            <Route exact path='/blog' component={React.lazy(() => import('./Pages/Blog'))}/>
            <Route exact path='/createpost' component={React.lazy(() => import('./Pages/CreatePost'))}/>
            <Route exact path='/loginrequirement' component={React.lazy(() => import('./Pages/LoginRequirement'))}/>
            <Route exact path='/blog/:id' component={React.lazy(() => import('./Pages/BlogPage'))}/>
            <Route exact path='/tournament/:id' component={React.lazy(() => import('./Pages/TournamentPage'))}/>
            <Route exact path='/findplayer/:id' component={React.lazy(() => import('./Pages/FindPlayerPage'))}/>

            <ProtectedRoute
              component= {React.lazy(() => import('./Pages/Profile'))}
              exact
              path="/profile"
            />
            <ProtectedAdminRoute 
              component= {React.lazy(() => import('./Pages/CreateBlog'))}
              path="/createblog"
              exact
            />
            <ProtectedAdminRoute 
              component= {React.lazy(() => import('./Pages/CreateTournament'))}
              path="/createtournament"
              exact
            />
            <Route exact component={React.lazy(() => import('./Pages/PageNotFound'))}/>
          </Switch>
        </React.Suspense>
      </div>
    </ThemeProvider>

  );
}