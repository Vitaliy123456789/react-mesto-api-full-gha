import React from "react";
import { Main } from "./Main";
import { Footer } from "./Footer";
import { PopupWithForm } from "./PopupWithForm";
import { ImagePopup } from "./ImagePopup";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CurrentCardContext } from "../contexts/CurrentCardContext";
import { EditProfilePopup } from "./EditProfilePopup";
import { EditAvatarPopup } from "./EditAvatarPopup";
import { AddPlacePopup } from "./AddPlacePopup";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Login } from "./Login"
import { Register } from "./Register";
import * as auth from "../utils/auth";
import ProtectedRoute from "./ProtectedRoute";
import { InfoTooltip } from './InfoTooltip'
import Union from "../images/Union.svg";
import Error from "../images/Union1.svg";
function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [selectedCardData, setSelectedCardData] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const navigate = useNavigate()
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [infoTooltipImg,  setInfoTooltipImg] = React.useState("");
  const [infoTooltipTitle, setInfoTooltipTitle] = React.useState("");
  const [InfoTooltipPopupOpen, setInfoTooltipPopupOpen] = React.useState(false);
  
  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([data, cards]) => {
          setCurrentUser(data);
          setCards(cards);
        })
        .catch((err) => {
          console.error(err);
        })
    }
  }, [loggedIn]);
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((res) => {
        setCards((state) => state.filter((res) => res._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const handleEditProfileClick = React.useCallback(() => {
    setIsEditProfilePopupOpen(true);
  });
  const handleAddPlaceClick = React.useCallback(() => {
    setIsAddPlacePopupOpen(true);
  });
  const handleEditAvatarClick = React.useCallback(() => {
    setIsEditAvatarPopupOpen(true);
  });
  const handleCardClick = React.useCallback((data) => {
    setSelectedCardData(data);
    setSelectedCard(true);
  });
  const closeAllPopups = React.useCallback(() => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(false);
    setInfoTooltipPopupOpen(false)
  });
  const handleInfoTooltip = React.useCallback(() => {
    setInfoTooltipPopupOpen(true);
  });
  function handleUpdateUser(name, discription) {
    api
      .editingUserProfile(name, discription)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleUpdateAvatar(data) {
    api
      .getUserAvatar(data)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleAddPlaceSubmit({ name, link }) {
    api
      .getCreateCards({ name, link })
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function onRegister(email, password){
    return auth.register(email, password).then((res)=>{
      setInfoTooltipImg(Union);
      setInfoTooltipTitle("Вы успешно зарегистрировались!")
      navigate("/sign-in")
    }).catch((err) => {
      console.log(err)
      setInfoTooltipImg(Error);
      setInfoTooltipTitle("Что-то пошло не так! Попробуйте ещё раз")
      }).finally(handleInfoTooltip());
  }
  function onLogin(email, password){
    return auth.authorization(email, password).then((res)=>{
      localStorage.setItem("jwt", res.token)
      console.log(res.token)
      setLoggedIn(true)
      navigate("/")
      setEmail(email)
    }).catch((err) => console.log(err))};
  React.useEffect(() => {
    tokenCheck();
  }, []);
  function tokenCheck(){
    const token = localStorage.getItem("jwt");
    if (token){
      return auth.checkToken(token).then((res) => {
        if (res) {
          setLoggedIn(true);
          setEmail(res.email)
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }
    }
    function exit(){
      localStorage.removeItem("jwt");
    setLoggedIn(false);
    navigate("/sign-in")
    }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentCardContext.Provider value={cards}>
        <div className="page">
          <Routes>
            <Route path="/" element={<ProtectedRoute 
            loggedIn={loggedIn} 
            element={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            Exit={exit}
            email={email}
           />}/>
          <Route path="/sign-up" element={<Register onRegister={onRegister}/>}/>
          <Route path="/sign-in" element={<Login onLogin={onLogin}/>} />
          <Route
              path="*"
              element={
                loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
              }/>
          </Routes>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <PopupWithForm
            name="delete"
            title="Вы уверены?"
            buttonText={"Да"}
          ></PopupWithForm>
          <ImagePopup
            card={selectedCardData}
            isOpen={selectedCard}
            onClose={closeAllPopups}
          ></ImagePopup>
          <InfoTooltip 
            isOpen={InfoTooltipPopupOpen}
            onClose={closeAllPopups}
            img={infoTooltipImg}
            title={infoTooltipTitle}/>
        </div>
      </CurrentCardContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
