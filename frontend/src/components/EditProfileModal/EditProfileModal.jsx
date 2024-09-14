import React, { useState, useContext } from "react";
import ModalWithForm from "./ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const EditProfileModal = ({ isOpen, onClose, onUpdateUser }) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [avatar, setAvatar] = useState(currentUser.avatar);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({ name, avatar });
  };

  return (
    <ModalWithForm
      title="Edit Profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Save changes"
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="modal__input"
          required
        />
      </label>
      <label className="modal__label">
        Avatar URL
        <input
          type="url"
          name="avatar"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          placeholder="Avatar URL"
          className="modal__input"
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;