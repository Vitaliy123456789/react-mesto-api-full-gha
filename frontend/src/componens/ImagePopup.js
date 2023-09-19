export function ImagePopup(props) {
  return (
    <div
      className={`popup popup-opencard ${props.isOpen ? `popup_opened` : ""}`}
    >
      <div className="popup__container popup-opencard__container popup__container_none-color">
        <button
          className="popup__button popup-opencard__button"
          onClick={props.onClose}
        ></button>
        <img
          alt={props.card.name}
          src={props.card.link}
          className="popup-opencard__img"
        />
        <h3 className="popup-opencard__title">{props.card.name}</h3>
      </div>
    </div>
  );
}
