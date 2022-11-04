import React from 'react';
import parseRoute from '../lib/parse-route';

export default function KnockoutNav(props) {
  const route = parseRoute(window.location.hash);
  return (
    <div className='py-2 overflow-x'>
      <div className='container-xxl d-flex justify-content-start'>
        <a className={`${route.params.get('round') === 'roundof16' ? 'group-link mx-2 active' : 'group-link mx-2'}`} aria-current='page' href='#bracket?round=roundof16'>Round of 16</a>
        <a className={`${route.params.get('round') === 'quarters' ? 'group-link mx-2 active' : 'group-link mx-2'}`} aria-current='page' href='#bracket?round=quarters'>Quarter Finals</a>
        <a className={`${route.params.get('round') === 'semis' ? 'group-link mx-2 active' : 'group-link mx-2'}`} aria-current='page' href='#bracket?round=semis'>Semi Finals</a>
        <a className={`${route.params.get('round') === 'final' ? 'group-link mx-2 active' : 'group-link mx-2'}`} aria-current='page' href='#bracket?round=final'>Final</a>
      </div>
    </div>
  );
}
