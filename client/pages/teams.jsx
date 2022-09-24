import React from 'react';
import AppContext from '../lib/app-context';

export default class Teams extends React.Component {

  renderGroup(letter) {
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
      <div className='d-flex flex-column'>
        <a className='team-title-link mx-2' href={`#groups?group=${letter}`}>
          <div className='group-wrapper d-flex justify-content-center'>
            <h2 className='group-title'>group {letter}</h2>
          </div>
        </a>
        <div className='mx-2'>{groupRender}</div>
      </div>
    );
  }

  render() {

    return (
      <>
        <h1 className='pt-5 text-center mx-auto mb-5 page-title'>teams</h1>
        <div className='d-md-flex justify-content-center my-4'>
          {this.renderGroup('A')}
          {this.renderGroup('B')}
        </div>
        <div className='d-md-flex justify-content-center my-4'>
          {this.renderGroup('C')}
          {this.renderGroup('D')}
        </div>
        <div className='d-md-flex justify-content-center my-4'>
          {this.renderGroup('E')}
          {this.renderGroup('F')}
        </div>
        <div className='d-md-flex justify-content-center my-4'>
          {this.renderGroup('G')}
          {this.renderGroup('H')}
        </div>
      </>
    );
  }
}
Teams.contextType = AppContext;
