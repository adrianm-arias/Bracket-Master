import React from 'react';
import parseRoute from '../lib/parse-route';

export default function Header(props) {
  const route = parseRoute(window.location.hash);
  return (
    <header>
      <nav className='navbar fixed-top navbar-expand-lg navbar-dark nav-bg '>
        <div className='container-xxl'>
          <a className='navbar-brand d-flex pe-lg-5' href='#home'>
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
              <a className={`${route.path === 'home' ? 'nav-link px-3 active' : 'nav-link ps-3'}`} aria-current='page' href='#home'>
                <i className='bi bi-house-door nav-icon-xs' />
                Home</a>
              <a className={`${route.path === 'bracket' ? 'nav-link px-3 active' : 'nav-link ps-3'}`} href='#bracket'>
                <i className='bi bi-layout-three-columns nav-icon-xs' />
                Bracket</a>
              <a className={`${route.path === 'groups' ? 'nav-link px-3 active' : 'nav-link ps-3'}`} href='#groups?group=A'>
                <i className='bi bi-grid nav-icon-xs' />
                Groups</a>
              <a className={`${route.path === 'teams' ? 'nav-link px-3 active' : 'nav-link ps-3'}`} href='#teams'>
                <i className='bi bi-flag nav-icon-xs' />
                Teams</a>
              <div className='d-flex justify-content-between align-items-center login-position'>
                <a className={`${route.path === 'login' ? 'nav-link px-3 active' : 'nav-link px-3'}`} href='#login'>
                  <i className='bi bi-box-arrow-in-right nav-icon-sm' />
                  Login</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
