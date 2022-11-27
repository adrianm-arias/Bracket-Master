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

    // const { user } = this.context;
    // const route = parseRoute(window.location.hash);

    // if (route.params.get('bracketId')) {
    //   fetch(`/api/brackets/groups/${route.params.get('bracketId')}`)
    //     .then(response => response.json())
    //     .then(groupData => {
    //       this.setState({
    //         brackets: {
    //           userId: user.userId,
    //           bracketName: route.params.get('bracketName')
    //         },
    //         isEditing: true,
    //         groupStage: groupData[0],
    //         groupCount: 2
    //       });
    //     })
    //     .catch(error => {
    //       console.error('error:', error);
    //     });
    // }
  }

  handleToggleClick() {
    this.setState({
      toggleBracket: !this.state.toggleBracket
    });
  }

  teamSelected(event) {
    const koStageCopy = { ...this.state.knockoutStage };

    if (event.target.checked) {
      for (const property in koStageCopy) {
        if (property === event.target.name) {
          koStageCopy[property] = event.target.id;
        }
      }
      this.setState({
        knockoutStage: koStageCopy
      });
    }
  }

  verifyCheck(teamId) {
    const koStage = this.state.knockoutStage;

    for (const property in koStage) {
      if (koStage[property] === teamId) {
        return true;
      }
    }
  }

  // renderTeamSelections() {
  //   const teams = this.state.teams;
  //   const groupStage = this.state.groupStage;

  //   for (const property in groupStage) {
  //     if (groupStage[property] === teamId) {
  //       console.log();
  //       // return true;
  //     }
  //   }
  // }

  renderFinal() {

    return (
      <div className='d-flex flex-column align-items-center pt-4 pb-3'>
        <div className='d-flex ko-header-wrapper justify-content-end py-1'>
          <KoSwitch toggleState={this.state.toggleBracket} handleClick={this.handleToggleClick} hide='d-none' />
        </div>
        <RoundKo teamOne='w61' teamTwo='w62' name='game63' round='Final' toggle={this.state.toggleBracket} teamSel={this.teamSelected} check={this.verifyCheck} />
      </div>
    );
  }

  renderSemi() {

    return (
      <div className='d-flex flex-column align-items-center pt-4 pb-3'>
        <div className='d-flex ko-header-wrapper justify-content-end py-1'>
          <KoSwitch toggleState={this.state.toggleBracket} handleClick={this.handleToggleClick} hide='d-none' />
        </div>
        <RoundKo teamOne='w57' teamTwo='w58' name='game61' round='Semi Finals' toggle={this.state.toggleBracket} teamSel={this.teamSelected} check={this.verifyCheck} />
        <RoundKo teamOne='w59' teamTwo='w60' name='game62' round='Semi Finals' toggle={this.state.toggleBracket} teamSel={this.teamSelected} check={this.verifyCheck} />
      </div>
    );
  }

  renderQuarter() {
    // renders east bracket games
    if (!this.state.toggleBracket) {
      return (
        <div className='d-flex flex-column align-items-center pt-4 pb-3'>
          <div className='d-flex ko-header-wrapper justify-content-between py-1' key='east'>
            <KoSwitch toggleState={this.state.toggleBracket} handleClick={this.handleToggleClick} />
          </div>
          <RoundKo teamOne='w49' teamTwo='w50' name='game57' round='Quarter Finals' toggle={this.state.toggleBracket} teamSel={this.teamSelected} check={this.verifyCheck} />
          <RoundKo teamOne='w53' teamTwo='w54' name='game58' round='Quarter Finals' toggle={this.state.toggleBracket} teamSel={this.teamSelected} check={this.verifyCheck} />
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
          <RoundKo teamOne='w51' teamTwo='w52' name='game59' round='Quarter Finals' toggle={this.state.toggleBracket} teamSel={this.teamSelected} check={this.verifyCheck} />
          <RoundKo teamOne='w55' teamTwo='w56' name='game60' round='Quarter Finals' toggle={this.state.toggleBracket} teamSel={this.teamSelected} check={this.verifyCheck} />
        </div>
      );
    }
  }

  renderSixteen() {
    const { teams } = this.context;

    // const { teams } = this.state.teams[0];
    // console.log('renderGroup:', group[0]);
    // console.log('contextRender:', teams[16].coach);
    // renders east bracket games
    if (!this.state.toggleBracket) {
      return (
        <div className='d-flex flex-column align-items-center pt-4 pb-3' key='east'>
          <div className='d-flex ko-header-wrapper justify-content-between py-1'>
            <KoSwitch toggleState={this.state.toggleBracket} handleClick={this.handleToggleClick} />
          </div>
          <RoundKo teamOne='a1' teamTwo='b2' name='game49' round='Round of 16' teamSel={this.teamSelected} check={this.verifyCheck} editing={this.state.isEditing} teamRender={teams}/>
          <RoundKo teamOne='c1' teamTwo='d2' name='game50' round='Round of 16' teamSel={this.teamSelected} check={this.verifyCheck} editing={this.state.isEditing}/>
          <RoundKo teamOne='e1' teamTwo='f2' name='game53' round='Round of 16' teamSel={this.teamSelected} check={this.verifyCheck} editing={this.state.isEditing}/>
          <RoundKo teamOne='g1' teamTwo='h2' name='game54' round='Round of 16' teamSel={this.teamSelected} check={this.verifyCheck} editing={this.state.isEditing}/>
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
          <RoundKo teamOne='d1' teamTwo='c2' name='game51' round='Round of 16' teamSel={this.teamSelected} check={this.verifyCheck} editing={this.state.isEditing}/>
          <RoundKo teamOne='b1' teamTwo='a2' name='game52' round='Round of 16' teamSel={this.teamSelected} check={this.verifyCheck} editing={this.state.isEditing}/>
          <RoundKo teamOne='f1' teamTwo='e2' name='game55' round='Round of 16' teamSel={this.teamSelected} check={this.verifyCheck} editing={this.state.isEditing}/>
          <RoundKo teamOne='h1' teamTwo='g2' name='game56' round='Round of 16' teamSel={this.teamSelected} check={this.verifyCheck} editing={this.state.isEditing}/>
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
      </>
    );
  }
}
Brackets.contextType = AppContext;
