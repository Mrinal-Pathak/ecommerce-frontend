import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { createContext, useState } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Order from './components/Order';
import Product from './components/Product';
import Signup from './components/Signup';
import Profile from './components/Profile';
import AdminLogin from './components/AdminLogin';
import AdminDasboard from './components/AdminDasboard';
import AddProduct from './components/AddProduct';

export const LoginCheck = createContext();
export const Server=createContext();

// const serverUrl="http://localhost:5000"

function App() {

  const [status, setStatus] = useState(false);
  const [serverUrl]=useState("http://localhost:5000")

  const updateStatus = (newValue) => {
    setStatus(newValue);
  };

  return (
          <LoginCheck.Provider value={{ status, updateStatus }}>
          <Server.Provider value={{serverUrl}}> 
    <Router>

      <Navbar />
      <Routes>
          <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dasboard" element={<AdminDasboard />} />
        <Route path="/add-product" element={<AddProduct />} />

      </Routes>

    </Router>
    </Server.Provider>
      </LoginCheck.Provider>
  );
}

export default App;
