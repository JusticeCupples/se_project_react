import React, { useContext } from "react";
import "./Sidebar.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SideBar({ weatherTemp, onEditProfile, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  const validateAvatarUrl = (url) => {
    if (url.includes('ibb.co')) {
      const id = url.split('/').pop();
      return `https://i.ibb.co/${id}/${id}.jpg`;
    }
    return url;
  };

  return (
    <div className="sidebar">
      <div className="sidebar__user-info">
        {currentUser?.data?.avatar ? (
          <img 
            className="sidebar__avatar" 
            src={validateAvatarUrl(currentUser.data.avatar)} 
            alt="profile avatar" 
            onError={(e) => {
              console.error("Error loading avatar in Sidebar:", e);
              console.log("Sidebar Avatar URL:", currentUser.data.avatar);
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/150?text=Avatar';
            }}
          />
        ) : (
          <div className="sidebar__avatar-placeholder">?</div>
        )}
        <p className="sidebar__username">{currentUser?.data?.name || 'User'}</p>
      </div>
      <div className="sidebar__buttons">
        <button className="sidebar__button" onClick={onEditProfile}>
          Change profile data
        </button>
        <button className="sidebar__button" onClick={onLogout}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
