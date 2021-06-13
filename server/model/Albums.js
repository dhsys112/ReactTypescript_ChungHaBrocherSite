const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema({
    artistNm  : {
        type : String
    },
    albumImg  : {
        type : String
    },
    albumId   : {
        type : Number
    },
    albumUrl  : {
        type : String
    },
    albumType : {
        type : String
    },
    albumName : {
        type : String
    },
    albumArtistName : {
        type : String
    },
    titleSong : {
        type : String
    },
    albumOpenDate : {type: Date},
    albumYear : {
        type : String
    },
    songNums : {
        type : Number
    },
    review : {
        type : String
    }, 
    songs : [{
        songId     : {
            type : String
        },
        songTitle  : {
            type : String
         } ,
        songArtist : {
            type : String
         },
        songLikes  : {
            type : Number
        },
        album      : {
            type : String
        },
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
        albumName : 2,
        titleSong : 10
    }
})
const Album = mongoose.model('albums',albumSchema)
module.exports = {Album}