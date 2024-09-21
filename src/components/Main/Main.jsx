import React, { useMemo, useContext } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Main.css";

function Main({ weatherTemp, onSelectCard, clothingItems, onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const currentUser = useContext(CurrentUserContext);

  const temp = weatherTemp?.temperature?.[currentTemperatureUnit] || "N/A";
  const fahrenheitTemp = weatherTemp?.temperature?.F || 0;

  const weatherType = useMemo(() => {
    if (fahrenheitTemp >= 86) {
      return "hot";
    } else if (fahrenheitTemp >= 66 && fahrenheitTemp <= 85) {
      return "warm";
    } else if (fahrenheitTemp <= 65) {
      return "cold";
    }
    return "";
  }, [fahrenheitTemp]);

  const filteredCards = useMemo(() => {
    return clothingItems.filter(
      (item) => item.weather && item.weather.toLowerCase() === weatherType
    );
  }, [clothingItems, weatherType]);

  return (
    <main className="main">
      <WeatherCard weatherData={weatherTemp} />
      <section className="card__section" id="card-section">
        <p className="card__text">
          Today is {temp}&deg; {currentTemperatureUnit} / You may want to wear:
        </p>
        <div className="card__items">
          {filteredCards.map((item, index) => (
            <ItemCard
              key={`${item._id || item.id || index}`}
              item={item}
              onSelectCard={onSelectCard}
              onCardLike={onCardLike}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
