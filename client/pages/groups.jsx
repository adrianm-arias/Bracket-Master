import React from 'react';
import parseRoute from '../lib/parse-route';
import GroupsNav from '../components/second-nav';
import AppContext from '../lib/app-context';
// import Modal from '../components/modal';

export default class Groups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
      isEditing: false,
      teamId: 1,
      groupStage: [
        {
          a1: null
        }
      ]
    };
  }

  renderTeams(letter) {
    const { teams } = this.context;

    // checks which group needs to be rendered
    const group = [];
    for (let i = 0; i < teams.length; i++) {
      if (teams[i].group === letter) {
        group.push(teams[i]);
      }
    }
    // Render the team info
    const groupRender = group.map(groupList => {
      const teamId = groupList.teamId - 1;
      const StringId = teamId.toString();
      return (
        (this.state.isEditing)
          ? <button type="button" className='empty-btn' key={groupList.teamId} onClick={() => this.setState({ groupStage: [{ a1: groupList.teamId }] })} >
            <div className='team-wrapper selected my-1 mx-auto d-flex justify-content-start'>
              <img className='team-flag me-4' src={groupList.countryFlag} alt={`${groupList.countryFlag}-flag`} />
              <h1 className='team-name'>{groupList.countryName}</h1>
            </div>
          </button>
          : <div className='accordion accordion-flush' id='accordionFlushExample' key={groupList.teamId}>
            <div className='accordion-item'>
              <h2 className='accordion-header' id={`flush-heading-${StringId}`}>
                <button className='empty-btn collapsed' type='button' data-bs-toggle='collapse' data-bs-target={`#collapse-${StringId}`} aria-expanded='false' aria-controls={`collapse-${StringId}`}>
                  <div className='team-wrapper my-1 mx-auto d-flex justify-content-start'>
                    <img className='team-flag me-4' src={groupList.countryFlag} alt={`${groupList.countryName} Flag`} />
                    <h1 className='team-name'>{groupList.countryName}</h1>
                  </div>
                </button>
              </h2>
              <div id={`collapse-${StringId}`} className='accordion-collapse collapse' aria-labelledby={`flush-heading-${StringId}`} >
                <div className='accordion-body'>
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
                  <a className='fs-5 fw-semibold fa-link' target='_blank' rel='noreferrer' href={teams[teamId].websiteLink}>Visit Football Association Website <i className='bi bi-chevron-right' />
                  </a>
                </div>
              </div>
            </div>
          </div>
      );
    });
    return (
      <div className='mx-2'>{groupRender}</div>
    );
  }

  handleEditing() {
    return (
      <div className='editing-wrapper d-flex justify-content-between'>
        <div className='mt-2'>
          <p className=''>Currently Editing: <span className='editing-wrapper-title'>Bracket 1</span></p>
        </div>
        <div className='mt-1 d-flex'>
          <button className='empty-btn'>
            <i className='bi bi-check-circle-fill editing-icons px-3' />
          </button>
          <button className='empty-btn'>
            <i onClick={() => this.setState({ isEditing: null })} className='bi bi-dash-circle-fill editing-icons px-3' />
          </button>
        </div>
      </div>
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
    // const { teams } = this.context;
    // console.log('groups render:', teams);
    // console.log('groups render:', this.state.groupStage[0]);
    // console.log('isEditing State:', this.state.isEditing);
    const groupClicked = this.renderGroup();
    return (
      <>
        {/* {this.state.openModal && this.handleModal()} */}
        <div className='second-nav-bg d-flex justify-content-center'>
          <GroupsNav />
        </div>
        <div className='mt-5 pt-5'>
          <h1 className='pt-teams[teamId] text-center mx-auto mb-2 page-title'>{`Group ${groupClicked}`}</h1>
          <div className='d-flex justify-content-center my-4'>
            {this.renderTeams(groupClicked)}
          </div>
        </div>
        {(!this.state.isEditing)
          ? <div className='d-flex justify-content-center'>
            <button onClick={() => this.setState({ isEditing: [] })} className='btn btn-primary'>Start New Prediction</button>
          </div>
          : null
        }
        <div className='fixed-bottom'>
          { this.state.isEditing && this.handleEditing()}
        </div>
      </>
    );
  }
}
Groups.contextType = AppContext;
