

const githubSign =  async (req, res) => {
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
};

module.exports = { githubSign};
