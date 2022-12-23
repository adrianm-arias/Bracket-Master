import React from 'react';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      firstName: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { action } = this.props;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch(`/api/${action}`, req)
      .then(res => res.json())
      .then(result => {
        if (action === 'sign-up') {
          window.location.hash = 'sign-in';
        } else if (result.user && result.token) {
          this.props.onSignIn(result);
        }
      });
  }

  render() {
    const { action } = this.props;
    const { handleChange, handleSubmit } = this;

    const alternateActionHref = action === 'sign-up' ? '#sign-in' : '#sign-up';
    const alternateActionText = action === 'sign-up' ? 'Sign in' : 'New Here? Register now';
    const submitButtonText = action === 'sign-up' ? 'Register' : 'Log In';
    const welcomeMessage = action === 'sign-in' ? 'Please sign in to continue' : 'Create an account to get started!';

    return (
      <div className='d-flex justify-content-center'>
        <form className='column justify-content-center' onSubmit={handleSubmit}>
          <div className='py-5 text-center'>
            <h3>{welcomeMessage}</h3>
          </div>
          { action === 'sign-up'
            ? <div className='form-floating mb-2'>
              <input required name='firstName' type='text' className='form-control auth-input' id='name' placeholder='First Name' onChange={handleChange} />
              <label htmlFor='name'>Name</label>
            </div>
            : null
          }
          <div className='form-floating mb-2'>
            <input required name='username' type='text' className='form-control auth-input' id='username' placeholder='Username' onChange={handleChange}/>
            <label htmlFor='username'>Username</label>
          </div>
          <div className='form-floating'>
            <input required name='password' type='password' className='form-control auth-input' id='floatingPassword' placeholder='Password' onChange={handleChange}/>
            <label htmlFor='floatingPassword'>Password</label>
          </div>
          <div className='row py-4'>
            <button type='submit' className='btn btn-primary mb-3 py-2'>
              {submitButtonText}
            </button>
            <a className='text-muted text-end' href={alternateActionHref}>
              {alternateActionText}
            </a>
          </div>
        </form>
      </div>
    );
  }
}
