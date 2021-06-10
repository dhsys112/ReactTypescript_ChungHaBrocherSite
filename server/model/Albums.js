const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema({
    artistNm  : String,
    albumImg  : String,
    albumId   : Number,
    albumUrl  : String,
    albumType : String,
    albumName : String,
    albumArtistName : String,
    titleSong : String,
    albumOpenDate : {type: Date},
    albumYear : String,
    songNums : Number,
    review : String, 
    songs : [{
        songId     : String,
        songTitle  : String ,
        songArtist : String ,
        songLikes  : Number ,
        album      : String ,
        songOpenDate : {type : Date}
    }]
})

/*
우리가 검색한 기능이 주로 어떤 field에 걸리게 하고 싶은지 알아야 한다
예를 들어, 대륙으로 검색하는 것에 초점을 맞추고 싶은지
제목에 초점을 맞추고 싶은지 등등
*/
albumSchema.index({
    // 난 search 단어가 주로 title과 descrption에 걸리게 하고 싶다
    albumName : 'text',
    titleSong : 'text'
}, {
    // title에 더 큰 비중을 두고 걸리게 하고 싶다 
    weights : {
        albumName : 5,
        titleSong : 1
    }
})


const Album = mongoose.model('albums',albumSchema)
module.exports = {Album}