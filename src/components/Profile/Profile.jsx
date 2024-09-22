import React, { useContext, useMemo, useState, useEffect } from "react";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../Sidebar/Sidebar";
import "./Profile.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { getItems } from "../../utils/api";

function Profile({ weatherTemp, onSelectCard, onCreateModal, onEditProfile, onLogout, onCardLike, clothingItems }) {
  const currentUser = useContext(CurrentUserContext);

  const filteredClothingItems = useMemo(() => {
    return clothingItems.filter(item => item.owner === currentUser?.data?._id);
  }, [clothingItems, currentUser]);

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
          filteredCards={filteredClothingItems}
          onSelectCard={onSelectCard}
          onCreateModal={onCreateModal}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;