const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors"); // Import CORS
const { startMonitoring } = require("./phishingMonitor");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*", // Allow all origins
        methods: ["GET", "POST"],
    },
});

// ✅ Use CORS Middleware
app.use(cors());
app.use(express.json());

io.on("connection", (socket) => {
    console.log("Client connected");
});

// API Routes
app.get("/", (req, res) => {
    res.send("Phishing Detector Server Running...");
});

// Start Monitoring
startMonitoring(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
