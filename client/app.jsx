import React from 'react';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home';
import Groups from './pages/groups';
import Bracket from './pages/bracket';
import Teams from './pages/teams';
import Login from './pages/login';
import parseRoute from './lib/parse-route';

// import GroupsNav from './components/second-nav';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', event => {
      const newRoute = parseRoute(window.location.hash);
      this.setState({
        route: newRoute
      });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === 'home') {
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
    if (route.path === 'login') {
      return (
        <Login />
      );
    }
  }

  render() {
    return (
      <>
        <Header />
        { this.renderPage() }
        <Footer />
      </>
    );
  }
}
