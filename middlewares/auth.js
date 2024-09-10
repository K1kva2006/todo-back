const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const authToken = req.headers["x-auth-token"];
    if (!authToken) return res.status(400).json("access token required");
    const checkJWT = jwt.verify(
        authToken,
        process.env.JWT_SECRET_KEY,
        (err, decode) => {
            if (err) return res.status(400).json(err.message);
            req.userAuthData = decode;
            next();
        }
    );
};

module.exports = auth;
