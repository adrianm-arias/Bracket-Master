import React from 'react';
import parseRoute from '../lib/parse-route';
import AppContext from '../lib/app-context';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myBrackets: [],
      route: parseRoute(window.location.hash),
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
  }

  renderUserBrackets() {
    const { myBrackets } = this.context;
    const mapList = myBrackets.map(data => {
      return (
        <div className='d-flex justify-content-center' key={data.bracketId}>
          <button className='empty-btn'>
            <div className='edit-bracket-wrapper my-1 mx-auto d-flex justify-content-start align-items-center position-relative'>
              <i className='bi bi-pencil-fill editing-icon' />
              <h1 className='bracket-name'>{data.bracketName}</h1>
              <div className='position-absolute end-0'>
                <i className='bi bi-dash-circle editing-delete-icon' />
              </div>
            </div>
          </button>
        </div>
      );
    });
    return (
      <div className='mx-2 text-center'>{mapList}</div>
    );
  }

  render() {
    const { user } = this.context;
    // const bracket1 = this.state.brackets;
    // console.log(bracket1.bracketName);
    // console.log('render state bracket:', bracket1);

    if (!user) {
      return (
        <div>
          <h1>Log in to cast your predictions</h1>
        </div>
      );
    }

    const { firstName } = user;
    return (
      <>
        <div className='text-center my-5'>
          <h2>My Brackets, {firstName}</h2>
        </div>
        <div>
          {this.renderUserBrackets()}
        </div>
      </>
    );

  }
}
Home.contextType = AppContext;
