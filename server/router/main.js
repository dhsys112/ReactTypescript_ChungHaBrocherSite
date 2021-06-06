const express = require('express');
const router = express.Router();
const path = require('path');
const connection = require('../db/db.js');
const {Album} = require('../model/Albums')
// 메인 페이지 
router.post('/api', (req,res) => {
    // 여기에 cache 기능 넣기 : cache object 따로 생성하기  
    console.log("post request reached")
    Album.find().limit(1).exec((err,albums)=>{
        console.log("albums length",albums.length)
        if(err){
            console.log("error")
            return res.status(400)
        }
        return res.status(200).json({albums})
    })
})

module.exports = router;