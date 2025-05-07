# PhishGuard

PhishGuard is a MERN stack web application designed to protect your inbox from phishing attempts. It provides real-time phishing detection and monitoring of emails using a Node.js backend and a React frontend.

## Features

- Real-time phishing detection with Socket.io
- Email monitoring and analysis
- Responsive UI built with React and Bootstrap
- Secure backend API with Express and MongoDB

## Technology Stack

- Frontend: React, Bootstrap, Socket.io-client
- Backend: Node.js, Express, Socket.io, MongoDB (Mongoose)
- Other: Axios for HTTP requests, dotenv for environment variables

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB instance running (local or cloud)
- Optional: .env file for environment variables

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory and set the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

The backend server will run on `http://localhost:5000`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```

The frontend will run on `http://localhost:3000`.

## Project Structure

- `backend/`: Express server, email monitoring, and phishing detection logic
- `frontend/`: React application with UI components and pages

## License

This project is licensed under the ISC License.

## Contact

For questions or contributions, please open an issue or submit a pull request.
