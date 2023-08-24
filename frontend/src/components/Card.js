import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `places__like-button ${
    isLiked && "places__like-button_active"
  }`;

  return (
    <li className="places__card">
      <img
        alt={card.name}
        src={card.link}
        className="places__image"
        onClick={() => onCardClick({ link: card.link, name: card.name })}
      />
      <div className="places__items">
        <h2 className="places__text">{card.name}</h2>
        <div className="places__like" onClick={() => onCardLike(card)}>
          <button className={cardLikeButtonClassName} type="button" />
          <p className="places__like-count">{card.likes.length}</p>
        </div>
        {isOwn && (
          <button
            className="places__delete-button"
            type="button"
            onClick={() => onCardDelete(card)}
          />
        )}
      </div>
    </li>
  );
}

export default Card;
