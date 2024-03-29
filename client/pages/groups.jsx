import React from 'react';
import parseRoute from '../lib/parse-route';
import GroupsNav from '../components/groups-nav';
import AppContext from '../lib/app-context';

export default class Groups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brackets: {
        userId: '',
        bracketName: ''
      },
      teams: [],
      route: parseRoute(window.location.hash),
      confirmSave: false,
      isShowingAlert: false,
      groupCount: 0,
      isEditing: false,
      newBracket: false,
      groupStage: {
        a1: '',
        a2: '',
        b1: '',
        b2: '',
        c1: '',
        c2: '',
        d1: '',
        d2: '',
        e1: '',
        e2: '',
        f1: '',
        f2: '',
        g1: '',
        g2: '',
        h1: '',
        h2: ''
      }
    };
    this.handleGroupSave = this.handleGroupSave.bind(this);
  }

  componentDidMount() {

    window.addEventListener('hashchange', event => {
      const newRoute = parseRoute(window.location.hash);
      this.setState({
        route: newRoute
      });

      if (this.state.isEditing) {
        const groupTarget = newRoute.params.get('group');
        const groupStage = this.state.groupStage;
        let count = 0;
        for (const property in groupStage) {
          if (property.startsWith(`${groupTarget}`) && groupStage[property] !== '' && property.length < 3) {
            count += 1;
          }
        }
        this.setState({
          groupCount: count
        });
      }

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

    if (this.state.isEditing) {
      const updateEditState = JSON.parse(window.localStorage.getItem('editing-state'));
      this.setState({
        isEditing: updateEditState
      });
      const updateBracketState = JSON.parse(window.localStorage.getItem('brackets-state'));
      this.setState({
        brackets: updateBracketState
      });
      const updateGroupsState = JSON.parse(window.localStorage.getItem('groupStage-state'));
      this.setState({
        groupStage: updateGroupsState
      });
      const updateNewBracketState = JSON.parse(window.localStorage.getItem('newBracket-state'));
      this.setState({
        newBracket: updateNewBracketState
      });
      const updateGroupCount = JSON.parse(window.localStorage.getItem('groupCount-state'));
      this.setState({
        groupCount: updateGroupCount
      });
    }

    const { user } = this.context;
    const route = this.state.route;

    if (route.params.get('bracketId')) {
      fetch(`/api/brackets/groups/${route.params.get('bracketId')}`)
        .then(response => response.json())
        .then(groupData => {
          this.setState({
            brackets: {
              userId: user.userId,
              bracketName: route.params.get('bracketName')
            },
            isEditing: true,
            groupStage: groupData[0],
            groupCount: 2
          });
        })
        .catch(error => {
          console.error('error:', error);
        });
    }
  }

  handleGroupSave() {
    const token = window.localStorage.getItem('react-jwt');

    if (this.state.newBracket) {
      fetch('/api/brackets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify(this.state.brackets)
      })
        .then(res => res.json())
        .then(result => {
          const groupStageCopy = { ...this.state.groupStage };
          groupStageCopy.bracketId = result.bracketId;
          this.setState({
            groupStage: groupStageCopy
          });
          fetch('/api/groups', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': token
            },
            body: JSON.stringify(groupStageCopy)
          })
            .then(res => res.json())
            .then(result => {
              this.setState({
                confirmSave: true
              });
              setTimeout(() => {
                this.setState({
                  confirmSave: false
                });
              }, 5000);
            });
        })
        .catch(error => {
          console.error('error:', error);
        });
    } else {

      const groupStage = this.state.groupStage;

      fetch(`/api/groups/${groupStage.groupStageId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify(groupStage)
      })
        .then(res => res.json())
        .then(result => {
          this.setState({
            confirmSave: true
          });
          setTimeout(() => {
            this.setState({
              confirmSave: false
            });
          }, 5000);
        })
        .catch(error => {
          console.error('error:', error);
        });
    }
  }

  confirmSaveAlert() {
    return (
      <div className='d-flex justify-content-center'>
        <div className='alert alert-success alert-dismissible fade show  mt-3' role='alert'>
          <strong>Predictions Saved</strong>
          <button type='button' className='btn-close' data-bs-dismiss='alert' aria-label='Close' />
        </div>
      </div>
    );
  }

  teamSelected(teamId, event) {
    const groupStageCopy = { ...this.state.groupStage };

    const { route } = this.state;
    const groupTarget = route.params.get('group');

    if (event.target.checked) {
      // checks is max group selection is reached
      if (this.state.groupCount === 2) {
        this.setState({
          isShowingAlert: true
        });
        setTimeout(() => {
          this.setState({
            isShowingAlert: false
          });
        }, 6000);
        event.target.checked = false;
        return;
      }
      // loops through groupStage object looking for next available empty property
      for (const property in groupStageCopy) {
        if (groupStageCopy[property] === '' && property.startsWith(`${groupTarget}`) && property.length < 3) {
          groupStageCopy[property] = teamId;
          break;
        }
      }
      this.setState({
        groupStage: groupStageCopy,
        groupCount: this.state.groupCount + 1
      });
      // loops through groupStage object looking for a matching teamId to remove from current property
    } else {

      for (const property in groupStageCopy) {
        if (groupStageCopy[property] === teamId && property.length < 3) {
          groupStageCopy[property] = '';
          break;
        }
      }
      this.setState({
        groupStage: groupStageCopy,
        groupCount: this.state.groupCount - 1
      });
    }
  }

  maxSelectAlert() {
    return (
      <div className='d-flex justify-content-center'>
        <div className='alert alert-warning alert-dismissible fade show alert-window mt-3' role='alert'>
          <strong>Only select 2 teams per group</strong>
          <button type='button' className='btn-close' data-bs-dismiss='alert' aria-label='Close' />
        </div>
      </div>
    );
  }

  verifyCheck(teamId) {
    const groupStage = this.state.groupStage;

    for (const property in groupStage) {
      if (groupStage[property] === teamId) {
        if (property.length < 3) {
          return true;
        }
      }
    }
    return false;
  }

  renderTeams(letter) {
    const teams = this.state.teams;
    // checks which group needs to be rendered
    const group = [];
    for (let i = 0; i < teams.length; i++) {
      if (teams[i].group === letter) {
        group.push(teams[i]);
      }
    }

    // Render the team info
    const groupRender = group.map(groupList => {
      const StringId = groupList.teamId.toString();
      return (
        (this.state.isEditing)
          ? <div className='team-wrapper-edit selected my-2 mx-auto d-flex justify-content-start' onChange={event => this.teamSelected(groupList.teamId, event)} key={groupList.teamId}>
            <input className='checkbox' type='checkbox' id={groupList.teamId} name={groupList.countryName} defaultChecked={this.verifyCheck(groupList.teamId)} />
            <label className='d-flex group-selection-box' htmlFor={groupList.teamId}>
              <img className='team-flag me-4' src={groupList.countryFlag} alt={`${groupList.countryFlag}-flag`} />
              <h1 className='team-name'>{groupList.countryName}</h1>
            </label>
          </div>
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
                  <p className='fs-5'>Coach: <span className='fw-semibold'>{groupList.coach}</span></p>
                  <p className='fs-5'>Rank: <span className='fw-semibold'>{groupList.fifaRank}</span></p>
                  <p className='fs-5'>Last 5 Games:</p>
                  <div className='d-flex flex-row mb-4'>
                    <div className={`${groupList.fifthGame} match-icon d-flex justify-content-center align-items-center`}>
                      <p className='fs-6 match-icon-text'>{groupList.fifthGame}</p>
                    </div>
                    <div className={`${groupList.fourthGame} match-icon d-flex justify-content-center align-items-center`}>
                      <p className='fs-6 match-icon-text'>{groupList.fourthGame}</p>
                    </div>
                    <div className={`${groupList.thirdGame} match-icon d-flex justify-content-center align-items-center`}>
                      <p className='fs-6 match-icon-text'>{groupList.thirdGame}</p>
                    </div>
                    <div className={`${groupList.secondGame} match-icon d-flex justify-content-center align-items-center`}>
                      <p className='fs-6 match-icon-text'>{groupList.secondGame}</p>
                    </div>
                    <div className={`${groupList.firstGame} match-icon d-flex justify-content-center align-items-center`}>
                      <p className='fs-6 match-icon-text'>{groupList.firstGame}</p>
                    </div>
                  </div>
                  <p className='fs-5'>2018 World Cup Finish: <span className='fw-semibold'>{groupList.prevWC}</span></p>
                  <a className='fs-5 fw-semibold fa-link' target='_blank' rel='noreferrer' href={groupList.websiteLink}>Visit Football Association Website <i className='bi bi-chevron-right' />
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
          <p className=''>Currently Editing: <span className='editing-wrapper-title'>{this.state.brackets.bracketName}</span></p>
        </div>
        <div className='mt-1 d-flex'>
          <button className='empty-btn'>
            <i className='bi bi-check-circle-fill editing-icons px-3' onClick={this.handleGroupSave} />
          </button>
          <button className='empty-btn'>
            <i onClick={() => this.setState({
              isEditing: false,
              newBracket: false,
              groupCount: 0,
              brackets: {
                userId: '',
                bracketName: ''
              },
              groupStage: {
                a1: '',
                a2: '',
                b1: '',
                b2: '',
                c1: '',
                c2: '',
                d1: '',
                d2: '',
                e1: '',
                e2: '',
                f1: '',
                f2: '',
                g1: '',
                g2: '',
                h1: '',
                h2: ''
              }
            })}
              className='bi bi-dash-circle-fill editing-icons px-3' />
          </button>
        </div>
      </div>
    );
  }

  // checks hash routing and loads correct page
  renderGroup() {
    const { route } = this.state;
    if (route.params.get('group') === 'a') {
      return 'A';
    }
    if (route.params.get('group') === 'b') {
      return 'B';
    }
    if (route.params.get('group') === 'c') {
      return 'C';
    }
    if (route.params.get('group') === 'd') {
      return 'D';
    }
    if (route.params.get('group') === 'e') {
      return 'E';
    }
    if (route.params.get('group') === 'f') {
      return 'F';
    }
    if (route.params.get('group') === 'g') {
      return 'G';
    }
    if (route.params.get('group') === 'h') {
      return 'H';
    }
  }

  componentDidUpdate() {
    localStorage.setItem('editing-state', JSON.stringify(this.state.isEditing));
    localStorage.setItem('brackets-state', JSON.stringify(this.state.brackets));
    localStorage.setItem('groupStage-state', JSON.stringify(this.state.groupStage));
    localStorage.setItem('newBracket-state', JSON.stringify(this.state.newBracket));
    localStorage.setItem('groupCount-state', JSON.stringify(this.state.groupCount));
  }

  render() {
    const { user, myBrackets } = this.context;

    const alternateButtonText = (!user) ? 'Login to start a new prediction' : 'Start a new prediction';
    const alternateButtonAction = (!user)
      ? () => { window.location.hash = 'sign-in'; }
      : () => {
          this.setState({
            isEditing: true,
            newBracket: true,
            brackets: {
              userId: user.userId,
              bracketName: 'New Bracket'
            }
          });
          window.location.hash = 'groups?group=a';
        };

    const groupClicked = this.renderGroup();
    return (
      <>
        <div className='second-nav-bg d-flex justify-content-center'>
          <GroupsNav />
        </div>
        <div className='mt-4 pt-4'>
          <h1 className='pt-teams text-center mx-auto mb-2 page-title'>{`Group ${groupClicked}`}</h1>
          <div className='d-flex justify-content-center my-4'>
            {this.renderTeams(groupClicked)}
          </div>
        </div>
        {(!this.state.isEditing)
          ? <div className='d-flex flex-md-row flex-column align-items-center justify-content-center'>
            <button onClick={alternateButtonAction}
              className='btn btn-primary prediction-btn mx-2 my-2'>{alternateButtonText}</button>
            {(myBrackets.length !== 0)
              ? <button className='btn btn-primary prediction-btn mx-2 my-2' onClick={() => { window.location.hash = ''; }}>Edit Previous Prediction</button>
              : null
            }
          </div>
          : <div className='fixed-bottom'>
            {this.handleEditing()}
          </div>
        }
        {(!this.state.isShowingAlert)
          ? null
          : <this.maxSelectAlert />
        }
        {(!this.state.confirmSave)
          ? null
          : <this.confirmSaveAlert />
        }
      </>
    );
  }
}
Groups.contextType = AppContext;
