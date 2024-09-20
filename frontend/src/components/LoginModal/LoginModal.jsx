import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ isOpen, onClose, onLogin, onSignupClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(email && password);
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    if (!email.includes('@') || password.length < 6) {
      setError("Invalid email or password");
      return;
    }
    try {
      await onLogin({ email, password });
    } catch (err) {
      setError("Incorrect email or password");
    }
  };

  return (
    <ModalWithForm
      title="Log In"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="login"
      hideDefaultButton={true}
    >
      {error && <span className="modal__error">{error}</span>}
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
          autoComplete="current-password"
        />
      </label>
      <div className="modal__button-container">
        <button type="submit" className={`modal__button ${isFormValid ? 'modal__button_valid' : ''}`}>
          Log In
        </button>
        <button type="button" onClick={onSignupClick} className="modal__button modal__button_type_secondary">
          or Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;