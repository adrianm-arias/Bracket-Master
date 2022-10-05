import React from 'react';
import AppContext from '../lib/app-context';
import AuthForm from '../components/auth-form';
import Redirect from '../components/redirect';

export default class Login extends React.Component {
  render() {
    const { user, route, handleSignIn } = this.context;

    // const welcomeMessage = route.path === 'sign-in'
    //   ? 'Please log in to continue'
    //   : 'Create an account to get started';

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
