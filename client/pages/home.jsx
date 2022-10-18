import React from 'react';
import parseRoute from '../lib/parse-route';
import AppContext from '../lib/app-context';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
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
          <a href={`#groups?group=A&bracketId=${data.bracketId}&bracketName=${data.bracketName}`}>
            <div className='edit-bracket-wrapper my-1 mx-auto d-flex justify-content-start align-items-center position-relative'>
              <i className='bi bi-pencil-fill editing-icon' />
              <h1 className='bracket-name'>{data.bracketName}</h1>
              <div className='position-absolute end-0'>
                <i className='bi bi-dash-circle editing-delete-icon' />
              </div>
            </div>
          </a>
        </div>
      );
    });
    return (
      <div className='mx-2 text-center'>{mapList}</div>
    );
  }

  render() {
    const { user } = this.context;

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
      </>
    );

  }
}
Home.contextType = AppContext;
