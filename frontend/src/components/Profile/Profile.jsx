import React, { useContext, useMemo } from "react";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../Sidebar/Sidebar";
import "./Profile.css";

function Profile({ weatherTemp, onSelectCard, clothingItems, onCreateModal }) {
  return (
    <div>
      <section className="profile__sidebar">
        <SideBar weatherTemp={weatherTemp} />
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