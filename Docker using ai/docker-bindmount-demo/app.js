const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Add log file path
const logFile = '/app/logs/app.log';

// Ensure logs directory exists
if (!fs.existsSync('/app/logs')) {
    fs.mkdirSync('/app/logs');
}

// Create a write stream for logging
const logStream = fs.createWriteStream(logFile, { flags: 'a' });

// Middleware to log requests
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    const log = `${timestamp} - ${req.method} ${req.url}\n`;
    logStream.write(log);
    next();
});

app.get('/', (req, res) => {
    res.send('Hello from Docker bind mount! Try editing this message okay brother.sdfsdfdsf');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});