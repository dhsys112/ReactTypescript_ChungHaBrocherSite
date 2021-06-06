const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
    songId     : String, // album + song_name
    songTitle  : String ,
    songArtist : String ,
    songLikes  : Number ,
    album      : String ,
    songOpenDate : {type : Date}
})

const Song = mongoose.model('songs',songSchema)
module.exports = {Song}