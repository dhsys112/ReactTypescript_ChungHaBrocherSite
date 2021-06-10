const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
    songId     : String, // album + song_name
    songTitle  : String ,
    songArtist : String ,
    songDate   : Date ,
    songYear   : String,
    songLikes  : Number ,
    album      : String ,
    songImg    : String , 
    songOpenDate : {type : Date}
})

songSchema.index({
    // 난 search 단어가 주로 title과 descrption에 걸리게 하고 싶다
    songTitle : 'text'
}, {
    // title에 더 큰 비중을 두고 걸리게 하고 싶다 
    weights : {
        songTitle : 2
}})

const Song = mongoose.model('songs',songSchema)
module.exports = {Song}