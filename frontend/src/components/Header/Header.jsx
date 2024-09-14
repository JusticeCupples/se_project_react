import React from "react";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import { Link } from "react-router-dom";

const Header = ({ onCreateModal, currentDate, temp }) => {
  return (
    <header className="header">
      <div className="header__left">
        <Link className="header__link" to="/">
          <img className="header__logo-img" src={logo} alt="logo" />
        </Link>
        <p className="header__date">
          {currentDate}, {temp.city}
        </p>
      </div>
      <div className="header__right">
        <ToggleSwitch />
        <button
          className="header__button"
          type="button"
          onClick={onCreateModal}
        >
          + Add Clothes
        </button>
        <Link className="header__link" to="/profile">
          <div className="header__user-container">
            <div className="header__username">Terrence Tegegne</div>
            <img className="header__avatar" src={avatar} alt="avatar" />
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
