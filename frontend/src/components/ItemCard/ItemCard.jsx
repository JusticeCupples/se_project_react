import React, { useContext, useEffect } from "react";
import "./ItemCard.css";
import heartIcon from "../../assets/heart.svg";
import filledHeartIcon from "../../assets/filled-heart.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemCard({ item, onSelectCard, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  if (!item || !item.imageUrl || !item.name) {
    console.error("Invalid item data:", item);
    return null;
  }

  const isLiked = item.likes && Array.isArray(item.likes) && currentUser?.data?._id && item.likes.includes(currentUser.data._id);

  useEffect(() => {
    console.log('ItemCard useEffect:', { itemId: item._id || item.id, isLiked, likes: item.likes, currentUser: currentUser?.data?._id });
  }, [item, isLiked, currentUser]);

  const handleLike = (e) => {
    e.stopPropagation();
    onCardLike({ id: item._id || item.id, isLiked });
  };

  return (
    <div className="item-card" onClick={() => onSelectCard(item)}>
      <div className="item-card__name">{item.name}</div>
      <img src={item.imageUrl} alt={item.name} className="item-card__image" />
      {currentUser?.data && (
        <button className={`item-card__like-button ${isLiked ? 'item-card__like-button_active' : ''}`} onClick={handleLike}>
          <img src={isLiked ? filledHeartIcon : heartIcon} alt="like" />
        </button>
      )}
    </div>
  );
}

export default ItemCard;