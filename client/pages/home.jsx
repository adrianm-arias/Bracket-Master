import React from 'react';
import AppContext from '../lib/app-context';

export default class Home extends React.Component {

  render() {
    const { user } = this.context;

    if (!user) {
      return (
        <div>
          <h1>Log in to cast your predictions</h1>
        </div>
      );
    }
    const { firstName } = user;
    return (
      <div>
        <h1>Welcome Back, {firstName}</h1>
      </div>
    );

  }
}
Home.contextType = AppContext;
