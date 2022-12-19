import React from 'react';

export default function RoundKo(props) {

  const teamOneData = (!props.editing)
    ? <h2 className='ko-team-title'>{props.teamOne}</h2>
    : <>
      <img className='team-flag me-4' src={props.teamOneFlag} alt={`${props.teamOne}-flag`} />
      <h1 className='team-name'>{props.teamOne}</h1>
    </>;

  const teamTwoData = (!props.editing)
    ? <h2 className='ko-team-title'>{props.teamTwo}</h2>
    : <>
      <img className='team-flag me-4' src={props.teamTwoFlag} alt={`${props.teamTwo}-flag`} />
      <h1 className='team-name'>{props.teamTwo}</h1>
    </>;

  return (
    <div className='bg-knockout my-2' key={props.round}>
      <div>
        <h1 className={`knockout-round-title ${!props.toggle ? 'text-start' : 'text-end'}`}>{`${props.round}`}</h1>
      </div>
      <fieldset>
        <div className='d-flex flex-column mb-2' onChange={event => props.teamSel(props.teamIdOne, event)}>
          <input type="radio" id={props.teamIdOne} name={props.name} value=''
            defaultChecked={(!props.editing ? false : props.check(props.teamIdOne))}
          />
          <label htmlFor={props.teamIdOne} className='d-flex knockout-selection-box'>
            {teamOneData}
          </label>
        </div>
      </fieldset>
      <div className='divider' />
      <fieldset>
        <div className='d-flex flex-column mb-2' onChange={event => props.teamSel(props.teamIdTwo, event)}>
          <input type="radio" id={props.teamIdTwo} name={props.name} value=''
            defaultChecked={props.check(props.teamIdTwo)}
          />
          <label htmlFor={props.teamIdTwo} className='d-flex knockout-selection-box'>
            {teamTwoData}
          </label>
        </div>
      </fieldset>
    </div>
  );
}
