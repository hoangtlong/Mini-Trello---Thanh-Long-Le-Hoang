const express = require('express');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const boardRoutes = require('./routes/boardRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
const authGithub = require('./routes/authGithub');
const cors = require('cors');
const app = express();

app.use(cookieParser());

const clientID = 'Ov23liIJWY0E90MqXIMO';
const clientSecret = '285a0997626bf8f4a3b951bf0f04cb3797be2493';
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
    res.redirect('http://localhost:3000/board');
});

// Cho phép tất cả các tên miền
app.use(cors());


// Middleware
//app.use('/auth/github/callback', authGithub);

app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/', boardRoutes);

// Middleware (authentication)
app.use(authMiddleware.authenticateRequest);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});