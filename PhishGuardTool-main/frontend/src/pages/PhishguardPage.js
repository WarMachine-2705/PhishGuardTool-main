import React, { useState } from "react";
import EmailForm from "../components/EmailForm";
import Terminal from "../components/Terminal";

const PhishguardPage = () => {
  const [logs, setLogs] = useState([]);

  const handleLogUpdate = (message) => {
    setLogs((prevLogs) => [...prevLogs, message]);
  };

  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <h1 className="display-5 fw-bold mb-2">PhishGuard Scanner</h1>
        <p className="text-light-emphasis">Connect your email to start detecting phishing attempts</p>
      </div>

      <div className="row g-4">
        {/* Left column: Email Form */}
        <div className="col-lg-4">
          <div className="card bg-primary h-100">
            <div className="card-body p-4">
              <div className="d-flex align-items-center justify-content-center mb-3">
                <span className="h2 text-light me-2">📧</span>
                <h2 className="h4 fw-bold mb-0">Connect Email</h2>
              </div>
              
              <div className="alert alert-warning mb-4">
                <h3 className="h6 fw-bold d-flex align-items-center">
                  <span className="me-2">⚠️</span>
                  Security Note
                </h3>
                <p className="small mb-0">
                  We use app passwords for secure access. Your credentials are never stored and 
                  are only used during the active scanning session.
                </p>
              </div>
              
              <EmailForm onLogUpdate={handleLogUpdate} />
              
              <div className="mt-4 small text-light">
                <p className="mb-2 fw-bold">How to get an app password:</p>
                <ol className="ps-3 text-light-emphasis">
                  <li>Enable 2-Factor Authentication on your email account</li>
                  <li>Go to your account's security settings</li>
                  <li>Generate an app password for PhishGuard</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right column: Terminal */}
        <div className="col-lg-8">
          <div className="mb-3 d-flex align-items-center">
            <span className="h3 text-primary me-2">🛡️</span>
            <h2 className="h4 fw-bold mb-0">Scan Results</h2>
          </div>
          
          <div className="card bg-dark border border-primary">
            <div className="card-header bg-secondary d-flex align-items-center">
              <div className="d-flex me-3">
                <div className="rounded-circle bg-danger me-1" style={{width: "12px", height: "12px"}}></div>
                <div className="rounded-circle bg-warning me-1" style={{width: "12px", height: "12px"}}></div>
                <div className="rounded-circle bg-success" style={{width: "12px", height: "12px"}}></div>
              </div>
              <span className="small text-light-emphasis">PhishGuard Terminal</span>
            </div>
            <Terminal logs={logs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhishguardPage;