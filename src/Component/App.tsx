import React from 'react';
import './App.css';
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";


function App() {
  return (
    <div className="appWrapper">
      <Header/>
      <Main/>
      <Footer/>
    </div>
  );
}

export default App;
