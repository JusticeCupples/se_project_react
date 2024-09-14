import React from "react";

const CurrentTemperatureUnitContext = React.createContext({
  currentTemperatureUnit: "F",
  handleToggleSwitchChange: () => {},
});

export { CurrentTemperatureUnitContext };
