import React from 'react';
import parseRoute from '../lib/parse-route';
import GroupsNav from '../components/second-nav';

// export default function Groups(props) {
//   return (
//     <div>
//       <h1>Groups Page</h1>
//     </div>
//   );
// }

export default class Groups extends React.Component {
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

  renderGroup() {
    const { route } = this.state;

    if (route.params.get('groupa') !== null) {
      return (
        <h1>Group A</h1>
      );
    }
    if (route.params.get('groupb') !== null) {
      return (
        <h1>Group B</h1>
      );
    }
    if (route.params.get('groupc') !== null) {
      return (
        <h1>Group C</h1>
      );
    }
    if (route.params.get('groupd') !== null) {
      return (
        <h1>Group D</h1>
      );
    }
    if (route.params.get('groupe') !== null) {
      return (
        <h1>Group E</h1>
      );
    }
    if (route.params.get('groupf') !== null) {
      return (
        <h1>Group F</h1>
      );
    }
    if (route.params.get('groupg') !== null) {
      return (
        <h1>Group G</h1>
      );
    }
    if (route.params.get('grouph') !== null) {
      return (
        <h1>Group H</h1>
      );
    }
  }

  render() {
    return (
      <>
        <GroupsNav />
        { this.renderGroup() }
      </>
    );
  }
}
