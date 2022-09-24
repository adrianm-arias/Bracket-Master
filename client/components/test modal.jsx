import React from 'react';
import AppContext from '../lib/app-context';

class Modal extends React.Component {

  render() {
    const { teams } = this.context;
    // const openModal = this.props.closeModal;
    // console.log(openModal);
    return (
      <div className='modal-bg'>
        <div className="modal-content">
          <div className="modal-header">
            <img className='team-flag me-4' src={teams[8].countryFlag} alt={`${teams[8].countryName} Flag`} />
            <h2>{teams[8].countryName}</h2>
            <button onClick={() => this.setState({ openModal: false })} type="button" className="btn-close" />
          </div>
          <div className="modal-body">
            <p className='fs-5'>Coach: <span className='fw-semibold'>{teams[8].coach}</span></p>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
Modal.contextType = AppContext;
