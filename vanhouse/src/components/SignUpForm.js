import React from 'react';
import ReactDOM from 'react-dom';

/*https://upmostly.com/tutorials/modal-components-react-custom-hooks*/
/*Accessed June 6, 2021*/
const Modal = (props) => props.isShowing ? ReactDOM.createPortal(
    <React.Fragment>
        <div className="modal-overlay"/>
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div className="modal">
                <div className="modal-header">
                    <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close"
                            onClick={props.hide}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <h1>
                    Sign Up Form
                </h1>
            </div>
        </div>
    </React.Fragment>, document.body
) : null;

export default Modal;