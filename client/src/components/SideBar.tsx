import React from "react";
import { NavLink } from "react-router-dom";

const SideBar: React.FC = () => {
  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="flex items-center justify-center mt-10">
        <span className="text-black font-bold text-xl ml-2">BOOK WORLD</span>
      </div>
      <nav className="mt-10">
        <NavLink
          to="/books"
          className={({ isActive }) =>
            isActive
              ? "block py-2.5 px-4 text-orange-500"
              : "block py-2.5 px-4 text-gray-500 hover:text-orange-500"
          }
        >
          <i className="fas fa-book mr-3"></i>
          Books
        </NavLink>
        <NavLink
          to="/stores"
          className={({ isActive }) =>
            isActive
              ? "block py-2.5 px-4 text-orange-500"
              : "block py-2.5 px-4 text-gray-500 hover:text-orange-500"
          }
        >
          <i className="fas fa-store mr-3"></i>
          Stores
        </NavLink>
      </nav>
    </div>
  );
};

export default SideBar;
