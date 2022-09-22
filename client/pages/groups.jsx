import React from 'react';
import parseRoute from '../lib/parse-route';
import GroupsNav from '../components/second-nav';
import AppContext from '../lib/app-context';

export default class Groups extends React.Component {

  renderGroup() {
    const route = parseRoute(window.location.hash);
    if (route.params.get('group') === 'A') {
      return (
        <h1>Group A</h1>
      );
    }
    if (route.params.get('group') === 'B') {
      return (
        <h1>Group B</h1>
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
    return (
      <>
        <GroupsNav />
        { this.renderGroup() }
      </>
    );
  }
}
Groups.contextType = AppContext;
