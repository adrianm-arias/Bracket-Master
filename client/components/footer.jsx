import React from 'react';
import parseRoute from '../lib/parse-route';

export default function Footer(props) {
  const route = parseRoute(window.location.hash);
  return (
    <footer className='navbar fixed-bottom navbar-expand-lg navbar-dark nav-bg py-2'>
      <div className='container-xxl d-flex flex-column'>
        <div className='pb-3'>
          <a href='#home'><i className={`${route.path === 'home' ? 'bi bi-house-door footer-icon-xs active' : 'bi bi-house-door footer-icon-xs'}`} /></a>

          <a href='#bracket'><i className={`${route.path === 'bracket' ? 'bi bi-layout-three-columns footer-icon-xs active' : 'bi bi-layout-three-columns footer-icon-xs'}`} /></a>

          <a href='#groups'><i className={`${route.path === 'groups' ? 'bi bi-grid footer-icon-xs active' : 'bi bi-grid footer-icon-xs'}`} /></a>

          <a href='#teams'><i className={`${route.path === 'teams' ? 'bi bi-flag footer-icon-xs active' : 'bi bi-flag footer-icon-xs'}`} /></a>
        </div>
        <div className='justify-content-center'>
          <p className='cr-text'>
            Copyright © 2022. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
