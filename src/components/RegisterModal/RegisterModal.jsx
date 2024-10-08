import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({ isOpen, onClose, onRegister, onLoginClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(email && password && name && avatar);
  }, [email, password, name, avatar]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      alert("Password must contain at least 6 characters");
      return;
    }
    onRegister({ email, password, name, avatar });
  };

  return (
    <ModalWithForm
      title="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="register"
      hideDefaultButton={true}
    >
      <label className="modal__label">
        Email *
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="modal__input"
          required
        />
      </label>
      <label className="modal__label">
        Password *
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="modal__input"
          required
          autoComplete="new-password"
        />
      </label>
      <label className="modal__label">
        Name *
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
        Avatar URL *
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
      <div className="modal__button-container">
        <button type="submit" className={`modal__button ${isFormValid ? 'modal__button_valid' : ''}`}>
          Sign Up
        </button>
        <button type="button" onClick={onLoginClick} className="modal__button modal__button_type_secondary">
          or Log In
        </button>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;