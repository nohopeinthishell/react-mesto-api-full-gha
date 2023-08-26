import logo from "../logo.svg";
import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CurrentCardsContext } from "../contexts/CurrentCardsContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { AppContext } from "../contexts/AppContext";
import Login from "./Login";
import { Routes, Route, useNavigate } from "react-router-dom";
import Register from "./Register";
import ProtectedRouteElement from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/Auth";
import DeleteCardPopup from "./DeleteCardPopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [currentCards, setCurrentCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [stateTooltip, setStateTooltip] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const navigate = useNavigate();

  function setInitialData(token) {
    api
    .getProfileInfo(token)
    .then((profileInfo) => {
      setCurrentUser(profileInfo);
    })
    .catch((err) => console.log(err));
    api
    .getInitialCards(token)
    .then((initialCards) => {
      setCurrentCards(initialCards.reverse());
    })
    .catch((err) => console.log(err));
  }

  function signOut() {
    localStorage.removeItem("token");
    setEmail("");
    navigate("/signin");
  }

  function handleLogin(email) {
    setEmail(email);
    setLoggedIn(true);
  }

  function handleInfoTooltipOpen(state) {
    setIsInfoTooltipOpen(true);
    setStateTooltip(state);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleDeleteClick(card) {
    setIsDeletePopupOpen(true);
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setIsDeletePopupOpen(false);
  }

  function handleCardLike(card) {
    const token = localStorage.getItem("token");
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked, token)
      .then((newCard) => {
        setCurrentCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }
  function handleCardDelete(card) {
    const token = localStorage.getItem("token");
    function makeRequest() {
      return api
      .deleteCard(card._id, token)
      .then(() => {
        setCurrentCards((state) => 
        state.filter((item) => item._id !== card._id)
        );
      })}
      handleSubmit(makeRequest)
  }

  function handleUpdateUser(data) {
    const token = localStorage.getItem("token");
    function makeRequest() {
      return api
        .updateProfile(data, token)
        .then((profileInfo) => {
          setCurrentUser(profileInfo);
        })
    }
    handleSubmit(makeRequest);
  }

  function handleUpdateAvatar(data) {
    const token = localStorage.getItem("token");
    function makeRequest() {
      return api
        .updateAvatar(data, token)
        .then((profileInfo) => {
          setCurrentUser(profileInfo);
        })
    }
    handleSubmit(makeRequest);
  }

  function handleAddPlaceSubmit(data) {
    const token = localStorage.getItem("token");
    function makeRequest() {
      return api
        .postNewCard(data, token)
        .then((newCard) => {
          setCurrentCards([newCard, ...currentCards]);
        })
    }
    handleSubmit(makeRequest);
  }

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(closeAllPopups)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          if (res) {
            setInitialData(token)
            setEmail(res.email);
            setLoggedIn(true);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => console.log(err));
    }
  }

  React.useEffect(() => {
    tokenCheck();
  }, []);

  return (
    <AppContext.Provider value={{ isLoading, closeAllPopups }}>
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentCardsContext.Provider value={currentCards}>
          <div className="page">
            <Header email={email} signOut={signOut} />
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRouteElement
                    element={Main}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleDeleteClick}
                    loggedIn={loggedIn}
                  />
                }
              />
              <Route
                path="/signup"
                element={<Register onInfoTooltip={handleInfoTooltipOpen} />}
              />
              <Route
                path="/signin"
                element={<Login handleLogin={handleLogin} setInitialData={setInitialData} onInfoTooltip={handleInfoTooltipOpen}/>}
              />
            </Routes>

            <Footer />
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onUpdateUser={handleUpdateUser}
            />
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onUpdateAvatar={handleUpdateAvatar}
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
            />
            <DeleteCardPopup 
             card={selectedCard}
             isOpen={isDeletePopupOpen}
             onDelete={handleCardDelete}
            />
            <ImagePopup
              card={selectedCard}
              isOpen={isImagePopupOpen}
              onClose={closeAllPopups}
            />
            <InfoTooltip
              isOpen={isInfoTooltipOpen}
              onClose={closeAllPopups}
              state={stateTooltip}
            />
          </div>
        </CurrentCardsContext.Provider>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
