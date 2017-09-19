
const express = require('express');
const validator = require('validator');
const passport = require('passport');

module.exports = (app) => {

  app.post('/login', (req, res, next) => {

    passport.authenticate('local-login', (err, token, userData) => {
      if (err) {
        res.status(400).json({
          success: false,
          message: 'Failed to authenticate'
        });
      }

      return res.json({
        success: true,
        message: 'Successfully logged in',
        token,
        user: userData
      });

    })
  });
}