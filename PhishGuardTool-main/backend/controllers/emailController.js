require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const Imap = require("imap");
const { simpleParser } = require("mailparser");
const { checkUrlSafety } = require("../utils/phishingCheck");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: { origin: "*" },
});

app.use(express.json());

let monitoring = false;
let imap;

const logToClient = (message) => {
    console.log(message);
    io.emit("log", message); // Send log messages to frontend
};

app.post("/start-monitoring", (req, res) => {
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required in .env file." });
    }

    if (monitoring) {
        return res.status(400).json({ message: "Monitoring is already running." });
    }

    monitoring = true;

    imap = new Imap({
        user: email,
        password: password,
        host: "imap.gmail.com",
        port: 993,
        tls: true,
        tlsOptions: { rejectUnauthorized: false }, // Fix for self-signed cert issue
    });

    imap.once("ready", () => {
        logToClient("✅ Connected to email inbox.");

        const fetchEmails = () => {
            imap.openBox("INBOX", false, (err, box) => {
                if (err) {
                    logToClient("❌ Error opening inbox: " + err.message);
                    return;
                }

                imap.search(["UNSEEN"], (err, results) => {
                    if (err || !results.length) return;

                    const fetcher = imap.fetch(results, { bodies: "" });

                    fetcher.on("message", (msg) => {
                        msg.on("body", (stream) => {
                            simpleParser(stream, async (err, parsed) => {
                                if (err) {
                                    logToClient("❌ Error parsing email: " + err.message);
                                    return;
                                }

                                const sender = parsed.from.text;
                                const subject = parsed.subject;
                                const text = parsed.text;

                                logToClient(`📩 Checking email from ${sender} - Subject: ${subject}`);

                                const urls = text.match(/https?:\/\/[^\s]+/g) || [];
                                for (const url of urls) {
                                    const isSafe = await checkUrlSafety(url);
                                    if (!isSafe) {
                                        logToClient(`⚠️ Phishing detected: ${url} from ${sender}`);
                                    }
                                }
                            });
                        });
                    });

                    fetcher.once("end", () => {
                        logToClient("✅ Email fetching done.");
                    });
                });
            });
        };

        fetchEmails();
        setInterval(fetchEmails, 60000); // Check emails every 60 seconds
    });

    imap.once("error", (err) => {
        logToClient("❌ IMAP error: " + err.message);
    });

    imap.connect();
    res.json({ message: "Monitoring started." });
});

// Stop monitoring
app.post("/stop-monitoring", (req, res) => {
    if (!monitoring) {
        return res.status(400).json({ message: "Monitoring is not running." });
    }
    monitoring = false;
    imap.end();
    res.json({ message: "Monitoring stopped." });
});

// Start the server
server.listen(5000, () => {
    console.log("🚀 Server running on port 5000");
});
