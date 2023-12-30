const JWT = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    try {
        // Check if the Authorization header is present
        const authorizationHeader = req.headers['Authorization'];
        if (!authorizationHeader) {
            return res.status(401).send({ message: 'Authorization header missing', success: false });
        }

        // Extract the token from the Authorization header
        const token = authorizationHeader.split(" ")[1];
        if (!token) {
            return res.status(401).send({ message: 'Token missing in Authorization header', success: false });
        }

        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({ message: 'Auth Failed', success: false });
            } else {
                // Attach the decoded user ID to the request object
                req.body.userId = decode.id;
                next();
            }
        });
    } catch (error) {
        console.error(error);
        res.status(401).send({ message: 'Auth Failed', success: false });
    }
}