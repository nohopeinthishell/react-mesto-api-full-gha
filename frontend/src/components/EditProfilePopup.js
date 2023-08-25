import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { AppContext } from "../contexts/AppContext";
import { useForm } from "../hooks/useForm";

function EditProfilePopup({ isOpen, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const { isLoading, closeAllPopups } = React.useContext(AppContext);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: job,
    });
  }

  const { values, handleChange, setValues } = useForm({ name: "", job: "" });
  const { name, job } = values;

  React.useEffect(() => {
    setValues({ name: currentUser.name, job: currentUser.about });
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name={"profile"}
      title={"Редактировать профиль"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      onClose={closeAllPopups}
    >
      <label className="popup__label">
        <input
          value={name || ""}
          onChange={handleChange}
          type="text"
          className="popup__input popup__input_type_name"
          id="name-input"
          name="name"
          placeholder="Введите имя"
          required=""
          minLength={2}
          maxLength={40}
        />
        <span className="popup__input-error name-input-error"></span>
      </label>
      <label className="popup__label">
        <input
          value={job || ""}
          onChange={handleChange}
          type="text"
          className="popup__input popup__input_type_job"
          id="job-input"
          name="job"
          placeholder="Введите описание"
          required=""
          minLength={2}
          maxLength={200}
        />
        <span className="popup__input-error job-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
