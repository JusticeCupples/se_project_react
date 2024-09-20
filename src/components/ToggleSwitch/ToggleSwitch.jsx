import React, { useContext } from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <label className="switch">
      <input
        type="checkbox"
        className="switch_box"
        onChange={handleToggleSwitchChange}
      />
      <span
        className={
          currentTemperatureUnit === "F"
            ? "switch_slider switch_slider-F"
            : "switch_slider switch_slider-C"
        }
      ></span>
      <p
        className={`switch_temp-F ${
          currentTemperatureUnit === "F" ? "switch_active" : ""
        }`}
      >
        F
      </p>
      <p
        className={`switch_temp-C ${
          currentTemperatureUnit === "C" ? "switch_active" : ""
        }`}
      >
        C
      </p>
    </label>
  );
};

export default ToggleSwitch;
