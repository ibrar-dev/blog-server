const JWT = require('jsonwebtoken');
const User = require('../models/user');

exports.auth = async (req, res, next) => {
    const header = req.get("Authorization");
    if (!header || !header.startsWith('Bearer')) {
        return res.status(500).json({
            HasError: true,
            ResultMessages: "Unauthorization access: Token not found",
        });
    }
    const token = header.split(" ")[1];
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    const user = await User.findUserById(decoded.id);
    if (!user) {
        return res.status(500).json({
            HasError: true,
            ResultMessages: "Unauthorization access: User does not exist",
        });
    }
    next();
}
