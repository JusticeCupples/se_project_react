import React, { useContext } from "react";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const validateAvatarUrl = (url) => {
  if (url.includes('ibb.co')) {
    const id = url.split('/').pop();
    return `https://i.ibb.co/${id}/${id}.jpg`;
  }
  return url;
};

const Header = ({ onCreateModal, currentDate, temp, city, isLoggedIn, onLoginClick, onRegisterClick }) => {
  const currentUser = useContext(CurrentUserContext);
  console.log("Header - Current User:", currentUser);
  console.log("Header - isLoggedIn:", isLoggedIn);

  return (
    <header className="header">
      <div className="header__left">
        <Link className="header__link" to="/">
          <img className="header__logo-img" src={logo} alt="logo" />
        </Link>
        <p className="header__date">
          {currentDate}, {city}
        </p>
      </div>
      <div className="header__right">
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
            <button
              className="header__button"
              type="button"
              onClick={onCreateModal}
            >
              + Add Clothes
            </button>
            <Link className="header__link" to="/profile">
              <div className="header__user-container">
                <div className="header__username">{currentUser?.data?.name || 'User'}</div>
                {currentUser?.data?.avatar ? (
                  <>
                    <img 
                      className="header__avatar" 
                      src={validateAvatarUrl(currentUser.data.avatar)} 
                      alt="avatar" 
                      onError={(e) => {
                        console.error("Error loading avatar:", e);
                        console.log("Avatar URL:", currentUser.data.avatar);
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/150?text=Avatar';
                      }}
                    />
                  </>
                ) : (
                  <div className="header__avatar-placeholder">?</div>
                )}
              </div>
            </Link>
          </>
        ) : (
          <>
            <button className="header__button" onClick={onRegisterClick}>
              Sign Up
            </button>
            <button className="header__button" onClick={onLoginClick}>
              Log In
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
