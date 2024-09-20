import React, { useState } from "react";
import "./ModalWithForm.css";
import closeIcon from "../../assets/close.svg";

const ModalWithForm = ({ title, name, onClose, isOpen, onSubmit, children, buttonText, isValid }) => {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button type="button" onClick={onClose} className="modal__close">&#10005;</button>
        <h3 className="modal__title">{title}</h3>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <button type="submit" className={`modal__button ${isValid ? 'modal__button_valid' : ''}`}>
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
