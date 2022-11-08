import React from 'react';
import KnockoutNav from '../components/knockout-nav';
import parseRoute from '../lib/parse-route';
import AppContext from '../lib/app-context';

export default class Brackets extends React.Component {
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
    this.renderSixteen = this.renderSixteen.bind(this);
    this.renderSemi = this.renderSemi.bind(this);
    this.renderFinal = this.renderFinal.bind(this);
    this.renderQuarter = this.renderQuarter.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);

  }

  componentDidMount() {

    window.addEventListener('hashchange', event => {
      const newRoute = parseRoute(window.location.hash);
      this.setState({
        route: newRoute
      });
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
        <div className='bg-knockout my-2'>
          <div>
            <h1 className='knockout-round-title text-center'>Final</h1>
          </div>
          <div className='d-flex flex-column mb-2'>
            <input type="radio" id="w61" name="game63" value="name" />
            <label htmlFor="w61" className='knockout-selection-box'><h2 className='ko-team-title'>W61</h2></label>
          </div>
          <div className='divider' />
          <div className='d-flex flex-column mb-2'>
            <input type="radio" id="w62" name="game63" value="name" />
            <label htmlFor="w62" className='knockout-selection-box'><h2 className='ko-team-title'>W62</h2></label>
          </div>
        </div>
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
        <div className='bg-knockout my-2'>
          <div>
            <h1 className='knockout-round-title text-center'>Semi Finals</h1>
          </div>
          <div className='d-flex flex-column mb-2'>
            <input type="radio" id="w57" name="game61" value="name" />
            <label htmlFor="w57" className='knockout-selection-box'><h2 className='ko-team-title'>W57</h2></label>
          </div>
          <div className='divider' />
          <div className='d-flex flex-column mb-2'>
            <input type="radio" id="w58" name="game61" value="name" />
            <label htmlFor="w58" className='knockout-selection-box'><h2 className='ko-team-title'>W58</h2></label>
          </div>
        </div>
        <div className='bg-knockout my-2'>
          <div>
            <h1 className='knockout-round-title text-center'>Semi Finals</h1>
          </div>
          <div className='d-flex flex-column mb-2'>
            <input type="radio" id="w59" name="game62" value="name" />
            <label htmlFor="w59" className='knockout-selection-box'><h2 className='ko-team-title'>W59</h2></label>
          </div>
          <div className='divider' />
          <div className='d-flex flex-column mb-2'>
            <input type="radio" id="w60" name="game62" value="name" />
            <label htmlFor="w60" className='knockout-selection-box'><h2 className='ko-team-title'>W60</h2></label>
          </div>
        </div>
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
          <div className='bg-knockout my-2'>
            <div>
              <h1 className={`knockout-round-title ${!this.state.toggleBracket ? 'text-start' : 'text-end'}`}>Quarter Finals</h1>
            </div>
            <div className='d-flex flex-column mb-2'>
              <input type="radio" id="w49" name="game57" value="name" />
              <label htmlFor="w49" className='knockout-selection-box'><h2 className='ko-team-title'>W49</h2></label>
            </div>
            <div className='divider' />
            <div className='d-flex flex-column mb-2'>
              <input type="radio" id="w50" name="game57" value="name" />
              <label htmlFor="w50" className='knockout-selection-box'><h2 className='ko-team-title'>W50</h2></label>
            </div>
          </div>
          <div className='bg-knockout my-2'>
            <div>
              <h1 className={`knockout-round-title ${!this.state.toggleBracket ? 'text-start' : 'text-end'}`}>Quarter Finals</h1>
            </div>
            <div className='d-flex flex-column mb-2'>
              <input type="radio" id="w53" name="game58" value="name" />
              <label htmlFor="w53" className='knockout-selection-box'><h2 className='ko-team-title'>W53</h2></label>
            </div>
            <div className='divider' />
            <div className='d-flex flex-column mb-2'>
              <input type="radio" id="w54" name="game58" value="name" />
              <label htmlFor="w54" className='knockout-selection-box'><h2 className='ko-team-title'>W54</h2></label>
            </div>
          </div>
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
          <div className='bg-knockout my-2'>
            <div>
              <h1 className={`knockout-round-title ${!this.state.toggleBracket ? 'text-start' : 'text-end'}`}>Quarter Finals</h1>
            </div>
            <div className='d-flex flex-column mb-2'>
              <input type="radio" id="w51" name="game59" value="name" />
              <label htmlFor="w51" className='knockout-selection-box'><h2 className='ko-team-title'>W51</h2></label>
            </div>
            <div className='divider' />
            <div className='d-flex flex-column mb-2'>
              <input type="radio" id="w52" name="game59" value="name" />
              <label htmlFor="w52" className='knockout-selection-box'><h2 className='ko-team-title'>W52</h2></label>
            </div>
          </div>
          <div className='bg-knockout my-2'>
            <div>
              <h1 className={`knockout-round-title ${!this.state.toggleBracket ? 'text-start' : 'text-end'}`}>Quarter Finals</h1>
            </div>
            <div className='d-flex flex-column mb-2'>
              <input type="radio" id="w55" name="game60" value="name" />
              <label htmlFor="w55" className='knockout-selection-box'><h2 className='ko-team-title'>W55</h2></label>
            </div>
            <div className='divider' />
            <div className='d-flex flex-column mb-2'>
              <input type="radio" id="w56" name="game60" value="name" />
              <label htmlFor="w56" className='knockout-selection-box'><h2 className='ko-team-title'>W56</h2></label>
            </div>
          </div>
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
          <div className='bg-knockout my-2'>
            <div>
              <h1 className={`knockout-round-title ${!this.state.toggleBracket ? 'text-start' : 'text-end'}`}>Round of 16</h1>
            </div>
            <div className='d-flex flex-column mb-2'>
              <input type="radio" id="a1" name="game49" value="name" />
              <label htmlFor="a1" className='knockout-selection-box'><h2 className='ko-team-title'>A1</h2></label>
            </div>
            <div className='divider' />
            <div className='d-flex flex-column mb-2'>
              <input type="radio" id="b2" name="game49" value="name" />
              <label htmlFor="b2" className='knockout-selection-box'><h2 className='ko-team-title'>B2</h2></label>
            </div>
          </div>
          <div className='bg-knockout my-2'>
            <div>
              <h1 className={`knockout-round-title ${!this.state.toggleBracket ? 'text-start' : 'text-end'}`}>Round of 16</h1>
            </div>
            <div className='d-flex flex-column mb-2'>
              <input type="radio" id="c1" name="game50" value="name" />
              <label htmlFor="c1" className='knockout-selection-box'><h2 className='ko-team-title'>C1</h2></label>
            </div>
            <div className='divider' />
            <div className='d-flex flex-column mb-2'>
              <input type="radio" id="d2" name="game50" value="name" />
              <label htmlFor="d2" className='knockout-selection-box'><h2 className='ko-team-title'>D2</h2></label>
            </div>
          </div>
          <div className='bg-knockout my-2'>
            <div>
              <h1 className={`knockout-round-title ${!this.state.toggleBracket ? 'text-start' : 'text-end'}`}>Round of 16</h1>
            </div>
            <div className='d-flex flex-column mb-2'>
              <input type="radio" id="e2" name="game53" value="name" />
              <label htmlFor="e2" className='knockout-selection-box'><h2 className='ko-team-title'>E2</h2></label>
            </div>
            <div className='divider' />
            <div className='d-flex flex-column mb-2'>
              <input type="radio" id="f2" name="game53" value="name" />
              <label htmlFor="f2" className='knockout-selection-box'><h2 className='ko-team-title'>F2</h2></label>
            </div>
          </div>
          <div className='bg-knockout my-2'>
            <div>
              <h1 className={`knockout-round-title ${!this.state.toggleBracket ? 'text-start' : 'text-end'}`}>Round of 16</h1>
            </div>
            <div className='d-flex flex-column mb-2'>
              <input type="radio" id="g1" name="game54" value="name" />
              <label htmlFor="g1" className='knockout-selection-box'><h2 className='ko-team-title'>G1</h2></label>
            </div>
            <div className='divider' />
            <div className='d-flex flex-column mb-2'>
              <input type="radio" id="h2" name="game54" value="name" />
              <label htmlFor="h2" className='knockout-selection-box'><h2 className='ko-team-title'>H2</h2></label>
            </div>
          </div>
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
          <div className='bg-knockout my-2'>
            <div>
              <h1 className={`knockout-round-title ${!this.state.toggleBracket ? 'text-start' : 'text-end'}`}>Round of 16</h1>
            </div>
            <div className='d-flex flex-column mb-2'>
              <input type="radio" id="b1" name="game51" value="name" />
              <label htmlFor="b1" className='knockout-selection-box'><h2 className='ko-team-title'>B1</h2></label>
            </div>
            <div className='divider' />
            <div className='d-flex flex-column mb-2'>
              <input type="radio" id="a2" name="game51" value="name" />
              <label htmlFor="a2" className='knockout-selection-box'><h2 className='ko-team-title'>A2</h2></label>
            </div>
          </div>
          <div className='bg-knockout my-2'>
            <div>
              <h1 className={`knockout-round-title ${!this.state.toggleBracket ? 'text-start' : 'text-end'}`}>Round of 16</h1>
            </div>
            <div className='d-flex flex-column mb-2'>
              <input type="radio" id="d1" name="game52" value="name" />
              <label htmlFor="d1" className='knockout-selection-box'><h2 className='ko-team-title'>D1</h2></label>
            </div>
            <div className='divider' />
            <div className='d-flex flex-column mb-2'>
              <input type="radio" id="c2" name="game52" value="name" />
              <label htmlFor="c2" className='knockout-selection-box'><h2 className='ko-team-title'>C2</h2></label>
            </div>
          </div>
          <div className='bg-knockout my-2'>
            <div>
              <h1 className={`knockout-round-title ${!this.state.toggleBracket ? 'text-start' : 'text-end'}`}>Round of 16</h1>
            </div>
            <div className='d-flex flex-column mb-2'>
              <input type="radio" id="f1" name="game55" value="name" />
              <label htmlFor="f1" className='knockout-selection-box'><h2 className='ko-team-title'>F1</h2></label>
            </div>
            <div className='divider' />
            <div className='d-flex flex-column mb-2'>
              <input type="radio" id="e2" name="game55" value="name" />
              <label htmlFor="e2" className='knockout-selection-box'><h2 className='ko-team-title'>E2</h2></label>
            </div>
          </div>
          <div className='bg-knockout my-2'>
            <div>
              <h1 className={`knockout-round-title ${!this.state.toggleBracket ? 'text-start' : 'text-end'}`}>Round of 16</h1>
            </div>
            <div className='d-flex flex-column mb-2'>
              <input type="radio" id="h1" name="game56" value="name" />
              <label htmlFor="h1" className='knockout-selection-box'><h2 className='ko-team-title'>H1</h2></label>
            </div>
            <div className='divider' />
            <div className='d-flex flex-column mb-2'>
              <input type="radio" id="g2" name="group4" value="name" />
              <label htmlFor="g2" className='knockout-selection-box'><h2 className='ko-team-title'>G2</h2></label>
            </div>
          </div>
        </div>
      );
    }
  }

  renderPage() {
    const { route } = this.state;
    const bracketRound = route.params.get('round');
    if (bracketRound === 'roundof16') {
      return (
        <>
          {this.renderSixteen() }
        </>
      );

    }
    if (bracketRound === 'quarters') {
      return (
        <>
          {this.renderQuarter()}
        </>
      );
    }
    if (bracketRound === 'semis') {
      return (
        <>
          {this.renderSemi()}
        </>
      );
    }
    if (bracketRound === 'final') {
      return (
        <>
          {this.renderFinal()}
        </>
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
