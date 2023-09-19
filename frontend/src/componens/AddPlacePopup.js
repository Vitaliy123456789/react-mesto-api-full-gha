import React from "react";
import { PopupWithForm } from "./PopupWithForm";
export function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setlink] = React.useState("");
  function nameChange(e) {
    setName(e.target.value);
  }
  function linkChange(e) {
    setlink(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({ name, link });
  }
  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText={"Сохранить"}
      onSubmit={handleSubmit}
    >
      <input
        id="input-cardname"
        type="text"
        className="popup__input popup-cards__input popup-cards__input_name"
        name="name"
        value={name}
        onChange={nameChange}
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span id="input-cardname-error" className="popup__input-error"></span>
      <input
        type="url"
        id="input-cardurl"
        className="popup__input popup-cards__input popup-cards__input_url"
        name="link"
        value={link}
        onChange={linkChange}
        placeholder="Ссылка на картинку"
        required
      />
      <span id="input-cardurl-error" className="popup__input-error"></span>
    </PopupWithForm>
  );
}
