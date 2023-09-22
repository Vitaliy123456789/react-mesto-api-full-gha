import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(card);
  };
  const handleLikeClick = () => {
    onCardLike(card);
  };
  const handleDelete = () => {
    onCardDelete(card);
  };
  const isOwn = card.owner === currentUser.ID;
  const isLiked = card.likes.some((i) => i.id === currentUser._id);
  const cardLikeButtonClassName = `elements__group-button ${
    isLiked && "elements__group-button_active"
  }`;
  return (
    <div className="elements__element">
      {isOwn && (
        <button
          type="button"
          className="elements__button-delite"
          onClick={handleDelete}
        ></button>
      )}
      <img
        src={card.link}
        alt={card.name}
        className="elements__element-img"
        onClick={handleCardClick}
      />
      <div className="elements__group">
        <h3 className="elements__group-title">{card.name}</h3>
        <div className="elements__likes">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <h3 className="elements__number-like">{card.likes.length}</h3>
        </div>
      </div>
    </div>
  );
}

export default Card;
