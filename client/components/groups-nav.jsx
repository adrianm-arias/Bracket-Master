import React from 'react';
import parseRoute from '../lib/parse-route';

export default function GroupsNav(props) {
  const route = parseRoute(window.location.hash);
  return (
    <div className='py-2 overflow-x'>
      <div className='container-xxl d-flex justify-content-start'>
        <a className={`${route.params.get('group') === 'A' ? 'group-link mx-2 active' : 'group-link mx-2'}`} aria-current='page' href='#groups?group=A'>Group A</a>
        <a className={`${route.params.get('group') === 'B' ? 'group-link mx-2 active' : 'group-link mx-2'}`} aria-current='page' href='#groups?group=B'>Group B</a>
        <a className={`${route.params.get('group') === 'C' ? 'group-link mx-2 active' : 'group-link mx-2'}`} aria-current='page' href='#groups?group=C'>Group C</a>
        <a className={`${route.params.get('group') === 'D' ? 'group-link mx-2 active' : 'group-link mx-2'}`} aria-current='page' href='#groups?group=D'>Group D</a>
        <a className={`${route.params.get('group') === 'E' ? 'group-link mx-2 active' : 'group-link mx-2'}`} aria-current='page' href='#groups?group=E'>Group E</a>
        <a className={`${route.params.get('group') === 'F' ? 'group-link mx-2 active' : 'group-link mx-2'}`} aria-current='page' href='#groups?group=F'>Group F</a>
        <a className={`${route.params.get('group') === 'G' ? 'group-link mx-2 active' : 'group-link mx-2'}`} aria-current='page' href='#groups?group=G'>Group G</a>
        <a className={`${route.params.get('group') === 'H' ? 'group-link mx-2 active' : 'group-link mx-2'}`} aria-current='page' href='#groups?group=H'>Group H</a>
      </div>
    </div>
  );
}
