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

    // const updateEditState = JSON.parse(window.localStorage.getItem('editing-state'));
    // this.setState({
    //   isEditing: updateEditState
    // });

    // const updateBracketState = JSON.parse(window.localStorage.getItem('brackets-state'));
    // this.setState({
    //   brackets: updateBracketState
    // });

    // const updateGroupsState = JSON.parse(window.localStorage.getItem('groupStage-state'));
    // this.setState({
    //   groupStage: updateGroupsState
    // });

    // const updateNewBracketState = JSON.parse(window.localStorage.getItem('newBracket-state'));
    // this.setState({
    //   newBracket: updateNewBracketState
    // });

    // const updateGroupCount = JSON.parse(window.localStorage.getItem('groupCount-state'));
    // this.setState({
    //   groupCount: updateGroupCount
    // });

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

  renderSixteen() {
    return (
      <div>
        <div>
          <h1>Round of 16</h1>
        </div>
        <fieldset>
          <div className='d-flex flex-column'>
            <div>
              <input className='' type='radio' name='group1' id='a1' value='name' />
              <label htmlFor='a1' className=''>
                <h2>A1</h2>
              </label>
            </div>
            <div>
              <input className='' type='radio' name='group1' id='b2' value='name' />
              <label htmlFor='b2' className=''>
                <h2>B2</h2>
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <div className='d-flex flex-column'>
            <div>
              <input className='' type='radio' name='group2' id='b1' value='name' />
              <label htmlFor='b1' className=''>
                <h2>B1</h2>
              </label>
            </div>
            <div>
              <input className='' type='radio' name='group2' id='a2' value='name' />
              <label htmlFor='a2' className=''>
                <h2>A2</h2>
              </label>
            </div>
          </div>
        </fieldset>
      </div>
    );
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
        <h1>Quarter Finals</h1>
      );
    }
    if (bracketRound === 'semis') {
      return (
        <h1>Semi Finals</h1>
      );
    }
    if (bracketRound === 'final') {
      return (
        <h1>Final</h1>
      );
    }
  }

  componentDidUpdate() {
    // localStorage.setItem('editing-state', JSON.stringify(this.state.isEditing));
    // localStorage.setItem('brackets-state', JSON.stringify(this.state.brackets));
    // localStorage.setItem('groupStage-state', JSON.stringify(this.state.groupStage));
    // localStorage.setItem('newBracket-state', JSON.stringify(this.state.newBracket));
    // localStorage.setItem('groupCount-state', JSON.stringify(this.state.groupCount));
  }

  render() {
    // console.log(this.state);

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
