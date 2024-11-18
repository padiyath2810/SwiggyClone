import React, { useState } from "react";
import logo from "../img/swiggy-img.png";
import "./Header.css";
import { ReactComponent as CartIcon } from "./cart-bag.svg";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnName, setBtnName] = useState("Sign In");

  const onlineStatus = useOnlineStatus();

  // subscribing to the store using a Selector

  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="header">
      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
      </div>
      <nav className="nav">
        <Link to="/corporate" className="nav-item">
          Swiggy Corporate
        </Link>

        <Link to="/contact" className="nav-item">
          Contact-Us
        </Link>
        <Link to="/about" className="nav-item">
          About
        </Link>
        <button
          className="nav-item sign-in"
          onClick={() => {
            btnName === "Sign In"
              ? setBtnName("Logout")
              : setBtnName("Sign In");
          }}
        >
          {btnName}
        </button>
        <Link className="nav-item cart-item" to="/cart">
          <CartIcon className="cart-icon" />
          Cart ({cartItems.length})
        </Link>
        <p> OnlineStatus:{onlineStatus ? "🟢" : "🔴"}</p>
      </nav>
    </div>
  );
};

export default Header;
