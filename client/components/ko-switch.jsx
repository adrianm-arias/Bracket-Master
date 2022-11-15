import React from 'react';

export default function KoSwitch(props) {
  return (
    <>
      <div className={`div-switch ${props.hide}`}>
        <button
          className={`btn-switch ko-east ${!props.toggleState ? 'switch-on' : 'switch-off'}`}
          onClick={props.handleClick}>EAST</button>
        <button
          className={`btn-switch ko-west ${!props.toggleState ? 'switch-off' : 'switch-on'}`}
          onClick={props.handleClick}>WEST</button>
      </div>
      <div>
        <i className="bi bi-plus-circle px-2 ko-icons" />
        <i className="bi bi-shuffle px-2  ko-icons" />
      </div>
    </>
  );
}
