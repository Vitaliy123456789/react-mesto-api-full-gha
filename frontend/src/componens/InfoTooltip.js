
export function InfoTooltip(props){
  return(
    <div className={`popup ${
      props.isOpen ? `popup_opened` : ""
    }`}>
      <div className="popup__container popup__container_infoTooltip">
        <img className="popup__img" src={props.img} alt="успешная регистрация"/>
        <h2 className="popup__title popup__title_infoTooltip">{props.title}</h2>
        <button className="popup__button"  onClick={props.onClose}></button>
      </div>
    </div>
  )
}