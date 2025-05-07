import React from "react";

const About = () => {
    const features = [
        {
            title: "Advanced Detection",
            description: "Our algorithm uses machine learning to identify phishing patterns in emails.",
            icon: "💻"
        },
        {
            title: "Privacy First",
            description: "Your email content remains private and secure throughout the scanning process.",
            icon: "🔒"
        },
        {
            title: "Community Driven",
            description: "Benefit from a constantly updated database of known phishing techniques.",
            icon: "👥"
        }
    ];

    return (
        <div className="container py-5">
            <div className="text-center mb-5">
                <h1 className="display-4 fw-bold mb-3">About PhishGuard</h1>
                <p className="lead text-secondary">
                    Protecting your inbox from sophisticated phishing attempts
                </p>
            </div>

            <div className="row g-4">
                {features.map((feature, index) => (
                    <div key={index} className="col-md-4">
                        <div className="card bg-dark h-100 border-0">
                            <div className="card-body text-center p-4">
                                <div className="display-4 mb-3">
                                    {feature.icon}
                                </div>
                                <h3 className="h4 mb-3">{feature.title}</h3>
                                <p className="text-secondary mb-0">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default About;