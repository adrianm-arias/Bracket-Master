import React from 'react';

export default function KoSwitch(props) {

  const userToken = window.localStorage.getItem('react-jwt');

  return (
    <>
      <div className={`div-switch ${props.hide}`}>
        <button
          className={`btn-switch ko-east ${!props.toggleState ? 'switch-on' : 'switch-off'}`}
          onClick={props.handleClick}>WEST</button>
        <button
          className={`btn-switch ko-west ${!props.toggleState ? 'switch-off' : 'switch-on'}`}
          onClick={props.handleClick}>EAST</button>
      </div>
      <div>
        <i className="bi bi-plus-circle px-2 ko-icons" onClick={() => { window.location.hash = 'groups?group=a'; }} />
        {(!userToken)
          ? null
          : <i className="bi bi-shuffle px-2  ko-icons" data-bs-toggle="modal" data-bs-target="#staticBackdrop" />
        }
      </div>
    </>
  );
}
