const express = require('express');
const router = express.Router();

const db = require('../../db');

router.post('/', async (req, res) => {
  console.log("inserting..")
    db.insert(req.body).into('Posting').then((data)=>{
    res.send({
        success: true,
        data: data
      });
  }).catch((err)=>{
    console.log(err)
    res.send({
      success: false,
      data: err
    });
  })

});

module.exports = router;
