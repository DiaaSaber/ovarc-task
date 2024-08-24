import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SideBar from "./components/SideBar";
import BookList from "./components/BookList";
import Stores from "./components/Stores";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex">
        <SideBar />
        <div className="flex-1 p-6">
          <Routes>
            <Route
              path="/"
              element={
                <div className="text-center">
                  <h2 className="text-2xl font-bold">Welcome to Book World</h2>
                  <p className="mt-4 text-gray-600">
                    Select a page from the sidebar to get started.
                  </p>
                </div>
              }
            />
            <Route path="/books" element={<BookList />} />
            <Route path="/stores" element={<Stores />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
