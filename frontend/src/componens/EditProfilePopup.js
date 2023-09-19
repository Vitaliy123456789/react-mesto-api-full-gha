import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { PopupWithForm } from "./PopupWithForm";
export function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);
  function nameChange(e) {
    setName(e.target.value);
  }
  function descriptionChange(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser(name, description);
  }
  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText={"Сохранить"}
      onSubmit={handleSubmit}
    >
      <input
        id="input-name"
        type="text"
        className="popup__input popup__input_title_name"
        value={name || ''}
        onChange={nameChange}
        name="name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
      />
      .<span id="input-name-error" className="popup__input-error"></span>
      <input
        type="text"
        id="input-job"
        className="popup__input popup__input_title_job"
        value={description || ''}
        onChange={descriptionChange}
        name="job"
        placeholder="Работа"
        minLength="2"
        maxLength="200"
        required
      />
      <span id="input-job-error" className="popup__input-error"></span>
    </PopupWithForm>
  );
}
