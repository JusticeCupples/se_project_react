import React from "react";
import "./ItemCard.css";
import placeholder from "../../assets/logo.svg";

function ItemCard({ item, onSelectCard }) {
  const handleClick = () => {
    onSelectCard(item);
  };

  return (
    <div className="item-card" onClick={handleClick}>
      <img
        src={item.imageUrl}
        alt={item.name}
        className="item-card__image"
        onError={(e) => {
          e.target.src = placeholder;
        }}
      />
      <p className="item-card__name">{item.name}</p>
    </div>
  );
}

export default ItemCard;