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
        <div>
          <h1>Brackets Page</h1>
        </div>
      </>
    );
  }
}
Brackets.contextType = AppContext;
