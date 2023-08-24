import React, { useEffect } from "react";
import success from "../images/success.svg";
import fail from "../images/fail.svg";
import { usePopupClose } from "../hooks/usePopupClose";

function InfoTooltip({ isOpen, onClose, state }) {
  usePopupClose(isOpen, onClose);

  return (
    <div className={`popup popup_tooltip ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        />
        <img
          className="popup__tooltip-image"
          src={state ? success : fail}
          alt={state ? "success" : "fail"}
        />
        <h1 className="popup__tooltip-text">
          {state
            ? "Вы успешно зарегистрированы"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h1>
      </div>
    </div>
  );
}

export default InfoTooltip;
