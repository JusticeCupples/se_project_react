import React, { useContext } from "react";
import "./Sidebar.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SideBar() {
  const currentUser = useContext(CurrentUserContext);
  console.log("Sidebar - Current User:", currentUser);

  const validateAvatarUrl = (url) => {
    if (url.includes('ibb.co')) {
      const id = url.split('/').pop();
      return `https://i.ibb.co/${id}/${id}.jpg`;
    }
    return url;
  };

  return (
    <div className="sidebar">
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
  );
}

export default SideBar;
