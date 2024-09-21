import React, { useContext } from "react";
import "./ItemCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemCard({ item, onSelectCard, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  if (!item || !item.imageUrl || !item.name) {
    console.error("Invalid item data:", item);
    return null;
  }

  const itemId = item._id;

  const isLiked = item.likes && Array.isArray(item.likes) && currentUser?.data?._id &&
    item.likes.includes(currentUser.data._id);

  const handleLike = (e) => {
    e.stopPropagation();
    if (typeof onCardLike === 'function') {
      onCardLike({ id: itemId, isLiked });
    }
  };

  return (
    <div className="item-card" onClick={() => onSelectCard(item)}>
      <div className="item-card__header">
        <div className="item-card__name">{item.name}</div>
        {currentUser?.data && (
          <button 
            className={`item-card__like-button ${isLiked ? 'item-card__like-button_active' : ''}`} 
            onClick={handleLike}
          >
            <span className="item-card__like-icon"></span>
          </button>
        )}
      </div>
      <img src={item.imageUrl} alt={item.name} className="item-card__image" />
    </div>
  );
}

export default ItemCard;