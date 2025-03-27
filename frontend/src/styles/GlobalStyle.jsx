import { createGlobalStyle } from "styled-components";
import { Fonts, Variables } from "./index";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&display=swap');

* {
    font-family: "Almarai", sans-serif;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    -webkit-tap-highlight-color: transparent;
}

html {
    font-size: 10px;
}

body {
    overflow-x: hidden;
    position: relative;
    /* background-color: var(--primary); */
}

${Fonts}

${Variables}

::-moz-selection { 
    color: var(--primary-50);
    background: var(--primary-500);
}

::selection {
    color: var(--primary-50);
    background: var(--primary-500);
}

::-webkit-scrollbar {
    width: 5px; 
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
    background: #555;
}
img {
  user-select: none;
  pointer-events: none;
  -webkit-user-drag: none;
}
.swiper-slide {
    margin-top: 0.5rem;
    width: 340px !important;
    &:first-child {
        margin-left: 2rem;
    } 
    &:last-child {
        margin-right: 2rem;
    } 
  }

`;

export default GlobalStyle;
