const tokens = require("../config/tokens.config");
//revisa la session
module.exports.checkSession = (req, res, next) => {
    const token = req.headers.cookie.split("=")[1];
    try {
        const userId = tokens.loadSession(token);
        if (!userId) {
            return res.status(401).json("Unauthorized");
        }
    
    } catch (error) {
        return res.status(401).json("Unauthorized");
    }
    next();
};