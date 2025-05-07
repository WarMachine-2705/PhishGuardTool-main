import React from "react";

const Navbar = ({ currentPage, setCurrentPage }) => {
    const navItems = [
        { id: "home", label: "Home", icon: "🏠" },
        { id: "phishguard", label: "PhishGuard", icon: "🛡️" },
        { id: "about", label: "About", icon: "ℹ️" }
    ];

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <div className="navbar-brand d-flex align-items-center">
                    <span className="me-2">🛡️</span>
                    <span className="fw-bold">PhishGuard</span>
                </div>
                <div>
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            className={`btn btn-link text-decoration-none me-3 ${
                                currentPage === item.id ? 'text-light' : 'text-secondary'
                            }`}
                            onClick={() => setCurrentPage(item.id)}
                        >
                            <span className="me-1">{item.icon}</span>
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;