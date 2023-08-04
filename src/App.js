import React from "react";
import ContactList from "./components/ContactList";
import './App.css';

const App = () => {
  return (
    <div className="app">
      <h1>Contact List App</h1>
      <ContactList />
    </div>
  );
};

export default App;