const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require("../errors");

const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError("No token provided");
    }

    const token = authHeader.split(' ')[1];
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {name : payload.name, userId : payload.userId};
        next();
    }catch (e) {
        throw new UnauthenticatedError("Authorization error");
    }
}

module.exports = {
    authenticateUser
}
