import React, { useState, useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const EditProfileModal = ({ isOpen, onClose, onUpdateUser }) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser?.data?.name || '');
  const [avatar, setAvatar] = useState(currentUser?.data?.avatar || '');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(name && avatar);
  }, [name, avatar]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const avatarUrl = validateAvatarUrl(avatar);
    onUpdateUser({ name, avatarUrl });
  };

  const validateAvatarUrl = (url) => {
    if (url.includes('ibb.co')) {
      const id = url.split('/').pop();
      return `https://i.ibb.co/${id}/${id}.jpg`;
    }
    return url;
  };

  return (
    <ModalWithForm
      title="Change profile data"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Save changes"
      isValid={isFormValid}
    >
      <label className="modal__label">
        Name *
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={currentUser?.data?.name || 'Name'}
          className="modal__input"
          required
        />
      </label>
      <label className="modal__label">
        Avatar URL *
        <input
          type="url"
          name="avatar"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          placeholder={currentUser?.data?.avatar || 'Avatar URL'}
          className="modal__input"
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;