import React, { useState, useRef, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { defaultTheme, themesOptions } from "./style/theme";
import { GlobalStyles } from "./style/global";
import TypeBox from "./components/features/TypeBox/TypeBox";
import Logo from "./components/common/Logo";
import FooterMenu from "./components/common/FooterMenu";
import {
  GAME_MODE,
  GAME_MODE_DEFAULT,
} from "./constants/Constants";
import useLocalPersistState from "./hooks/useLocalPersistState";


function App() {
  // localStorage persist theme setting
  const [theme, setTheme] = useState(() => {
    const stickyTheme = window.localStorage.getItem("theme");
    if (stickyTheme !== null) {
      const localTheme = JSON.parse(stickyTheme);
      const upstreamTheme = themesOptions.find(
        (e) => e.label === localTheme.label
      ).value;
      const isDeepEqual = localTheme === upstreamTheme;
      return isDeepEqual ? localTheme : upstreamTheme;
    }
    return defaultTheme;
  });

  // local persist game mode setting
  const [gameMode] = useLocalPersistState(
    GAME_MODE_DEFAULT,
    GAME_MODE
  );

  const isWordGameMode =
    gameMode === GAME_MODE_DEFAULT;
 
  const handleThemeChange = (e) => {
    window.localStorage.setItem("theme", JSON.stringify(e.value));
    setTheme(e.value);
  };

  

  const textInputRef = useRef(null);
  const focusTextInput = () => {
    textInputRef.current && textInputRef.current.focus();
  };

  const textAreaRef = useRef(null);
  const focusTextArea = () => {
    textAreaRef.current && textAreaRef.current.focus();
  };  

  
  
  useEffect(() => {
    if (isWordGameMode) {
      focusTextInput();
      return;
    }
    return;
  }, [
    theme,
    isWordGameMode,
  ]);



  return (
    <ThemeProvider theme={theme}>
      <>
        <div className="canvas">
          <GlobalStyles />
          <Logo></Logo>
          {isWordGameMode && (
            <TypeBox
              textInputRef={textInputRef}
              key="type-box"
              handleInputFocus={() => focusTextInput()}
            ></TypeBox>
          )}
          <div className="bottomBar">
            <FooterMenu
              themesOptions={themesOptions}
              theme={theme}
              handleThemeChange={handleThemeChange}
            ></FooterMenu>
          </div>
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
