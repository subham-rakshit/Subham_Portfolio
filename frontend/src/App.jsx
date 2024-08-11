import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Header } from "./components";
import { About, Contact, Home, Projects } from "./pages";

function App() {
  return (
    <div className="w-full min-h-screen bg-zinc-900">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact-me" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
