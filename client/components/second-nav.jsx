import React from 'react';
// import parseRoute from '../lib/parse-route';

export default function GroupsNav(props) {
  // const route = parseRoute(window.location.hash);
  return (
    <div className='second-nav-bg p-3 d-flex overflow-x'>
      <a className="group-link active" aria-current="page" href="">Active</a>
      <a className="group-link" aria-current="page" href="">Link</a>
      <a className="group-link" aria-current="page" href="">Link</a>
      <a className="group-link" aria-current="page" href="">Link</a>
      <a className="group-link" aria-current="page" href="">Link</a>
      <a className="group-link" aria-current="page" href="">Link</a>
      <a className="group-link" aria-current="page" href="">Link</a>
      <a className="group-link" aria-current="page" href="">Link</a>
      <a className="group-link" aria-current="page" href="">Link</a>
    </div>
  );
}
