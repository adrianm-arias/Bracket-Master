import React from 'react';
import parseRoute from '../lib/parse-route';
import GroupsNav from '../components/second-nav';
import AppContext from '../lib/app-context';

export default class Groups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group: []
    };
  }

  // componentDidMount() {
  //   fetch('/api/teams')
  //     .then(response => response.json())
  //     .then(groupData => {
  //       this.setState({
  //         group: groupData
  //       });
  //     })
  //     .catch(error => {
  //       console.error('error:', error);
  //     });
  // }

  renderGroup() {
    const { teams } = this.context;
    const route = parseRoute(window.location.hash);
    // if (this.state.group.length === 0) {
    //   return null;
    // }
    if (route.params.get('group') === 'A') {
      return (
        <>
          <h1>{teams[0].countryName}</h1>
          <h1>{teams[1].countryName}</h1>
        </>
      );
    }
    if (route.params.get('group') === 'B') {
      return (
        <>
          <h1>{teams[2].countryName}</h1>
          <h1>{teams[3].countryName}</h1>
        </>
      );
    }
    if (route.params.get('group') === 'C') {
      return (
        <h1>Group C</h1>
      );
    }
    if (route.params.get('group') === 'D') {
      return (
        <h1>Group D</h1>
      );
    }
    if (route.params.get('group') === 'E') {
      return (
        <h1>Group E</h1>
      );
    }
    if (route.params.get('group') === 'F') {
      return (
        <h1>Group F</h1>
      );
    }
    if (route.params.get('group') === 'G') {
      return (
        <h1>Group G</h1>
      );
    }
    if (route.params.get('group') === 'H') {
      return (
        <h1>Group H</h1>
      );
    }
  }

  render() {
    // const { teams } = this.context;
    // console.log('teams page:', teams[0]);
    // const route = parseRoute(window.location.hash);
    // console.log(route.params.get('group'));
    return (
      <>
        <GroupsNav />
        { this.renderGroup() }
      </>
    );
  }
}
Groups.contextType = AppContext;
