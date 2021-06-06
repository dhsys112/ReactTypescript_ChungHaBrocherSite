const express = require('express');
const router = express.Router();
const path = require('path');
const connection = require('../db/db.js');
const {Album} = require('../model/Albums')

// 메인 페이지 
router.post('/albums', (req,res) => {
    // 여기에 cache 기능 넣기 : cache object 따로 생성하기  
    console.log("post request reached")
    Album.find().exec((err,albums)=>{
        console.log("albums length",albums.length)
        if(err){
            console.log("error")
            return res.status(400)
        }
        return res.status(200).json({albums})
    })
})

// 앨범 페이지 
router.post('/album_by_id', (req,res) => {
    const {albumId} = req.body 
    console.log("req.body",req.body)
    // 여기에 cache 기능 넣기 : cache object 따로 생성하기  
    Album.findOne({'albumId':albumId}).exec((err,album)=>{
        if(err){
            console.log("error")
            return res.status(400)
        }
        return res.status(200).json({album})
    })
})

// 사진 페이지 
router.post('/images', (req,res) => {
    // 여기에 cache 기능 넣기 : cache object 따로 생성하기  
    
    Album.find().exec((err,albums)=>{
        if(err){
            console.log("error")
            return res.status(400)
        }
        const imgDatas = []
        albums.forEach(album=>imgDatas.push(album.albumImg))
        return res.status(200).json({imgDatas})
    })
})

module.exports = router;