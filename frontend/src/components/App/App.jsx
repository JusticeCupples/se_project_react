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
import { defaultClothingItems } from "../../utils/constants";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { register, login, checkToken, updateProfile } from "../../utils/auth";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState({ C: 0, F: 0 });
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [cards, setCards] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

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
          setIsLoginModalOpen(false);
        }
      })
      .catch((err) => console.error(err));
  };

  const handleRegister = ({ email, password, name, avatar }) => {
    register({ email, password, name, avatar })
      .then(() => {
        handleLogin({ email, password });
        setIsRegisterModalOpen(false);
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
        setIsEditProfileModalOpen(false);
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
    getItems()
      .then((data) => {
        let itemsToUse = Array.isArray(data) ? data : (data.data || []);
        const normalizedItems = itemsToUse
          .filter(item => item.imageUrl && item.name)
          .map((item) => ({
            ...item,
            id: item._id || `default_${item.id}`,
          }));
        const uniqueItems = [
          ...normalizedItems,
          ...defaultClothingItems.filter(item => !normalizedItems.some(ni => ni.name === item.name))
        ];
        setCards(uniqueItems);
      })
      .catch((err) => {
        console.error("Error fetching items:", err);
        setCards(defaultClothingItems);
      });
  }, []);

  useEffect(() => {
    const date = new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
    setCurrentDate(date);
  }, []);

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    if (!currentUser || !currentUser.data) {
      console.error("User not logged in");
      return;
    }
    console.log("Liking item with ID:", id);
    if (typeof id === 'number' || (typeof id === 'string' && id.startsWith('default_'))) {
      const numericId = typeof id === 'number' ? id : parseInt(id.split('_')[1]);
      setCards(cards => cards.map(card => {
        if (card.id === numericId || card._id === numericId || card._id === id) {
          const updatedLikes = isLiked
            ? (card.likes || []).filter(likeId => likeId !== currentUser.data._id)
            : [...(card.likes || []), currentUser.data._id];
          return { ...card, likes: updatedLikes };
        }
        return card;
      }));
    } else {
      const likeMethod = isLiked ? removeCardLike : addCardLike;
      likeMethod(id, token)
        .then((updatedCard) => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card._id === id ? { ...card, likes: updatedCard.data.likes } : card
            )
          );
        })
        .catch((err) => {
          console.error("Error updating like:", err);
          console.log("Failed item ID:", id);
        });
    }
  };

  const handleEditProfileModal = () => {
    setIsEditProfileModalOpen(true);
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
            onLoginClick={() => setIsLoginModalOpen(true)}
            onRegisterClick={() => setIsRegisterModalOpen(true)}
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
                isLoggedIn ? (
                  <Profile
                    weatherTemp={temp}
                    onSelectCard={handleSelectedCard}
                    clothingItems={cards}
                    onCreateModal={handleCreateModal}
                    onEditProfile={handleEditProfileModal}
                    onLogout={handleLogout}
                    onCardLike={handleCardLike}
                  />
                ) : (
                  <Navigate to="/" />
                )
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
          {activeModal === "preview" && (
            <ItemModal
              activeModal={activeModal}
              onClose={handleCloseModal}
              card={selectedCard}
              onDelete={handleDeleteCard}
            />
          )}
          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
            onLogin={handleLogin}
            onSignupClick={() => {
              setIsLoginModalOpen(false);
              setIsRegisterModalOpen(true);
            }}
          />
          <RegisterModal
            isOpen={isRegisterModalOpen}
            onClose={() => setIsRegisterModalOpen(false)}
            onRegister={handleRegister}
            onLoginClick={() => {
              setIsRegisterModalOpen(false);
              setIsLoginModalOpen(true);
            }}
          />
          <EditProfileModal
            isOpen={isEditProfileModalOpen}
            onClose={() => setIsEditProfileModalOpen(false)}
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