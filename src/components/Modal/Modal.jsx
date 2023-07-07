import { useEffect } from "react";
import { PropTypes } from "prop-types";
import "./Modal.css";

const Modal = (props) => {
  const {
    title,
    text,
    validateText,
    cancelText,
    closeText,
    onValidate,
    onCancel,
    onClose,
  } = props;

  useEffect(() => {
    const enterEscapeKeydown = (event) => {
      if (event.key === "Enter" || event.key === "Escape") {
        closeModalAction(event);
      }
    };
    window.addEventListener("keydown", enterEscapeKeydown);
    return () => window.removeEventListener("keydown", enterEscapeKeydown);
  }, []);

  const closeModalAction = (event) => {
    if (onCancel) onCancel(event);
    else onClose(event);
  };

  const buttons = (
    <div className="modalActions">
      {onValidate ? (
        <>
          <button
            className="modalValidate"
            onClick={(event) => onValidate(event)}
          >
            {validateText}
          </button>
          <button className="modalCancel" onClick={(event) => onCancel(event)}>
            {cancelText}
          </button>
        </>
      ) : (
        <button className="modalClose" onClick={(event) => onClose(event)}>
          {closeText}
        </button>
      )}
    </div>
  );

  return (
    <div className="modalSection">
      <div className="modal">
        {title && <div className="title">{title}</div>}
        <div>{text}</div>
        {buttons}
      </div>
      <div className="modalBlur" onClick={closeModalAction}></div>
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string.isRequired,
  validateText: PropTypes.string,
  cancelText: PropTypes.string,
  closeText: PropTypes.string,
  onValidate: PropTypes.func,
  onCancel: PropTypes.func,
  onClose: PropTypes.func,

  onlyOneBetweenOnCloseAndOnCancel: function (props) {
    if (
      (props["onCancel"] || props["onValidate"]) &&
      !(props["onCancel"] && props["onValidate"])
    ) {
      return new Error(
        "Invalid props: Both or no one of 'onCancel' and 'onValidate' should be given."
      );
    }
  },
};

Modal.defaultProps = {
  validateText: "OK",
  cancelText: "Cancel",
  closeText: "Close",
};

export default Modal;
