import React, { useContext } from "react";
import "./ItemModal.css";
import close from "../../assets/close.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, onClose, card, onDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = currentUser && currentUser.data && card.owner === currentUser.data._id;

  const itemDeleteButtonClassName = `modal__delete-button ${
    isOwn ? "modal__delete-button_visible" : "modal__delete-button_hidden"
  }`;

  return (
    <div
      className={`modal modal__item ${
        activeModal === "preview" && "modal_opened"
      }`}
    >
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={close} alt="close" />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__text">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          {isOwn && (
            <button
              className={itemDeleteButtonClassName}
              onClick={() => onDelete(card)}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
