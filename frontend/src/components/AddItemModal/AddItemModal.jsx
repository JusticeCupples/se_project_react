import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ handleCloseModal, onAddItem, isOpen }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName("");
      setImageUrl("");
      setWeather("");
    }
  }, [isOpen]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { name, imageUrl, weather };
    onAddItem(newItem);
  };

  return (
    <ModalWithForm
      title="New Garment"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      buttonText="Add garment"
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          name="name"
          placeholder="Name"
          minLength="1"
          maxLength="30"
          value={name}
          onChange={handleNameChange}
          required
          className="modal__input"
        />
      </label>
      <label className="modal__label">
        Image
        <input
          type="url"
          name="imageUrl"
          placeholder="Image URL"
          minLength="1"
          maxLength="300"
          value={imageUrl}
          onChange={handleImageUrlChange}
          required
          className="modal__input"
        />
      </label>
      <p>Select the weather type:</p>
      <div className="modal__radio-buttons">
        <div className="modal__radio-button">
          <input
            type="radio"
            id="hot"
            value="hot"
            name="weather"
            checked={weather === "hot"}
            onChange={handleWeatherChange}
            className="modal__radio-input"
          />
          <label className="modal__radio-label" htmlFor="hot">
            Hot
          </label>
        </div>
        <div className="modal__radio-button">
          <input
            type="radio"
            id="warm"
            value="warm"
            name="weather"
            checked={weather === "warm"}
            onChange={handleWeatherChange}
            className="modal__radio-input"
          />
          <label className="modal__radio-label" htmlFor="warm">
            Warm
          </label>
        </div>
        <div className="modal__radio-button">
          <input
            type="radio"
            id="cold"
            value="cold"
            name="weather"
            checked={weather === "cold"}
            onChange={handleWeatherChange}
            className="modal__radio-input"
          />
          <label className="modal__radio-label" htmlFor="cold">
            Cold
          </label>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;