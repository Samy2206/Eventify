const admin = require("firebase-admin");

const verifyTokenStudent = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];
        const decodedToken = await admin.auth().verifyIdToken(token);

        console.log(decodedToken)
        req.student = {
            uid: decodedToken.uid,
            email: decodedToken.email,
            name: req.body.name || " ",
        };
        next();
    } catch (e) {
        res.status(403).json({ message: "Invalid or Expired Token" });
    }
};

module.exports =  verifyTokenStudent 
