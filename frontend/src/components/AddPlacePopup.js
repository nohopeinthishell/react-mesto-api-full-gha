import React from "react";
import PopupWithForm from "./PopupWithForm";
import { AppContext } from "../contexts/AppContext";
import { useForm } from "../hooks/useForm";

function AddPlacePopup({ isOpen, onAddPlace }) {
  const { values, handleChange, setValues } = useForm({ name: "", link: "" });
  const { name, link } = values;

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link,
    });
  }

  const { isLoading, closeAllPopups } = React.useContext(AppContext);

  return (
    <PopupWithForm
      name={"cards"}
      title={"Новое место"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Создание..." : "Создать"}
      onClose={closeAllPopups}
    >
      <label className="popup__label">
        <input
          onChange={handleChange}
          value={name}
          type="text"
          className="popup__input popup__input_type_title"
          id="title-input"
          name="name"
          placeholder="Название"
          required=""
          minLength={2}
          maxLength={30}
        />
        <span className="popup__input-error title-input-error" />
      </label>
      <label className="popup__label">
        <input
          onChange={handleChange}
          value={link}
          type="url"
          className="popup__input popup__input_type_link"
          id="link-input"
          name="link"
          placeholder="Ссылка на картинку"
          required=""
        />
        <span className="popup__input-error link-input-error" />
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
