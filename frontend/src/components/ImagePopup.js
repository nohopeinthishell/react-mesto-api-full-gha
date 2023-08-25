import React from "react";
import { usePopupClose } from "../hooks/usePopupClose";

function ImagePopup({ card, isOpen, onClose }) {
  usePopupClose(isOpen, onClose);
  return (
    <div className={`popup popup_image ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__image-container">
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        />
        <img src={card.link} alt={card.name} className="popup__place-image" />
        <h2 className="popup__image-title">{card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
