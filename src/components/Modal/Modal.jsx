import { useEffect } from "react";
import PropTypes from "prop-types";
import "./Modal.css";

const Modal = (props) => {
  const {
    title,
    body,
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
            className="modalValidate success"
            onClick={onValidate}
          >
            {validateText}
          </button>
          <button className="modalCancel error" onClick={onCancel}>
            {cancelText}
          </button>
        </>
      ) : (
        <button className="modalClose error" onClick={onClose}>
          {closeText}
        </button>
      )}
    </div>
  );

  return (
    <div className="modalSection">
      <div className="modal">
        {title && <div className="title">{title}</div>}
        <div>{body ? body : ''}</div>
        {buttons}
      </div>
      <div className="modalBlur" onClick={closeModalAction}></div>
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  body: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
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
