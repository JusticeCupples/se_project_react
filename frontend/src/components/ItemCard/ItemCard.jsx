import React from "react";
import "./ItemCard.css";

function ItemCard({ item, onSelectCard }) {
  if (!item || !item.imageUrl || !item.name) {
    console.error("Invalid item data:", item);
    return null; // Don't render anything if the item data is invalid
  }

  return (
    <div className="item-card" onClick={() => onSelectCard(item)}>
      <img src={item.imageUrl} alt={item.name} className="item-card__image" />
      <div className="item-card__name">{item.name}</div>
    </div>
  );
}

export default ItemCard;