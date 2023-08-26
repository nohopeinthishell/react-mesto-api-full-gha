import React from "react";
import PopupWithForm from "./PopupWithForm";
import { AppContext } from "../contexts/AppContext";

function DeleteCardPopup({card, isOpen, onDelete}) {

  function handleSubmit(e) {
    e.preventDefault();
    onDelete(card)
  }

  const { isLoading, closeAllPopups } = React.useContext(AppContext);
  return (
    <PopupWithForm
      name={"delete"}
      title={"Вы уверены?"}
      isOpen={isOpen}
      buttonText={isLoading ? "Удаление..." : "Удалить"}
      onClose={closeAllPopups}
      onSubmit={handleSubmit}
    >
    </PopupWithForm>
  );
}

export default DeleteCardPopup;