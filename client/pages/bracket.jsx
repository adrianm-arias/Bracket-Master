import React from 'react';
import KnockoutNav from '../components/knockout-nav';
import parseRoute from '../lib/parse-route';
import AppContext from '../lib/app-context';
import RoundKo from '../components/ko-round';
import KoSwitch from '../components/ko-switch';

export default class Brackets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brackets: {
        userId: '',
        bracketName: ''
      },
      teams: [],
      confirmSave: false,
      isEditing: false,
      newBracket: false,
      toggleBracket: false,
      confirmAutomate: false,
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
      },
      knockoutStage: {
        game49: '',
        game50: '',
        game51: '',
        game52: '',
        game53: '',
        game54: '',
        game55: '',
        game56: '',
        game57: '',
        game58: '',
        game59: '',
        game60: '',
        game61: '',
        game62: '',
        game63: ''
      }
    };
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.teamSelected = this.teamSelected.bind(this);
    this.verifyCheck = this.verifyCheck.bind(this);
    this.handleGroupSave = this.handleGroupSave.bind(this);
    this.automateGroupStage = this.automateGroupStage.bind(this);
  }

  componentDidMount() {
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

    const updateKoState = JSON.parse(window.localStorage.getItem('koStage-state'));
    this.setState({
      knockoutStage: updateKoState
    });

    const route = parseRoute(window.location.hash);

    if (route.params.get('bracketId')) {
      fetch(`/api/brackets/knockout/${route.params.get('bracketId')}`)
        .then(response => response.json())
        .then(koData => {
          if (koData.length !== 0) {
            this.setState({
              knockoutStage: koData[0]
            });
          }
        })
        .catch(error => {
          console.error('error:', error);
        });
    }
  }

  handleToggleClick() {
    this.setState({
      toggleBracket: !this.state.toggleBracket
    });
  }

  teamSelected(teamId, event) {
    const koStageCopy = { ...this.state.knockoutStage };

    if (event.target.checked) {
      koStageCopy[event.target.name] = teamId;
      this.setState({
        knockoutStage: koStageCopy
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

  verifyCheck(teamId) {

    const koStage = this.state.knockoutStage;
    const route = parseRoute(window.location.hash);
    const bracketRound = route.params.get('round');

    if (bracketRound === 'roundof16') {
      return ['game49', 'game50', 'game51', 'game52', 'game53', 'game54', 'game55', 'game56'].some(property => koStage[property] === teamId);
    }
    if (bracketRound === 'quarters') {
      return ['game57', 'game58', 'game59', 'game60'].some(property => koStage[property] === teamId);
    }
    if (bracketRound === 'semis') {
      return ['game61', 'game62'].some(property => koStage[property] === teamId);
    }
    if (bracketRound === 'final') {
      return koStage.game63 === teamId;
    }
  }

  handleGroupSave() {
    const token = window.localStorage.getItem('react-jwt');

    const koStageCopy = { ...this.state.knockoutStage };
    koStageCopy.bracketId = this.state.groupStage.bracketId;
    fetch('/api/koStage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify(koStageCopy)
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

  renderFinal() {
    const { teams } = this.context;
    if (teams.length === 0) return null;

    const koStage = this.state.knockoutStage;

    return (
      <div className='d-flex flex-column align-items-center pt-4 pb-3'>
        <div className='d-flex ko-header-wrapper justify-content-end py-1'>
          <KoSwitch toggleState={this.state.toggleBracket} handleClick={this.handleToggleClick} hide='d-none' />
        </div>
        <RoundKo
          teamOne={(koStage.game61 === '') ? 'w61' : teams[koStage.game61 - 1].countryName} teamOneFlag={(koStage.game61 === '') ? null : teams[koStage.game61 - 1].countryFlag}
          teamTwo={(koStage.game62 === '') ? 'w62' : teams[koStage.game62 - 1].countryName} teamTwoFlag={(koStage.game62 === '') ? null : teams[koStage.game62 - 1].countryFlag}
          teamIdOne={(koStage.game61 === '') ? 'w61' : teams[koStage.game61 - 1].teamId}
          teamIdTwo={(koStage.game62 === '') ? 'w62' : teams[koStage.game62 - 1].teamId}
          name='game63' round='Final' teamSel={this.teamSelected} check={this.verifyCheck} editing={this.state.isEditing} toggle={this.state.toggleBracket} />
      </div>
    );
  }

  renderSemi() {
    const { teams } = this.context;
    if (teams.length === 0) return null;

    const koStage = this.state.knockoutStage;

    return (
      <div className='d-flex flex-column align-items-center pt-4 pb-3'>
        <div className='d-flex ko-header-wrapper justify-content-end py-1'>
          <KoSwitch toggleState={this.state.toggleBracket} handleClick={this.handleToggleClick} hide='d-none' />
        </div>
        <RoundKo
          teamOne={(koStage.game57 === '') ? 'w57' : teams[koStage.game57 - 1].countryName} teamOneFlag={(koStage.game57 === '') ? null : teams[koStage.game57 - 1].countryFlag}
          teamTwo={(koStage.game58 === '') ? 'w58' : teams[koStage.game58 - 1].countryName} teamTwoFlag={(koStage.game58 === '') ? null : teams[koStage.game58 - 1].countryFlag}
          teamIdOne={(koStage.game57 === '') ? 'w57' : teams[koStage.game57 - 1].teamId}
          teamIdTwo={(koStage.game58 === '') ? 'w58' : teams[koStage.game58 - 1].teamId}
          name='game61' round='Semi Finals' teamSel={this.teamSelected} check={this.verifyCheck} editing={this.state.isEditing} toggle={this.state.toggleBracket} />
        <RoundKo
          teamOne={(koStage.game59 === '') ? 'w59' : teams[koStage.game59 - 1].countryName} teamOneFlag={(koStage.game59 === '') ? null : teams[koStage.game59 - 1].countryFlag}
          teamTwo={(koStage.game60 === '') ? 'w60' : teams[koStage.game60 - 1].countryName} teamTwoFlag={(koStage.game60 === '') ? null : teams[koStage.game60 - 1].countryFlag}
          teamIdOne={(koStage.game59 === '') ? 'w59' : teams[koStage.game59 - 1].teamId}
          teamIdTwo={(koStage.game60 === '') ? 'w60' : teams[koStage.game60 - 1].teamId}
          name='game62' round='Semi Finals' teamSel={this.teamSelected} check={this.verifyCheck} editing={this.state.isEditing} toggle={this.state.toggleBracket} />
      </div>
    );
  }

  renderQuarter() {
    const { teams } = this.context;
    if (teams.length === 0) return null;

    const koStage = this.state.knockoutStage;

    // renders east bracket games
    if (!this.state.toggleBracket) {
      return (
        <div className='d-flex flex-column align-items-center pt-4 pb-3'>
          <div className='d-flex ko-header-wrapper justify-content-between py-1' key='east'>
            <KoSwitch toggleState={this.state.toggleBracket} handleClick={this.handleToggleClick} />
          </div>
          <RoundKo
            teamOne={(koStage.game49 === '') ? 'w49' : teams[koStage.game49 - 1].countryName} teamOneFlag={(koStage.game49 === '') ? null : teams[koStage.game49 - 1].countryFlag}
            teamTwo={(koStage.game50 === '') ? 'w50' : teams[koStage.game50 - 1].countryName} teamTwoFlag={(koStage.game50 === '') ? null : teams[koStage.game50 - 1].countryFlag}
            teamIdOne={(koStage.game49 === '') ? 'w49' : teams[koStage.game49 - 1].teamId}
            teamIdTwo={(koStage.game50 === '') ? 'w50' : teams[koStage.game50 - 1].teamId}
            name='game57' round='Quarter Finals' teamSel={this.teamSelected} check={this.verifyCheck} editing={this.state.isEditing} toggle={this.state.toggleBracket} />
          <RoundKo
            teamOne={(koStage.game53 === '') ? 'w53' : teams[koStage.game53 - 1].countryName} teamOneFlag={(koStage.game53 === '') ? null : teams[koStage.game53 - 1].countryFlag}
            teamTwo={(koStage.game54 === '') ? 'w54' : teams[koStage.game54 - 1].countryName} teamTwoFlag={(koStage.game54 === '') ? null : teams[koStage.game54 - 1].countryFlag}
            teamIdOne={(koStage.game53 === '') ? 'w53' : teams[koStage.game53 - 1].teamId}
            teamIdTwo={(koStage.game54 === '') ? 'w54' : teams[koStage.game54 - 1].teamId}
            name='game58' round='Quarter Finals' teamSel={this.teamSelected} check={this.verifyCheck} editing={this.state.isEditing} toggle={this.state.toggleBracket} />
        </div>
      );
    }
    // renders west bracket games
    if (this.state.toggleBracket) {
      return (
        <div className='d-flex flex-column align-items-center pt-4 pb-3' key='west'>
          <div className='d-flex ko-header-wrapper justify-content-between py-1'>
            <KoSwitch toggleState={this.state.toggleBracket} handleClick={this.handleToggleClick} />
          </div>
          <RoundKo
            teamOne={(koStage.game51 === '') ? 'w51' : teams[koStage.game51 - 1].countryName} teamOneFlag={(koStage.game51 === '') ? null : teams[koStage.game51 - 1].countryFlag}
            teamTwo={(koStage.game52 === '') ? 'w52' : teams[koStage.game52 - 1].countryName} teamTwoFlag={(koStage.game52 === '') ? null : teams[koStage.game52 - 1].countryFlag}
            teamIdOne={(koStage.game51 === '') ? 'w51' : teams[koStage.game51 - 1].teamId}
            teamIdTwo={(koStage.game52 === '') ? 'w52' : teams[koStage.game52 - 1].teamId}
            name='game59' round='Quarter Finals' teamSel={this.teamSelected} check={this.verifyCheck} editing={this.state.isEditing} toggle={this.state.toggleBracket} />
          <RoundKo
            teamOne={(koStage.game55 === '') ? 'w55' : teams[koStage.game55 - 1].countryName} teamOneFlag={(koStage.game55 === '') ? null : teams[koStage.game55 - 1].countryFlag}
            teamTwo={(koStage.game56 === '') ? 'w56' : teams[koStage.game56 - 1].countryName} teamTwoFlag={(koStage.game56 === '') ? null : teams[koStage.game56 - 1].countryFlag}
            teamIdOne={(koStage.game55 === '') ? 'w55' : teams[koStage.game55 - 1].teamId}
            teamIdTwo={(koStage.game56 === '') ? 'w56' : teams[koStage.game56 - 1].teamId}
            name='game60' round='Quarter Finals' teamSel={this.teamSelected} check={this.verifyCheck} editing={this.state.isEditing} toggle={this.state.toggleBracket} />
        </div>
      );
    }
  }

  renderSixteen() {
    const { teams } = this.context;
    if (teams.length === 0) return null;

    const groupStage = this.state.groupStage;

    // renders west bracket games
    if (!this.state.toggleBracket) {
      return (
        <div className='d-flex flex-column align-items-center pt-4 pb-5' key='east'>
          <div className='d-flex ko-header-wrapper justify-content-between py-1'>
            <KoSwitch toggleState={this.state.toggleBracket} handleClick={this.handleToggleClick} />
          </div>
          <RoundKo
            teamOne={(groupStage.a1 === '') ? 'a1' : teams[groupStage.a1 - 1].countryName} teamOneFlag={ (groupStage.a1 === '') ? null : teams[groupStage.a1 - 1].countryFlag }
            teamTwo={(groupStage.b2 === '') ? 'b2' : teams[groupStage.b2 - 1].countryName} teamTwoFlag={ (groupStage.b2 === '') ? null : teams[groupStage.b2 - 1].countryFlag }
            teamIdOne={(groupStage.a1 === '') ? 'a1' : teams[groupStage.a1 - 1].teamId}
            teamIdTwo={(groupStage.b2 === '') ? 'b2' : teams[groupStage.b2 - 1].teamId}
            name='game49' round='Round of 16' teamSel={this.teamSelected} check={this.verifyCheck} editing={this.state.isEditing} toggle={this.state.toggleBracket} />
          <RoundKo
            teamOne={(groupStage.c1 === '') ? 'c1' : teams[groupStage.c1 - 1].countryName} teamOneFlag={(groupStage.c1 === '') ? null : teams[groupStage.c1 - 1].countryFlag}
            teamTwo={(groupStage.d2 === '') ? 'd2' : teams[groupStage.d2 - 1].countryName} teamTwoFlag={(groupStage.d2 === '') ? null : teams[groupStage.d2 - 1].countryFlag}
            teamIdOne={(groupStage.c1 === '') ? 'c1' : teams[groupStage.c1 - 1].teamId}
            teamIdTwo={(groupStage.d2 === '') ? 'd2' : teams[groupStage.d2 - 1].teamId}
            name='game50' round='Round of 16' teamSel={this.teamSelected} check={this.verifyCheck} editing={this.state.isEditing} toggle={this.state.toggleBracket}/>
          <RoundKo
            teamOne={(groupStage.e1 === '') ? 'e1' : teams[groupStage.e1 - 1].countryName} teamOneFlag={(groupStage.e2 === '') ? null : teams[groupStage.e1 - 1].countryFlag}
            teamTwo={(groupStage.f2 === '') ? 'f2' : teams[groupStage.f2 - 1].countryName} teamTwoFlag={(groupStage.f2 === '') ? null : teams[groupStage.f2 - 1].countryFlag}
            teamIdOne={(groupStage.e1 === '') ? 'e1' : teams[groupStage.e1 - 1].teamId}
            teamIdTwo={(groupStage.f2 === '') ? 'f2' : teams[groupStage.f2 - 1].teamId}
            name='game53' round='Round of 16' teamSel={this.teamSelected} check={this.verifyCheck} editing={this.state.isEditing} toggle={this.state.toggleBracket}/>
          <RoundKo
            teamOne={(groupStage.g1 === '') ? 'g1' : teams[groupStage.g1 - 1].countryName} teamOneFlag={(groupStage.g1 === '') ? null : teams[groupStage.g1 - 1].countryFlag}
            teamTwo={(groupStage.h2 === '') ? 'h2' : teams[groupStage.h2 - 1].countryName} teamTwoFlag={(groupStage.h2 === '') ? null : teams[groupStage.h2 - 1].countryFlag}
            teamIdOne={(groupStage.g1 === '') ? 'g1' : teams[groupStage.g1 - 1].teamId}
            teamIdTwo={(groupStage.h2 === '') ? 'h2' : teams[groupStage.h2 - 1].teamId}
            name='game54' round='Round of 16' teamSel={this.teamSelected} check={this.verifyCheck} editing={this.state.isEditing} toggle={this.state.toggleBracket}/>
        </div>
      );
    }
    // renders east bracket games
    if (this.state.toggleBracket) {
      return (
        <div className='d-flex flex-column align-items-center pt-4 pb-5' key='west'>
          <div className='d-flex ko-header-wrapper justify-content-between py-1'>
            <KoSwitch toggleState={this.state.toggleBracket} handleClick={this.handleToggleClick} />
          </div>
          <RoundKo
            teamOne={(groupStage.d1 === '') ? 'd1' : teams[groupStage.d1 - 1].countryName} teamOneFlag={(groupStage.d1 === '') ? null : teams[groupStage.d1 - 1].countryFlag}
            teamTwo={(groupStage.c2 === '') ? 'c2' : teams[groupStage.c2 - 1].countryName} teamTwoFlag={(groupStage.c2 === '') ? null : teams[groupStage.c2 - 1].countryFlag}
            teamIdOne={(groupStage.d1 === '') ? 'd1' : teams[groupStage.d1 - 1].teamId}
            teamIdTwo={(groupStage.c2 === '') ? 'c2' : teams[groupStage.c2 - 1].teamId}
            name='game51' round='Round of 16' teamSel={this.teamSelected} check={this.verifyCheck} editing={this.state.isEditing} toggle={this.state.toggleBracket}/>
          <RoundKo
            teamOne={(groupStage.b1 === '') ? 'b1' : teams[groupStage.b1 - 1].countryName} teamOneFlag={(groupStage.b1 === '') ? null : teams[groupStage.b1 - 1].countryFlag}
            teamTwo={(groupStage.a2 === '') ? 'a2' : teams[groupStage.a2 - 1].countryName} teamTwoFlag={(groupStage.a2 === '') ? null : teams[groupStage.a2 - 1].countryFlag}
            teamIdOne={(groupStage.b1 === '') ? 'b1' : teams[groupStage.b1 - 1].teamId}
            teamIdTwo={(groupStage.a2 === '') ? 'a2' : teams[groupStage.a2 - 1].teamId}
            name='game52' round='Round of 16' teamSel={this.teamSelected} check={this.verifyCheck} editing={this.state.isEditing} toggle={this.state.toggleBracket}/>
          <RoundKo
            teamOne={(groupStage.f1 === '') ? 'f1' : teams[groupStage.f1 - 1].countryName} teamOneFlag={(groupStage.f1 === '') ? null : teams[groupStage.f1 - 1].countryFlag}
            teamTwo={(groupStage.e2 === '') ? 'e2' : teams[groupStage.e2 - 1].countryName} teamTwoFlag={(groupStage.e2 === '') ? null : teams[groupStage.e2 - 1].countryFlag}
            teamIdOne={(groupStage.f1 === '') ? 'f1' : teams[groupStage.f1 - 1].teamId}
            teamIdTwo={(groupStage.e2 === '') ? 'e2' : teams[groupStage.e2 - 1].teamId}
            name='game55' round='Round of 16' teamSel={this.teamSelected} check={this.verifyCheck} editing={this.state.isEditing} toggle={this.state.toggleBracket}/>
          <RoundKo
            teamOne={(groupStage.h1 === '') ? 'h1' : teams[groupStage.h1 - 1].countryName} teamOneFlag={(groupStage.h1 === '') ? null : teams[groupStage.h1 - 1].countryFlag}
            teamTwo={(groupStage.g2 === '') ? 'g2' : teams[groupStage.g2 - 1].countryName} teamTwoFlag={(groupStage.g2 === '') ? null : teams[groupStage.g2 - 1].countryFlag}
            teamIdOne={(groupStage.h1 === '') ? 'h1' : teams[groupStage.h1 - 1].teamId}
            teamIdTwo={(groupStage.g2 === '') ? 'g2' : teams[groupStage.g2 - 1].teamId}
            name='game56' round='Round of 16' teamSel={this.teamSelected} check={this.verifyCheck} editing={this.state.isEditing} toggle={this.state.toggleBracket}/>
        </div>
      );
    }
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
              },
              knockoutStage: {
                game49: '',
                game50: '',
                game51: '',
                game52: '',
                game53: '',
                game54: '',
                game55: '',
                game56: '',
                game57: '',
                game58: '',
                game59: '',
                game60: '',
                game61: '',
                game62: '',
                game63: ''
              }
            })}
              className='bi bi-dash-circle-fill editing-icons px-3' />
          </button>
        </div>
      </div>
    );
  }

  automateGroupStage() {
    // console.log('automate modal works');
    this.setState({
      isEditing: true
    });
  }

  confirmAutomate() {

    return (
      <div className="modal" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Are you sure you want to automate Group Stage predictions?</h1>
              <div className="d-flex justify-content-center pt-5">
                <button type="button" className="btn btn-secondary mx-3" data-bs-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-primary mx-3" onClick={() => this.automateGroupStage}>Yes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidUpdate() {
    localStorage.setItem('editing-state', JSON.stringify(this.state.isEditing));
    localStorage.setItem('brackets-state', JSON.stringify(this.state.brackets));
    localStorage.setItem('groupStage-state', JSON.stringify(this.state.groupStage));
    localStorage.setItem('koStage-state', JSON.stringify(this.state.knockoutStage));
  }

  renderPage() {
    const route = parseRoute(window.location.hash);
    const bracketRound = route.params.get('round');
    if (bracketRound === 'roundof16') {
      return (
        this.renderSixteen()
      );
    }
    if (bracketRound === 'quarters') {
      return (
        this.renderQuarter()
      );
    }
    if (bracketRound === 'semis') {
      return (
        this.renderSemi()
      );
    }
    if (bracketRound === 'final') {
      return (
        this.renderFinal()
      );
    }
  }

  render() {

    return (
      <>
        <div className='second-nav-bg d-flex justify-content-center'>
          <KnockoutNav />
        </div>
        { this.renderPage() }
        {(!this.state.isEditing)
          ? null
          : <div className='fixed-bottom'>
            {this.handleEditing()}
          </div>
        }
        {(this.state.confirmAutomate)
          ? null
          : <this.confirmAutomate />
        }
      </>
    );
  }
}
Brackets.contextType = AppContext;
