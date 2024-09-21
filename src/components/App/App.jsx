import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.svg";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import { getForecastWeather, parseWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { Routes, Route, Navigate } from "react-router-dom";
import { getItems, addItem, deleteItem, addCardLike, removeCardLike } from "../../utils/api";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { register, login, checkToken, updateProfile } from "../../utils/auth";
import ProtectedRoute from "../../ProtectedRoute/ProtectedRoute";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState({ C: 0, F: 0 });
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [cards, setCards] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleCreateModal = () => setActiveModal("create");
  const handleLoginModal = () => setActiveModal("login");
  const handleRegisterModal = () => setActiveModal("register");
  const handleEditProfileModal = () => setActiveModal("edit-profile");

  const handleCloseModal = () => setActiveModal("");

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const onAddItem = (newItem) => {
    if (!newItem.weather) {
      console.error("Weather property is missing");
      alert("Failed to add item. Weather information is required.");
      return;
    }
    addItem(newItem)
      .then((addedItem) => {
        setCards((prevCards) => [addedItem.data, ...prevCards]);
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Error adding item:", err);
        alert("Failed to add item. Please try again.");
      });
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));
  };

  const handleDeleteCard = (cardToDelete) => {
    deleteItem(cardToDelete._id)
      .then(() => {
        setCards((prevCards) =>
          prevCards.filter((card) => card._id !== cardToDelete._id)
        );
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Error deleting card:", err);
        alert("Failed to delete item. Please try again.");
      });
  };
  const handleAddItemSubmit = (newItem) => {
    onAddItem(newItem);
  };

  const handleLogin = ({ email, password }) => {
    login({ email, password })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          checkTokenValidity();
          setActiveModal("");
        }
      })
      .catch((err) => console.error(err));
  };

  const handleRegister = ({ email, password, name, avatar }) => {
    register({ email, password, name, avatar })
      .then(() => {
        handleLogin({ email, password });
        setActiveModal("");
      })
      .catch((err) => console.error(err));
  };

  const handleUpdateUser = ({ name, avatarUrl }) => {
    const validatedAvatarUrl = validateAvatarUrl(avatarUrl);
    console.log("Updating user with:", { name, avatar: validatedAvatarUrl });
    updateProfile({ name, avatar: validatedAvatarUrl })
      .then((updatedUser) => {
        console.log("Updated user data:", updatedUser);
        setCurrentUser({ data: updatedUser.data });
        setActiveModal("");
      })
      .catch((err) => {
        console.error("Error updating user:", err);
        alert("Failed to update profile. Please try again.");
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const checkTokenValidity = () => {
    const jwt = localStorage.getItem("jwt");
    console.log("Checking token validity. JWT exists:", !!jwt);
    if (jwt) {
      checkToken(jwt)
        .then((userData) => {
          console.log("User data received:", userData);
          setCurrentUser(userData);
          setIsLoggedIn(true);
          console.log("Current user set:", userData);
        })
        .catch((err) => {
          console.error("Error checking token:", err);
          setCurrentUser(null);
          setIsLoggedIn(false);
        });
    } else {
      console.log("No JWT found in localStorage");
      setCurrentUser(null);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    console.log("App - Current User:", currentUser);
  }, [currentUser]);

  useEffect(() => {
    checkTokenValidity();
  }, []);

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data);
        setTemp({ ...temperature, city: data.name });
      })
      .catch((err) => console.error("Error fetching weather:", err));
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getItems()
        .then((data) => {
          console.log("Data received in App.jsx:", data);
          let itemsToUse = Array.isArray(data.data) ? data.data : [];
          setCards(itemsToUse);
        })
        .catch((err) => {
          console.error("Error fetching items:", err);
          setCards([]);
        });
    } else {
      setCards([]);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const date = new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
    setCurrentDate(date);
  }, []);

  const handleCardLike = ({ id, isLiked }) => {
    if (!currentUser || !currentUser.data) {
      console.error("User not logged in");
      return;
    }

    const userId = currentUser.data._id;

    setCards((prevCards) =>
      prevCards.map((card) => {
        if (card._id === id) {
          const updatedLikes = isLiked
            ? (card.likes || []).filter((likeId) => likeId !== userId)
            : [...(card.likes || []), userId];
          return { ...card, likes: updatedLikes };
        }
        return card;
      })
    );

    const likeMethod = isLiked ? removeCardLike : addCardLike;
    likeMethod(id)
      .then((updatedCard) => {
        setCards((prevCards) =>
          prevCards.map((card) => (card._id === id ? updatedCard.data : card))
        );
      })
      .catch((err) => {
        console.error("Error updating like on server:", err);
        setCards((prevCards) =>
          prevCards.map((card) => {
            if (card._id === id) {
              const revertedLikes = isLiked
                ? [...(card.likes || []), userId]
                : (card.likes || []).filter((likeId) => likeId !== userId);
              return { ...card, likes: revertedLikes };
            }
            return card;
          })
        );
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header
            onCreateModal={handleCreateModal}
            temp={temp}
            city={temp.city}
            currentDate={currentDate}
            isLoggedIn={isLoggedIn}
            onLoginClick={handleLoginModal}
            onRegisterClick={handleRegisterModal}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherTemp={temp}
                  onSelectCard={handleSelectedCard}
                  clothingItems={cards}
                  onCardLike={handleCardLike}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    weatherTemp={temp}
                    onSelectCard={handleSelectedCard}
                    clothingItems={cards}
                    onCreateModal={handleCreateModal}
                    onEditProfile={handleEditProfileModal}
                    onLogout={handleLogout}
                    onCardLike={handleCardLike}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>

          <Footer />
          {activeModal === "create" && (
            <AddItemModal
              handleCloseModal={handleCloseModal}
              onAddItem={onAddItem}
              isOpen={activeModal === "create"}
            />
          )}
          {activeModal === "preview" && selectedCard && (
            <ItemModal
              activeModal={activeModal}
              onClose={handleCloseModal}
              card={selectedCard}
              onDelete={handleDeleteCard}
            />
          )}
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={handleCloseModal}
            onLogin={handleLogin}
            onSignupClick={handleRegisterModal}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={handleCloseModal}
            onRegister={handleRegister}
            onLoginClick={handleLoginModal}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={handleCloseModal}
            onUpdateUser={handleUpdateUser}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}


const validateAvatarUrl = (url) => {
  if (url.includes('ibb.co')) {
    const id = url.split('/').pop();
    return `https://i.ibb.co/${id}/${id}.jpg`;
  }
  return url;
};

export default App;