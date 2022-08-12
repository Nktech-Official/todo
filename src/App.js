import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Navbar from "./components/root/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <Box>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Box>
  );
}

export default App;
