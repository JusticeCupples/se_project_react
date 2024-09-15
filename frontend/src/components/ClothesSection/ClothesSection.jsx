import React from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ filteredCards = [], onSelectCard, onCreateModal }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__text">
        <p className="clothes-section__title">Your Items</p>
        <button className="clothes-section-button" onClick={onCreateModal}>
          + Add New
        </button>
      </div>
      <div className="clothes-section__items">
        {filteredCards.length > 0 ? (
          filteredCards.map((item) => (
            <ItemCard key={item._id || item.id || `item_${item.name}`} item={item} onSelectCard={onSelectCard} />
          ))
        ) : (
          <p>No items available for the current weather.</p>
        )}
      </div>
    </div>
  );
}

export default ClothesSection;
