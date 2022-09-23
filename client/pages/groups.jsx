import React from 'react';
import parseRoute from '../lib/parse-route';
import GroupsNav from '../components/second-nav';
import AppContext from '../lib/app-context';

export default class Groups extends React.Component {

  renderTeams(letter) {
    const { teams } = this.context;
    const group = [];
    for (let i = 0; i < teams.length; i++) {
      if (teams[i].group === letter) {
        group.push(teams[i]);
      }
    }
    const groupRender = group.map(groupList => {
      return (
        <a className='team-link' key={groupList.teamId} href={`#teams/teamid=${groupList.teamId}`}>
          <div className='team-wrapper my-2 mx-auto d-flex justify-content-start'>
            <img className='team-flag me-4' src={groupList.countryFlag} alt="" />
            <h1 className='team-name'>{groupList.countryName}</h1>
          </div>
        </a>
      );
    });

    return (
      <div className='mx-2'>{groupRender}</div>
    );
  }

  renderGroup() {
    const route = parseRoute(window.location.hash);
    if (route.params.get('group') === 'A') {
      return 'A';
    }
    if (route.params.get('group') === 'B') {
      return 'B';
    }
    if (route.params.get('group') === 'C') {
      return 'C';
    }
    if (route.params.get('group') === 'D') {
      return 'D';
    }
    if (route.params.get('group') === 'E') {
      return 'E';
    }
    if (route.params.get('group') === 'F') {
      return 'F';
    }
    if (route.params.get('group') === 'G') {
      return 'G';
    }
    if (route.params.get('group') === 'H') {
      return 'H';
    }
  }

  render() {
    const groupClicked = this.renderGroup();
    return (
      <>
        <div className='second-nav-bg d-flex justify-content-center'>
          <GroupsNav />
        </div>
        <h1 className='pt-5 text-center mx-auto mb-2 page-title'>{`Group ${groupClicked}`}</h1>
        <div className='d-md-flex justify-content-center my-4'>
          {this.renderTeams(groupClicked)}
        </div>
        <div className='d-flex justify-content-center'>
          <button className='btn btn-main'>Start New Prediction</button>
        </div>
      </>
    );
  }
}
Groups.contextType = AppContext;
