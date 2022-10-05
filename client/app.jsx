import React from 'react';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home';
import Groups from './pages/groups';
import Bracket from './pages/bracket';
import Teams from './pages/teams';
import parseRoute from './lib/parse-route';
import AppContext from './lib/app-context';
import Login from './pages/login';
import jwtDecode from 'jwt-decode';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      teams: [],
      route: parseRoute(window.location.hash)
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', event => {
      const newRoute = parseRoute(window.location.hash);
      this.setState({
        route: newRoute
      });
    });
    fetch('/api/teams')
      .then(response => response.json())
      .then(teamData => {
        this.setState({
          teams: teamData
        });
      })
      .catch(error => {
        console.error('error:', error);
      });
    const token = window.localStorage.getItem('react-jwt');
    const user = token ? jwtDecode(token) : null;
    this.setState({
      user,
      isAuthorizing: false
    });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-jwt', token);
    this.setState({ user });
    // console.log(this.state.user);
  }

  handleSignOut() {
    window.localStorage.removeItem('react-jwt');
    this.setState({ user: null });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return (
        <Home />
      );
    }
    if (route.path === 'groups') {
      return (
        <Groups />
      );
    }
    if (route.path === 'bracket') {
      return (
        <Bracket />
      );
    }
    if (route.path === 'teams') {
      return (
        <Teams />
      );
    }
    if (route.path === 'sign-up' || route.path === 'sign-in') {
      return (
        <Login />
      );
    }
  }

  render() {

    const { user, isAuthorizing, route } = this.state;
    const { handleSignIn, handleSignOut } = this;
    // console.log('checking this:', this);
    const contextValue = { user, isAuthorizing, route, handleSignIn, handleSignOut };
    return (
      <AppContext.Provider value={contextValue}>
        <>
          <Header />
          { this.renderPage() }
          <Footer />
        </>
      </AppContext.Provider>
    );
  }
}
