import { useState } from "react";
import GlobalStyle from "./styles/GlobalStyle";
import HomePage from "./pages/home/Home";
import Layouts from "./layouts/Layouts";

function App() {
  return (
    <>
      <GlobalStyle />
      <Layouts>
        <HomePage />
      </Layouts>
    </>
  );
}

export default App;
