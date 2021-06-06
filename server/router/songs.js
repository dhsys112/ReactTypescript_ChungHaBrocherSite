const express = require('express');
const router = express.Router();
const path = require('path');
const connection = require('../db/db.js');
const {Song} = require('../model/Songs')

// 메인 페이지 
router.post('/songs', (req,res) => {
    // 여기에 cache 기능 넣기 : cache object 따로 생성하기  
    console.log("post request reached")
    Song.find().exec((err,songs)=>{
        console.log("songs length",songs.length)
        if(err){
            console.log("error")
            return res.status(400)
        }
        return res.status(200).json({songs})
    })
})

module.exports = router;