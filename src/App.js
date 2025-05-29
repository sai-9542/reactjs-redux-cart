import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./componenets/Home";
import Navbar from "./componenets/Navbar";
import Layout from "./componenets/Layout";
import Notfound from "./componenets/Notfound";
import ProductShow from "./componenets/ProductShow";
import Category from "./componenets/Category";
import Cart from "./pages/Cart";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/cart" element={<Layout><Cart /></Layout>} />
        <Route path="/product/show/:id" element={<Layout><ProductShow /></Layout>} />
        <Route path="/category/:categoryName" element={<Layout><Category /></Layout>} />
        <Route path="*" element={<Layout><Notfound /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
