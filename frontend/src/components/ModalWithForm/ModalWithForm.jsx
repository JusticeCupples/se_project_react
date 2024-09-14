import React from "react";
import "./ModalWithForm.css";
import closeIcon from "../../assets/close.svg";

const ModalWithForm = ({
  title,
  onClose,
  isOpen,
  onSubmit,
  buttonText,
  children,
}) => {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button className="modal__close" type="button" onClick={onClose}>
          <img src={closeIcon} alt="close icon" />
        </button>
        <h3 className="modal__title">{title}</h3>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <button type="submit" className="modal__button">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
