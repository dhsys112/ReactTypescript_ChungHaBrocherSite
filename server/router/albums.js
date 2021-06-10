const express = require('express');
const router = express.Router();
const path = require('path');
const connection = require('../db/db.js');
const {Album} = require('../model/Albums')

// 메인 페이지 
router.post('/albums', (req,res) => {
    // 여기에 cache 기능 넣기 : cache object 따로 생성하기  
    
    // Album.find().exec((err,albums)=>{
    //     console.log("albums length",albums.length)
    //     if(err){
    //         console.log("error")
    //         return res.status(400)
    //     }
    //     return res.status(200).json({albums})
    // })

    let limit = req.body.limit ? parseInt(req.body.limit) : 100 ;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0 ;
    let term = req.body.searchTerm // 우리가 검색한 단어

    // filter를 거쳐서 들어올 때 그에 해당하는 db find하기
    let findArgs = {};

    for(let key in req.body.filters){
        // key는 check list 상에서 체크된 continents 혹은 price가 될 것이다
        if( req.body.filters[key].length  > 0){
            //ex. console.log(req.body.filters) : { continents: [], price: [ 0, 199 ] }
            //ex. console.log('key,',key)  : { price: [ 0, 199 ] }
            // if( key === 'price' ){
            //     // findArgs["price"] 이겠지
            //     findArgs[key] = {
            //     // greater than equal( 크거나 같은 ) : $gte는 mongodb에서 사용하는 것
            //         $gte : req.body.filters[key][0],
            //     // less than equal( 작거나 같은 ) : $lte
            //         $lte : req.body.filters[key][1]
            //     }
// 
            //     // 결과 : findArgs { price : [ '$gte' : 200, '$lte' : 249 ]}
            //     
            // }else{
            //     findArgs[key] = req.body.filters[key];
            // }
            findArgs[key] = req.body.filters[key];
        }    
    }
    if(term){
        // 만약 검색 단어가 존재한다면 
        // frontend에서 term을 보내줬다면
        Album.find(findArgs)// findArgs에 맞는 정보만 db 에서 가져오기 >> findArgs가 적용되기 위해서는 당연히 product schema에 cotinents 정보가 있어야 한다
        .find({ $text : { $search : term}}) // 우리가 검색란에 입력한 단어로 한번 더 검색한다
        .skip(skip) // 처음 ~번째 부터 8개( limit의 수 만큼 ) 가져와
        .limit(limit) // mongodb에게 알려주는 것이다. 8개만 가져와
        .exec(( err , albumInfo) => { // exec : query 돌리기
            // albumInfo는 배열로서, 그 안에 한 상품은 한 객체 형태로 저장된다
            if(err) return res.status(400).json({ success : false, err})
    
            return res.status(200).json({ 
                success : true , 
                // albumInfo : 받아온 모든 products
                albumInfo,
                // postSize : 내가 가져온 정보들의 수 ( length )
                // postSize가 limit보다 크거나 같으면, 아직 여전히 가져올 데이터가 존재한다는 것 
                postSize : albumInfo.length})
        })  

    }else{
        // 검색 단어가 없을 때
        console.log("findArgs",findArgs)
        // Product collection에 들어있는 모든 상품 정보 가져오기
        Album.find(findArgs)// findArgs에 맞는 정보만 db 에서 가져오기 >> findArgs가 적용되기 위해서는 당연히 product schema에 cotinents 정보가 있어야 한다
        .skip(skip) // 처음 ~번째 부터 8개( limit의 수 만큼 ) 가져와
        .limit(limit) // mongodb에게 알려주는 것이다. 8개만 가져와
        .exec(( err , albumInfo) => {
            // albumInfo는 배열로서, 그 안에 한 상품은 한 객체 형태로 저장된다
            if(err) return res.status(400).json({ success : false, err})
            return res.status(200).json({ 
                success : true , 
                albumInfo,
                // postSize : 내가 가져온 정보들의 수 ( length )
                // postSize가 limit보다 크거나 같으면, 아직 여전히 가져올 데이터가 존재한다는 것 
                postSize : albumInfo.length})
        })  
    }
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