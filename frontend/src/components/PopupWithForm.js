import React from "react";
import { usePopupClose } from "../hooks/usePopupClose";

function PopupWithForm({
  title,
  name,
  children,
  isOpen,
  onSubmit,
  buttonText,
  onClose,
}) {
  usePopupClose(isOpen, onClose);
  return (
    <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        />
        <form
          className={`popup__form popup__form_${name}`}
          name={name}
          onSubmit={onSubmit}
        >
          <h2 className="popup__edit-text">{title}</h2>
          {children}
          <button
            type="submit"
            className={`popup__submit popup__submit_${name}`}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
