import React from 'react';
import parseRoute from '../lib/parse-route';

export default function GroupsNav(props) {
  const route = parseRoute(window.location.hash);
  return (
    <div className='py-2 overflow-x'>
      <div className='container-xxl d-flex justify-content-start'>
        <a className={`${route.params.get('group') === 'a' ? 'group-link mx-2 active' : 'group-link mx-2'}`} aria-current='page' href='#groups?group=a'>Group A</a>
        <a className={`${route.params.get('group') === 'b' ? 'group-link mx-2 active' : 'group-link mx-2'}`} aria-current='page' href='#groups?group=b'>Group B</a>
        <a className={`${route.params.get('group') === 'c' ? 'group-link mx-2 active' : 'group-link mx-2'}`} aria-current='page' href='#groups?group=c'>Group C</a>
        <a className={`${route.params.get('group') === 'd' ? 'group-link mx-2 active' : 'group-link mx-2'}`} aria-current='page' href='#groups?group=d'>Group D</a>
        <a className={`${route.params.get('group') === 'e' ? 'group-link mx-2 active' : 'group-link mx-2'}`} aria-current='page' href='#groups?group=e'>Group E</a>
        <a className={`${route.params.get('group') === 'f' ? 'group-link mx-2 active' : 'group-link mx-2'}`} aria-current='page' href='#groups?group=f'>Group F</a>
        <a className={`${route.params.get('group') === 'g' ? 'group-link mx-2 active' : 'group-link mx-2'}`} aria-current='page' href='#groups?group=g'>Group G</a>
        <a className={`${route.params.get('group') === 'h' ? 'group-link mx-2 active' : 'group-link mx-2'}`} aria-current='page' href='#groups?group=h'>Group H</a>
      </div>
    </div>
  );
}
