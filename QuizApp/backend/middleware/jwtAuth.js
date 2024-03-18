const JWT = require('jsonwebtoken');

const jwtAuth = (req, res, next) => {

    const token = (req.cookies && req.cookies.token) || null;
    // console.log(token,'token');
    if (!token) {
        return res.status(400).json({
            success: false,
            message: 'No Token Provided'
        });
    }
    const SECRET = "SECRET";

    try {
        const payload = JWT.verify(token, SECRET);
        // console.log(payload,'payload');
        req.user = { id: payload._id, email: payload.email };
        // console.log(req.user,'req.user');
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
    next();
}

module.exports = jwtAuth;