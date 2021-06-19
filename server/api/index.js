const express = require('express');
const router = express.Router();

router.use('/postings', require('./postings'));
router.use('/create', require('./create'));
router.use('/search', require('./search'));
module.exports = router;
