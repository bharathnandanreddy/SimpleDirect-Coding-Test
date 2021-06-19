const express = require('express');
const router = express.Router();

const db = require('../../db');

router.get('/:id', async (req, res) => {
  var key=req.params.id
  console.log("searching..")
  db('Posting').where('company', 'like', `%${key}%`).orWhere('title', 'like', `%${key}%`).orWhere('summary', 'like', `%${key}%`).orWhere('skills', 'like', `%${key}%`).orWhere('email', 'like', `%${key}%`).then((data)=>{
    console.log(data)
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
