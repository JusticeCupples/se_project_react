import React, { useState } from "react";
import ModalWithForm from "./ModalWithForm/ModalWithForm";

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <ModalWithForm
      title="Log in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Log in"
    >
      <label className="modal__label">
        Email
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
        Password
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="modal__input"
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;