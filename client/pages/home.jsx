import React from 'react';
import parseRoute from '../lib/parse-route';
import AppContext from '../lib/app-context';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bracketName: '',
      bracketId: null,
      route: parseRoute(window.location.hash),
      confirmDelete: false
    };
    this.handleBracketDelete = this.handleBracketDelete.bind(this);
    this.confirmDeleteAlert = this.confirmDeleteAlert.bind(this);

  }

  confirmDeleteAlert() {

    return (
      <div className='d-flex justify-content-center'>
        <div className='alert alert-danger alert-dismissible fade show mt-3 d-flex justify-content-center' role='alert'>
          <div className='my-2'>
            <div className=''>
              <p className='text-center'>{`Are you sure you want to delete '${this.state.bracketName}' ?`}</p>
            </div>
            <div className='mt-4 d-flex justify-content-center'>
              <button type='button' className='btn-primary mx-2 cancel-btn' data-bs-dismiss='alert' aria-label='Close' onClick={() => this.setState({ confirmDelete: false, bracketName: '', bracketId: null })}>Cancel</button>
              <button className='btn-primary mx-2 delete-btn' onClick={ () => this.handleBracketDelete() }>Delete</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleBracketDelete() {
    const token = window.localStorage.getItem('react-jwt');
    const bracketId = this.state.bracketId;

    fetch(`/api/brackets/${bracketId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    })
      .then(result => {
        // console.log('checking if function is being called');
        this.setState({
          confirmDelete: false,
          bracketName: '',
          bracketId: null
        });
      })
      .catch(error => {
        console.error('error:', error);
      });
  }

  componentDidMount() {
    window.addEventListener('hashchange', event => {
      const newRoute = parseRoute(window.location.hash);
      this.setState({
        route: newRoute
      });
    });
  }

  renderUserBrackets() {
    const { myBrackets } = this.context;

    const mapList = myBrackets.map(data => {
      return (
        <div className='d-flex justify-content-center' key={data.bracketId}>
          <div className='edit-bracket-wrapper my-1 mx-auto d-flex justify-content-start align-items-center position-relative'>
            <i className='bi bi-pencil-fill editing-icon' />
            <a href={`#groups?group=A&bracketId=${data.bracketId}&bracketName=${data.bracketName}`}>
              <h1 className='bracket-name'>{data.bracketName}</h1>
            </a>
            <div className='position-absolute end-0'>
              <i className='bi bi-dash-circle editing-delete-icon' onClick={() => this.setState({ confirmDelete: true, bracketName: data.bracketName, bracketId: data.bracketId })} />
            </div>
          </div>
        </div>
      );
    });
    return (
      <div className='mx-2 text-center'>{mapList}</div>
    );
  }

  render() {
    const { user } = this.context;
    // console.log(this.state);

    if (!user) {
      return (
        <div>
          <h1>Log in to cast your predictions</h1>
        </div>
      );
    }
    return (
      <>
        <div className='text-center my-5'>
          <h2>My Brackets</h2>
        </div>
        <div>
          {this.renderUserBrackets()}
        </div>
        {(!this.state.confirmDelete)
          ? null
          : <this.confirmDeleteAlert />
        }
      </>
    );

  }
}
Home.contextType = AppContext;
