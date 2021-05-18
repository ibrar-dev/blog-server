"use strict"
const bcrypt = require('bcryptjs');


exports.matchPassword = async (password, hashedPassword) => {
    try {
        const isMatched = await bcrypt.compare(password, hashedPassword);
        return isMatched;
    }
    catch (err) {
        console.log('Error in password match', err);
        return false
    }
}