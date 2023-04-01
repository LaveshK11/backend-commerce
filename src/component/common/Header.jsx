import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
     <header>
        <div className="container_header">
          <img src="amazon-logo.png" alt="Amazon Logo" />
          <div className="search-box">
            <input type="text" placeholder="Search" />
            <button>Search</button>
          </div>
          <nav>
            <ul>
              <li><Link to="/register">Hello, Sign in</Link></li>
              <li><Link to="/orders">Orders</Link></li>
              <li><Link to="/cart">Cart</Link></li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Header;
