import React from 'react';
import parseRoute from '../lib/parse-route';
import AppContext from '../lib/app-context';

export default class Teams extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // group: [],
      route: parseRoute(window.location.hash)
    };
  }

  // componentDidMount() {
  //   fetch('/api/teams')
  //     .then(response => response.json())
  //     .then(groupData => {
  //       this.setState({
  //         group: groupData
  //       });
  //     })
  //     .catch(error => {
  //       console.error('error:', error);
  //     });
  // }

  renderGroup() {
    const { teams } = this.context;
    // const route = parseRoute(window.location.hash);
    // if (this.state.group.length === 0) {
    //   return null;
    // }
    return (
      <>
        <h1>{teams[0].countryName}</h1>
        <h1>{teams[1].countryName}</h1>
      </>
    );
  }

  render() {
    // const { teams } = this.context;
    // console.log('teams page:', teams[0]);
    return (
      <>
        <div>
          <h1>testing</h1>
        </div>
        { this.renderGroup() }
      </>
    );
  }
}
Teams.contextType = AppContext;
