import React from 'react';
import KnockoutNav from '../components/knockout-nav';
import parseRoute from '../lib/parse-route';
import AppContext from '../lib/app-context';
import RoundKo from '../components/ko-round-ko';

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
      }
    };
    this.handleToggleClick = this.handleToggleClick.bind(this);
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

    const { user } = this.context;
    const route = parseRoute(window.location.hash);

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

  handleToggleClick() {
    this.setState({
      toggleBracket: !this.state.toggleBracket
    });
  }

  renderFinal() {

    return (
      <div className='d-flex flex-column align-items-center pt-5'>
        <div className='d-flex ko-header-wrapper justify-content-end'>
          <div>
            <i className="bi bi-plus-circle px-2 ko-icons" />
            <i className="bi bi-shuffle px-2  ko-icons" />
          </div>
        </div>
        <RoundKo teamOne='w61' teamTwo='w62' name='game63' round='Final' toggle={this.state.toggleBracket} />
      </div>
    );
  }

  renderSemi() {

    return (
      <div className='d-flex flex-column align-items-center pt-5'>
        <div className='d-flex ko-header-wrapper justify-content-end'>
          <div>
            <i className="bi bi-plus-circle px-2 ko-icons" />
            <i className="bi bi-shuffle px-2  ko-icons" />
          </div>
        </div>
        <RoundKo teamOne='w57' teamTwo='w58' name='game61' round='Semi Finals' toggle={this.state.toggleBracket} />
        <RoundKo teamOne='w59' teamTwo='w60' name='game62' round='Semi Finals' toggle={this.state.toggleBracket} />
      </div>
    );
  }

  renderQuarter() {
    // renders east bracket games
    if (!this.state.toggleBracket) {
      return (
        <div className='d-flex flex-column align-items-center pt-5'>
          <div className='d-flex ko-header-wrapper justify-content-between'>
            <div className='div-switch'>
              <button
                className={`btn-switch ko-east ${!this.state.toggleBracket ? 'switch-on' : 'switch-off'}`}
                onClick={this.handleToggleClick}>EAST</button>
              <button
                className={`btn-switch ko-west ${!this.state.toggleBracket ? 'switch-off' : 'switch-on'}`}
                onClick={this.handleToggleClick}>WEST</button>
            </div>
            <div>
              <i className="bi bi-plus-circle px-2 ko-icons" />
              <i className="bi bi-shuffle px-2  ko-icons" />
            </div>
          </div>
          <RoundKo teamOne='w49' teamTwo='w50' name='game57' round='Quarter Finals' toggle={this.state.toggleBracket} />
          <RoundKo teamOne='w53' teamTwo='w54' name='game58' round='Quarter Finals' toggle={this.state.toggleBracket} />
        </div>
      );
    }
    // renders west bracket games
    if (this.state.toggleBracket) {
      return (
        <div className='d-flex flex-column align-items-center pt-5'>
          <div className='d-flex ko-header-wrapper justify-content-between'>
            <div className='div-switch'>
              <button
                className={`btn-switch ko-east ${!this.state.toggleBracket ? 'switch-on' : 'switch-off'}`}
                onClick={this.handleToggleClick}>EAST</button>
              <button
                className={`btn-switch ko-west ${!this.state.toggleBracket ? 'switch-off' : 'switch-on'}`}
                onClick={this.handleToggleClick}>WEST</button>
            </div>
            <div>
              <i className="bi bi-plus-circle px-2 ko-icons" />
              <i className="bi bi-shuffle px-2  ko-icons" />
            </div>
          </div>
          <RoundKo teamOne='w51' teamTwo='w52' name='game59' round='Quarter Finals' toggle={this.state.toggleBracket} />
          <RoundKo teamOne='w55' teamTwo='w56' name='game60' round='Quarter Finals' toggle={this.state.toggleBracket} />
        </div>
      );
    }
  }

  renderSixteen() {
    // renders east bracket games
    if (!this.state.toggleBracket) {
      return (
        <div className='d-flex flex-column align-items-center pt-5'>
          <div className='d-flex ko-header-wrapper justify-content-between'>
            <div className='div-switch'>
              <button
                className={`btn-switch ko-east ${!this.state.toggleBracket ? 'switch-on' : 'switch-off'}`}
                  onClick={this.handleToggleClick}>EAST</button>
              <button
                className={`btn-switch ko-west ${!this.state.toggleBracket ? 'switch-off' : 'switch-on'}`}
                onClick={this.handleToggleClick}>WEST</button>
            </div>
            <div>
              <i className="bi bi-plus-circle px-2 ko-icons" />
              <i className="bi bi-shuffle px-2  ko-icons" />
            </div>
          </div>
          <RoundKo teamOne='a1' teamTwo='b2' name='game49' round='Round of 16' toggle={this.state.toggleBracket}/>
          <RoundKo teamOne='c1' teamTwo='d2' name='game50' round='Round of 16' toggle={this.state.toggleBracket}/>
          <RoundKo teamOne='e1' teamTwo='f2' name='game51' round='Round of 16' toggle={this.state.toggleBracket}/>
          <RoundKo teamOne='g1' teamTwo='h2' name='game52' round='Round of 16' toggle={this.state.toggleBracket} />
        </div>
      );
    }
    // renders west bracket games
    if (this.state.toggleBracket) {
      return (
        <div className='d-flex flex-column align-items-center pt-5'>
          <div className='d-flex ko-header-wrapper justify-content-between'>
            <div className='div-switch'>
              <button
                className={`btn-switch ko-east ${!this.state.toggleBracket ? 'switch-on' : 'switch-off'}`}
                onClick={this.handleToggleClick}>EAST</button>
              <button
                className={`btn-switch ko-west ${!this.state.toggleBracket ? 'switch-off' : 'switch-on'}`}
                onClick={this.handleToggleClick}>WEST</button>
            </div>
            <div>
              <i className="bi bi-plus-circle px-2 ko-icons" />
              <i className="bi bi-shuffle px-2  ko-icons" />
            </div>
          </div>
          <RoundKo teamOne='d1' teamTwo='c2' name='game51' round='Round of 16' toggle={this.state.toggleBracket} />
          <RoundKo teamOne='b1' teamTwo='a2' name='game52' round='Round of 16' toggle={this.state.toggleBracket} />
          <RoundKo teamOne='f1' teamTwo='e2' name='game55' round='Round of 16' toggle={this.state.toggleBracket} />
          <RoundKo teamOne='h1' teamTwo='g2' name='game56' round='Round of 16' toggle={this.state.toggleBracket} />
        </div>
      );
    }
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
      </>
    );
  }
}
Brackets.contextType = AppContext;
