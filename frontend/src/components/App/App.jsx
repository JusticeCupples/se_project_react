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
import { Routes, Route } from "react-router-dom";
import { getItems, addItem, deleteItem } from "../../utils/api";
import { defaultClothingItems } from "../../utils/constants";
function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState({ C: 0, F: 0 });
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [cards, setCards] = useState([]);
  const [currentDate, setCurrentDate] = useState("");

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

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data);
        setTemp(temperature);
      })
      .catch((err) => console.error("Error fetching weather:", err));
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        let itemsToUse = Array.isArray(data) ? data : (data.data || []);
        const normalizedItems = itemsToUse.map((item) => ({
          ...item,
          id: item._id || `default_${item.id}`,
        }));
        const uniqueItems = [...normalizedItems, ...defaultClothingItems.filter(item => !normalizedItems.some(ni => ni.name === item.name))];
        setCards(uniqueItems);
      })
      .catch((err) => {
        console.error("Error fetching items:", err);
        setCards(defaultClothingItems);
      });
  }, []);

  useEffect(() => {
    const date = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(date);
  }, []);
  return (
    <div className="app">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header
          onCreateModal={handleCreateModal}
          temp={temp}
          currentDate={currentDate}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Main
                weatherTemp={temp}
                onSelectCard={handleSelectedCard}
                clothingItems={cards}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                weatherTemp={temp}
                onSelectCard={handleSelectedCard}
                clothingItems={cards}
                onCreateModal={handleCreateModal}
              />
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
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}
export default App;