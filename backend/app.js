const express = require('express');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const WebSocket = require('ws');

const authRoutes = require('./routes/authRoutes');
const boardRoutes = require('./routes/boardRoutes');
const taskRoutes = require('./routes/taskRoutes');
const cardRoutes = require('./routes/cardRoutes');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();
const server = http.createServer(app);

///github
const clientID = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectURI = 'http://localhost:5000/auth/github/callback';

app.get('/auth/github', (req, res) => {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}`;
    res.redirect(githubAuthUrl);
});

app.get('/auth/github/callback', async (req, res) => {
    const { code } = req.query;
    const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', {
        client_id: clientID,
        client_secret: clientSecret,
        code: code
    }, {
        headers: { 'Accept': 'application/json' }
    });

    const accessToken = tokenResponse.data.access_token;

    const userResponse = await axios.get('https://api.github.com/user', {
        headers: { 'Authorization': `token ${accessToken}` }
    });

    const userData = userResponse.data;
    
    res.cookie('user', JSON.stringify(userData), { maxAge: 900000, httpOnly: true });
    // Chuyển hướng người dùng trở lại frontend sau khi xác thực thành công
    res.redirect('http://localhost:3000/boards');
});


// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', boardRoutes);
app.use('/api/cards', cardRoutes); 
app.use('/api', taskRoutes); // Use task routes


// WebSocket connection
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        console.log('received: %s', message);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Pass the WebSocket server instance to the routes
//app.locals.wss = wss;

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
