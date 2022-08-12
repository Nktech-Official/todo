import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import theme, { colorConfig } from "./themes";
const root = ReactDOM.createRoot(document.getElementById("root"));

function Index() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <ColorModeScript initialColorMode={colorConfig.initialColorMode} />
        <App />
      </BrowserRouter>
    </ChakraProvider>
  );
}

root.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
