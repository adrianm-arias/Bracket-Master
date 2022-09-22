import React from 'react';
import AppContext from '../lib/app-context';

export default class Teams extends React.Component {

  renderGroupA() {
    const { teams } = this.context;
    const groupA = [];
    for (let i = 0; i < teams.length; i++) {
      if (teams[i].group === 'A') {
        groupA.push(teams[i]);
      }
    }
    const groupRender = groupA.map(groupList => {
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
        <a className='team-title-link mx-2' href="">
          <div className='group-wrapper d-flex justify-content-center'>
            <h2 className='group-title'>group a</h2>
          </div>
        </a>
        <div className='mx-2'>{groupRender}</div>
      </div>
    );
  }

  renderGroupB() {
    const { teams } = this.context;
    const groupB = [];
    for (let i = 0; i < teams.length; i++) {
      if (teams[i].group === 'B') {
        groupB.push(teams[i]);
      }
    }
    const groupRender = groupB.map(groupList => {
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
        <a className='team-title-link mx-2' href="">
          <div className='group-wrapper d-flex justify-content-center'>
            <h2 className='group-title'>group b</h2>
          </div>
        </a>
        <div className='mx-2'>{groupRender}</div>
      </div>
    );
  }

  renderGroupC() {
    const { teams } = this.context;
    const groupC = [];
    for (let i = 0; i < teams.length; i++) {
      if (teams[i].group === 'C') {
        groupC.push(teams[i]);
      }
    }
    const groupRender = groupC.map(groupList => {
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
        <a className='team-title-link mx-2' href="">
          <div className='group-wrapper d-flex justify-content-center'>
            <h2 className='group-title'>group c</h2>
          </div>
        </a>
        <div className='mx-2'>{groupRender}</div>
      </div>
    );
  }

  renderGroupD() {
    const { teams } = this.context;
    const groupD = [];
    for (let i = 0; i < teams.length; i++) {
      if (teams[i].group === 'D') {
        groupD.push(teams[i]);
      }
    }
    const groupRender = groupD.map(groupList => {
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
        <a className='team-title-link mx-2' href="">
          <div className='group-wrapper d-flex justify-content-center'>
            <h2 className='group-title'>group d</h2>
          </div>
        </a>
        <div className='mx-2'>{groupRender}</div>
      </div>
    );
  }

  renderGroupE() {
    const { teams } = this.context;
    const groupE = [];
    for (let i = 0; i < teams.length; i++) {
      if (teams[i].group === 'C') {
        groupE.push(teams[i]);
      }
    }
    const groupRender = groupE.map(groupList => {
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
        <a className='team-title-link mx-2' href="">
          <div className='group-wrapper d-flex justify-content-center'>
            <h2 className='group-title'>group E</h2>
          </div>
        </a>
        <div className='mx-2'>{groupRender}</div>
      </div>
    );
  }

  renderGroupF() {
    const { teams } = this.context;
    const groupF = [];
    for (let i = 0; i < teams.length; i++) {
      if (teams[i].group === 'F') {
        groupF.push(teams[i]);
      }
    }
    const groupRender = groupF.map(groupList => {
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
        <a className='team-title-link mx-2' href="">
          <div className='group-wrapper d-flex justify-content-center'>
            <h2 className='group-title'>group F</h2>
          </div>
        </a>
        <div className='mx-2'>{groupRender}</div>
      </div>
    );
  }

  renderGroupG() {
    const { teams } = this.context;
    const groupG = [];
    for (let i = 0; i < teams.length; i++) {
      if (teams[i].group === 'G') {
        groupG.push(teams[i]);
      }
    }
    const groupRender = groupG.map(groupList => {
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
        <a className='team-title-link mx-2' href="">
          <div className='group-wrapper d-flex justify-content-center'>
            <h2 className='group-title'>group G</h2>
          </div>
        </a>
        <div className='mx-2'>{groupRender}</div>
      </div>
    );
  }

  renderGroupH() {
    const { teams } = this.context;
    const groupH = [];
    for (let i = 0; i < teams.length; i++) {
      if (teams[i].group === 'H') {
        groupH.push(teams[i]);
      }
    }
    const groupRender = groupH.map(groupList => {
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
        <a className='team-title-link mx-2' href="">
          <div className='group-wrapper d-flex justify-content-center'>
            <h2 className='group-title'>group H</h2>
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
          {this.renderGroupA()}
          {this.renderGroupB()}
        </div>
        <div className='d-md-flex justify-content-center my-4'>
          {this.renderGroupC()}
          {this.renderGroupD()}
        </div>
        <div className='d-md-flex justify-content-center my-4'>
          {this.renderGroupE()}
          {this.renderGroupF()}
        </div>
        <div className='d-md-flex justify-content-center my-4'>
          {this.renderGroupG()}
          {this.renderGroupH()}
        </div>
      </>
    );
  }
}
Teams.contextType = AppContext;
