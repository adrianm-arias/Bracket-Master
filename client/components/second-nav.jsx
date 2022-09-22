import React from 'react';
import parseRoute from '../lib/parse-route';

export default function GroupsNav(props) {
  const route = parseRoute(window.location.hash);
  return (
    <div className="second-nav-bg d-flex justify-content-center py-3 overflow-x">
      <div className='container-xxl d-flex justify-content-between'>
        <a className={`${route.params.get('group') === 'A' ? 'group-link active' : 'group-link'}`} aria-current="page" href="#groups?group=A">Group A</a>
        <a className={`${route.params.get('group') === 'B' ? 'group-link active' : 'group-link'}`} aria-current="page" href='#groups?group=B'>Group B</a>
        <a className={`${route.params.get('group') === 'C' ? 'group-link active' : 'group-link'}`} aria-current="page" href="#groups?group=C">Group C</a>
        <a className={`${route.params.get('group') === 'D' ? 'group-link active' : 'group-link'}`} aria-current="page" href="#groups?group=D">Group D</a>
        <a className={`${route.params.get('group') === 'E' ? 'group-link active' : 'group-link'}`} aria-current="page" href="#groups?group=E">Group E</a>
        <a className={`${route.params.get('group') === 'F' ? 'group-link active' : 'group-link'}`} aria-current="page" href="#groups?group=F">Group F</a>
        <a className={`${route.params.get('group') === 'G' ? 'group-link active' : 'group-link'}`} aria-current="page" href="#groups?group=G">Group G</a>
        <a className={`${route.params.get('group') === 'H' ? 'group-link active' : 'group-link'}`} aria-current="page" href="#groups?group=H">Group H</a>
      </div>
    </div>

  );
}
