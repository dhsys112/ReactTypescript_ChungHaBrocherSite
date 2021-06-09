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

const Album = mongoose.model('albums',albumSchema)
module.exports = {Album}