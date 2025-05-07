import React, { useState } from "react";
//import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PhishguardPage from "./pages/PhishguardPage";
import About from "./pages/About";
import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home />;
      case "phishguard":
        return <PhishguardPage />;
      case "about":
        return <About />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-light">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-grow-1 container py-4">
        {renderPage()}
      </main>
      <footer className="bg-dark border-top py-3 text-center">
        <p className="text-muted">© 2025 PhishGuard - Protecting your inbox from phishing attempts</p>
      </footer>
    </div>
  );
};

export default App;