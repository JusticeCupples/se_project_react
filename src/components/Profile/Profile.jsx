import React, { useContext, useMemo } from "react";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../Sidebar/Sidebar";
import "./Profile.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({ weatherTemp, onSelectCard, clothingItems, onCreateModal, onEditProfile, onLogout, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div>
      <section className="profile__sidebar">
        <SideBar 
          weatherTemp={weatherTemp} 
          onEditProfile={onEditProfile}
          onLogout={onLogout}
        />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          filteredCards={clothingItems}
          onSelectCard={onSelectCard}
          onCreateModal={onCreateModal}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;