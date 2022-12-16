import React from 'react';
import AppContext from '../lib/app-context';

export default class Header extends React.Component {

  render() {
    const { handleSignOut, route, user } = this.context;
    const alternateActionHref = (route.params.get('bracketId')) ? `#bracket?round=roundof16&bracketId=${route.params.get('bracketId')}` : '#bracket?round=roundof16';

    return (
      <header>
        <nav className='navbar fixed-top navbar-expand-lg navbar-dark nav-bg '>
          <div className='container-xxl'>
            <a className='navbar-brand d-flex pe-lg-5' href=''>
              <img src='/images/worldcup-logo.png' alt='world-cup-trophy' className='logo-icon' />
              <div className='d-flex flex-column justify-content-center'>
                <span className='logo-text'>World Cup 2022</span>
                <span className='logo-text'>Predictor</span>
              </div>
            </a>
            <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNavAltMarkup' aria-controls='navbarNavAltMarkup' aria-expanded='false' aria-label='Toggle navigation'>
              <i className='bi bi-list nav-icon' />
            </button>
            <div className='collapse navbar-collapse ps-lg-5 nav-position' id='navbarNavAltMarkup'>
              <div className='navbar-nav d-flex justify-content-end'>
                <a className={`${route.path === '' ? 'nav-link px-3 active' : 'nav-link ps-3'}`} aria-current='page' href=''>
                  <i className='bi bi-house-door nav-icon-xs' />
                  Home</a>
                <a className={`${route.path === 'bracket' ? 'nav-link px-3 active' : 'nav-link ps-3'}`} href={alternateActionHref}>
                  <i className='bi bi-layout-three-columns nav-icon-xs' />
                  Bracket</a>
                <a className={`${route.path === 'groups' ? 'nav-link px-3 active' : 'nav-link ps-3'}`} href='#groups?group=a'>
                  <i className='bi bi-grid nav-icon-xs' />
                  Groups</a>
                <a className={`${route.path === 'teams' ? 'nav-link px-3 active' : 'nav-link ps-3'}`} href='#teams'>
                  <i className='bi bi-flag nav-icon-xs' />
                  Teams</a>
                <div className='d-flex justify-content-between align-items-center login-position'>
                  {(!user)
                    ? <a className={`${route.path === 'sign-up' || route.path === 'sign-in' ? 'nav-link px-3 active' : 'nav-link px-3'}`} href='#sign-in'>
                      <i className='bi bi-box-arrow-in-right nav-icon-sm' />
                      Sign In</a>
                    : <button className='nav-link px-3 empty-btn' onClick={handleSignOut}>
                      <i className='bi bi-box-arrow-in-right nav-icon-sm' />
                      Sign Out
                    </button>
                    }
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}
Header.contextType = AppContext;
