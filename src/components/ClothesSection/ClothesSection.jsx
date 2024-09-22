import React from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ filteredCards = [], onSelectCard, onCreateModal, onCardLike }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__text">
        <p className="clothes-section__title">Your Items</p>
        <button className="clothes-section-button" onClick={onCreateModal}>
          + Add New
        </button>
      </div>
      <div className="clothes-section__items">
        {Array.isArray(filteredCards) && filteredCards.map((item) => (
          <ItemCard 
            key={item._id} 
            item={item} 
            onSelectCard={onSelectCard}
            onCardLike={onCardLike}
          />
        ))}
      </div>
    </div>
  );
}

export default ClothesSection;
