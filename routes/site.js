const express = require('express');
const siteRouter = express.Router();

siteRouter.get('/secret', (req, res, next) => {

    res.render('secret')
})


module.exports = siteRouter;