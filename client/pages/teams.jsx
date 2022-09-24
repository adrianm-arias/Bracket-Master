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
      const teamId = groupList.teamId - 1;
      const StringId = teamId.toString();
      return (
        <div className="accordion accordion-flush" id="accordionFlushExample" key={groupList.teamId}>
          <div className="accordion-item">
            <h2 className="accordion-header" id={`heading${StringId}`}>
              <button className="empty-btn" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${StringId}`} aria-expanded="true" aria-controls={`collapse-${StringId}`}>
                <div className='team-wrapper my-1 mx-auto d-flex justify-content-start'>
                  <img className='team-flag me-4' src={groupList.countryFlag} alt="" />
                  <h1 className='team-name'>{groupList.countryName}</h1>
                </div>
              </button>
            </h2>
            <div id={`collapse-${StringId}`} className="accordion-collapse collapse" aria-labelledby={`heading-${StringId}`} data-bs-parent="#accordionFlushExample">
              <div className="accordion-body">
                <p className='fs-5'>Coach: <span className='fw-semibold'>{teams[teamId].coach}</span></p>
                <p className='fs-5'>Rank: <span className='fw-semibold'>{teams[teamId].fifaRank}</span></p>
                <p className='fs-5'>Last 5 Games:</p>
                <div className='d-flex flex-row mb-4'>
                  <div className={`${teams[teamId].fifthGame} match-icon d-flex justify-content-center align-items-center`}>
                    <p className='fs-6 match-icon-text'>{teams[teamId].fifthGame}</p>
                  </div>
                  <div className={`${teams[teamId].fourthGame} match-icon d-flex justify-content-center align-items-center`}>
                    <p className='fs-6 match-icon-text'>{teams[teamId].fourthGame}</p>
                  </div>
                  <div className={`${teams[teamId].thirdGame} match-icon d-flex justify-content-center align-items-center`}>
                    <p className='fs-6 match-icon-text'>{teams[teamId].thirdGame}</p>
                  </div>
                  <div className={`${teams[teamId].secondGame} match-icon d-flex justify-content-center align-items-center`}>
                    <p className='fs-6 match-icon-text'>{teams[teamId].secondGame}</p>
                  </div>
                  <div className={`${teams[teamId].firstGame} match-icon d-flex justify-content-center align-items-center`}>
                    <p className='fs-6 match-icon-text'>{teams[teamId].firstGame}</p>
                  </div>
                </div>
                <p className='fs-5'>2018 World Cup Finish: <span className='fw-semibold'>{teams[teamId].prevWC}</span></p>
                <a className='fs-5 fw-semibold fa-link' target="_blank" rel="noreferrer" href={teams[teamId].websiteLink}>Visit Football Association Website <i className="bi bi-chevron-right" />
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className='d-flex flex-column align-items-center'>
        <a className='team-title-link d-flex justify-content-start' href={`#groups?group=${letter}`}>
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
        <div className='d-lg-flex justify-content-center my-4'>
          {this.renderGroup('A')}
          {this.renderGroup('B')}
        </div>
        <div className='d-lg-flex justify-content-center my-4'>
          {this.renderGroup('C')}
          {this.renderGroup('D')}
        </div>
        <div className='d-lg-flex justify-content-center my-4'>
          {this.renderGroup('E')}
          {this.renderGroup('F')}
        </div>
        <div className='d-lg-flex justify-content-center my-4'>
          {this.renderGroup('G')}
          {this.renderGroup('H')}
        </div>
      </>
    );
  }
}
Teams.contextType = AppContext;
