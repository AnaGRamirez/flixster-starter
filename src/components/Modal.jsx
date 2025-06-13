import "./Modal.css";
// this function takes props isOpen, onClose, children from parent
function Modal({isOpen, onClose, children}) {
  // if not open do not render anything
  if (!isOpen) {
    return null;
  } else {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
          {children}
        </div>
      </div>
    );
  }
}

export default Modal;
