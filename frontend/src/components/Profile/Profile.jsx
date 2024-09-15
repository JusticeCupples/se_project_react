import React, { useContext, useMemo } from "react";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../Sidebar/Sidebar";
import "./Profile.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({ weatherTemp, onSelectCard, clothingItems, onCreateModal, onEditProfile, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div>
      <section className="profile__sidebar">
        <SideBar weatherTemp={weatherTemp} />
        <div className="profile__buttons">
          <button className="profile__button profile__button_no_background" onClick={onEditProfile}>
            Change profile data
          </button>
          <button className="profile__button profile__button_no_background" onClick={onLogout}>
            Log out
          </button>
        </div>
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          filteredCards={clothingItems}
          onSelectCard={onSelectCard}
          onCreateModal={onCreateModal}
        />
      </section>
    </div>
  );
}

export default Profile;