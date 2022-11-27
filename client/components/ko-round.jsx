import React from 'react';

export default function RoundKo(props) {

  // const alternateInputText = (props.editing)
  //   ? <h2 className='ko-team-title'>{props.teamOne}</h2>
  //   : <>
  //     <img className='team-flag me-4' src={groupList.countryFlag} alt={`${groupList.countryFlag}-flag`} />
  //     <h1 className='team-name'>{groupList.countryName}</h1>
  //   </>;
  // console.log(props.teamRender);
  return (
    <div className='bg-knockout my-2' key={props.round}>
      <div>
        <h1 className={`knockout-round-title ${!props.toggle ? 'text-start' : 'text-end'}`}>{props.round}</h1>
      </div>
      <fieldset id={props.name}>
        <div className='d-flex flex-column mb-2' onChange={event => props.teamSel(event)}>
          <input type="radio" id={props.teamOne} name={props.name} value=''
          defaultChecked={props.check(props.teamOne)}
          />
          <label htmlFor={props.teamOne} className='knockout-selection-box'>
            <h2 className='ko-team-title'>{props.teamOne}</h2>
            {/* <h1 className='team-name'>{props.countryName}</h1> */}
          </label>
        </div>
      </fieldset>
      <div className='divider' />
      <fieldset id={props.name}>
        <div className='d-flex flex-column mb-2' onChange={event => props.teamSel(event)}>
          <input type="radio" id={props.teamTwo} name={props.name} value=''
          defaultChecked={props.check(props.teamTwo)}
          />
          <label htmlFor={props.teamTwo} className='knockout-selection-box'>
            <h2 className='ko-team-title'>{props.teamTwo}</h2>
          </label>
        </div>
      </fieldset>
    </div>
  );
}
