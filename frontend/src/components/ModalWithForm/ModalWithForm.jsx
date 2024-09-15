import React, { useState } from "react";
import "./ModalWithForm.css";
import closeIcon from "../../assets/close.svg";

const ModalWithForm = ({ title, children, buttonText, onClose, isOpen, onSubmit, name }) => {
  const [isFormValid, setIsFormValid] = useState(false);

  const handleFormChange = (e) => {
    setIsFormValid(e.target.checkValidity());
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button type="button" onClick={onClose} className="modal__close">
          <img src={closeIcon} alt="Close" />
        </button>
        <h3 className="modal__title">{title}</h3>
        <form onSubmit={onSubmit} onChange={handleFormChange} name={name}>
          {children}
          <button type="submit" className="modal__button" disabled={!isFormValid}>
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
