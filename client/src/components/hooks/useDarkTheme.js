import React, { createContext, useContext, useState } from 'react';
import {
    lightBlue,
    blue,
    deepPurple,
  } from "@material-ui/core/colors";

import { createMuiTheme } from "@material-ui/core/styles";

const DarkThemeContext = createContext();

const DarkTheme = (props) => {
    const [darkState, setDarkState] = useState(false);

    const palletType = darkState ? "dark" : "light";
    const mainPrimaryColor = darkState ? deepPurple[500] : blue[500];
    const mainSecondaryColor = darkState ? deepPurple[300] : blue[900];

    const darkTheme = createMuiTheme({
      palette: {
        type: palletType,
        primary: {
          main: mainPrimaryColor
        },
        secondary: {
          main: mainSecondaryColor
        }
      }
    });

    return (
    <DarkThemeContext.Provider value={{        
        darkState,
        setDarkState,
        darkTheme
    }}>
        {props.children}
    </DarkThemeContext.Provider>
    )
};

const useDarkTheme = () => useContext(DarkThemeContext);

export {DarkTheme, useDarkTheme};