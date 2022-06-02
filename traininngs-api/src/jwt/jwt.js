const jwt = require('jsonwebtoken');

const signInToken = (data) => {
    return jwt.sign(data, process.env.SECRET_KEY);
}

const verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers.authorization;
    if (!token) {
        res.status(401).json({
            message: 'Token not supplied'
        });
    }
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: 'Token not valid'
            });
        }
        req.decoded = decoded;
        return next();
    });

}

module.exports = {
    signInToken,
    verifyToken
}