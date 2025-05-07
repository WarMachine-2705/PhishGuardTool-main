import React from "react";

const Home = () => {
    const steps = [
        {
            id: 1,
            title: "Connect Your Email",
            description: "Enter your email and app password to securely scan your inbox.",
            icon: "📧"
        },
        {
            id: 2,
            title: "Smart Detection",
            description: "Our algorithm analyzes emails for common phishing patterns and suspicious links.",
            icon: "🔍"
        },
        {
            id: 3,
            title: "Stay Protected",
            description: "Get detailed reports about potential threats in your inbox.",
            icon: "✅"
        }
    ];

    return (
        <div className="container py-5">
            <div className="text-center mb-5">
                <h1 className="display-4 fw-bold mb-3">
                    Welcome to PhishGuard
                </h1>
                <p className="lead text-secondary">
                    Your intelligent email security companion
                </p>
            </div>

            <div className="row g-4">
                {steps.map((step) => (
                    <div key={step.id} className="col-md-4">
                        <div className="card bg-dark h-100 border-0">
                            <div className="card-body text-center p-4">
                                <div className="display-4 mb-3">
                                    {step.icon}
                                </div>
                                <h3 className="h4 mb-3">{step.title}</h3>
                                <p className="text-secondary mb-0">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;