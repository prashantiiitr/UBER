import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        console.log("Received token:", token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // no await here
        console.log("Decoded token:", decoded);

        req.id = decoded.userId;
        next();
    } catch (error) {
        console.error("JWT verification failed:", error.message);
        return res.status(401).json({
            message: "Invalid token",
            success: false
        });
    }
};

export default isAuthenticated;
