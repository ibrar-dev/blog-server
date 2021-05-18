'use strict'

const bcrypt = require('bcryptjs');
const User = require('../models/user');
const helper = require('../utils/helper')
const JWT = require('jsonwebtoken');
const { validationResult } = require('express-validator')
const ENV = process.env;

exports.postLogin = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.errors = errors.errors;
        res.hasError = true;
        res.message = "Validation Errors";
        next();
        return
    }
    const data = req.body;
    const userExist = await User.fetchByEmail(req.body.email);
    if (!userExist) {
        res.hasError = true;
        res.message = "User not exist with this email.";
        next();
        return
    }
    const passwordMatch = await helper.matchPassword(data.password, userExist.password);
    if (!passwordMatch) {
        res.hasError = true;
        res.message = "Password not match.";
        next();
        return;
    }

    const token = await JWT.sign({ id: userExist._id }, ENV.JWT_SECRET);
    const updateToken = await User.updateUserTOken(userExist._id, token);
    if (!updateToken) {
        res.hasError = true;
        res.message = "Password not match.";
        next();
        return;
    }
    res.hasError = false;
    res.result = updateToken;
    res.message = "User Successfuly Sign in";
    next()
}

exports.postSignUp = async (req, res, next) => {
    try {
        const userExist = await User.fetchByEmail(req.body.email);
        if (userExist) {
            res.hasError = true;
            res.message = "User ALready exist";
            next();
        }
        const body = { ...req.body };
        body.password = await bcrypt.hash(body.password, 12);
        const userData = await User.create(body);
        if (!userData) {
            res.hasError = true;
            res.message = "User is not Created";
            next();
        }
        res.hasError = false;
        res.message = "User Successfuly created";
        next()

    } catch (err) {
        console.log('Error In Signup', err);
        res.hasError = true;
        res.message = "User is not Created";
        next();
    }
}

exports.getUsers = async (req, res, next) => {
    try {
        const userData = await User.fetchAll();
        res.hasError = false;
        res.result = userData;
        res.message = "Users fetch created";
        next()
    } catch (err) {
        console.log('Error In User Fetch', err);
        res.hasError = true;
        res.message = "Error in user fetch";
        next();
    }
}