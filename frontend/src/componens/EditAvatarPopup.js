import React from "react";
import { PopupWithForm } from "./PopupWithForm";
export function EditAvatarPopup(props) {
  const refAvatar = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: refAvatar.current.value,
    });
  }
  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText={"Сохранить"}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        id="input-avatarurl"
        className="popup__input popup-avatar__input popup-avatar__input_url"
        name="avatar"
        placeholder="Ссылка на картинку"
        ref={refAvatar}
        required
      />
      <span id="input-avatarurl-error" className="popup__input-error"></span>
    </PopupWithForm>
  );
}
