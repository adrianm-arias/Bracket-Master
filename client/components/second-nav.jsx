import React from 'react';
import parseRoute from '../lib/parse-route';

export default function GroupsNav(props) {
  const route = parseRoute(window.location.hash);
  return (
    <div className="second-nav-bg d-flex justify-content-center py-3 overflow-x">
      <div className='container-xxl d-flex justify-content-between'>
        <a className={`${route.params.get('groupa') !== null ? 'group-link active' : 'group-link'}`} aria-current="page" href="#groups?groupa">Group A</a>
        <a className={`${route.params.get('groupb') !== null ? 'group-link active' : 'group-link'}`} aria-current="page" href='#groups?groupb'>Group B</a>
        <a className={`${route.params.get('groupc') !== null ? 'group-link active' : 'group-link'}`} aria-current="page" href="#groups?groupc">Group C</a>
        <a className={`${route.params.get('groupd') !== null ? 'group-link active' : 'group-link'}`} aria-current="page" href="#groups?groupd">Group D</a>
        <a className={`${route.params.get('groupe') !== null ? 'group-link active' : 'group-link'}`} aria-current="page" href="#groups?groupe">Group E</a>
        <a className={`${route.params.get('groupf') !== null ? 'group-link active' : 'group-link'}`} aria-current="page" href="#groups?groupf">Group F</a>
        <a className={`${route.params.get('groupg') !== null ? 'group-link active' : 'group-link'}`} aria-current="page" href="#groups?groupg">Group G</a>
        <a className={`${route.params.get('grouph') !== null ? 'group-link active' : 'group-link'}`} aria-current="page" href="#groups?grouph">Group H</a>
      </div>
    </div>

  );
}

// { `${route.path === 'home' ? 'nav-link px-3 active' : 'nav-link ps-3'}` }
