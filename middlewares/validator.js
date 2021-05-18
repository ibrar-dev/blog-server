'use strict'
const {
    body
} = require('express-validator');
const {
    query,
    param,
    check
} = require('express-validator');



// const passwordRegax = (field) => body(field, 'Password Is Required')
//     .exists().bail()
//     // .matches(/^(?=.{6,})(?=.*[a-z]).*$/, "i").bail().isLength({
//     //     min: 6,
//     //     max: 20
//     // })
//     .trim();
const isMobileNumberPropExists = body('MobileNumber', 'Mobile number is required').not().isEmpty().trim();

const isMobileNumber = (field) => body(field, 'Mobile number is required and should have 13 characters').not().isEmpty().trim().bail().isLength({ min: 13, max: 13 });
const mobileNumberMustHaveChar = body('MobileNumber', 'Mobile number should have 13 characters').isLength({
    min: 13,
    max: 13
}).trim();
const isEmail = (email) => body(email, 'Invalid Email').exists().normalizeEmail().isEmail().trim();
const isExists = (field) => body(field, `${field} is required`).exists().trim();




const bodyIsInt = (field) => body(field, `${field} should required and should be int`).exists().bail().isInt();
const bodyIsString = (field) => body(field, `${field} is required and atliest have one character`).exists().bail().bail().notEmpty();
const bodyIsDate = (field) => body(field, `${field} is required and should be in valid format`).exists().bail().notEmpty();
const bodyIsBoolien = (field) => body(field, `${field} is required and valid boolean`).exists().bail().isBoolean().bail().notEmpty();
const bodyIsDecimal = (field) => body(field, `${field} is required and must be decimal`).exists().bail().isDecimal().bail().notEmpty();








exports.userLogin = [
    isEmail('Email'),
    bodyIsString('Password'),
];


exports.userSignUp = [
    bodyIsString('firstName'),
    bodyIsString('lastName'),
    isEmail('email'),
    bodyIsString('password'),
    bodyIsString('role'),
    isMobileNumber('phone'),
];


exports.blog = [
    bodyIsString('title'),
    bodyIsString('description'),
    bodyIsDate('date'),
    isMobileNumber('phone'),
];


