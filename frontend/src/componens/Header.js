import Vector from "../images/Vector.svg";
export function Header(props) {
  return (
    <header className="header">
      <img src={Vector} alt="логотип Mesto" className="header__img" />
      {props.children}
    </header>
  );
}
