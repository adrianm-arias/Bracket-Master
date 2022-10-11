import React from 'react';
import AppContext from '../lib/app-context';
import AuthForm from '../components/auth-form';
import Redirect from '../components/redirect';

export default class Login extends React.Component {
  render() {
    const { user, route, handleSignIn } = this.context;

    if (user) return <Redirect to="" />;

    return (
      <div className='py-5'>
        <AuthForm
        action={route.path}
        onSignIn={handleSignIn} />
      </div>
    );
  }
}

Login.contextType = AppContext;
