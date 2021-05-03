import {IMAGES_DATA} from 'assets/images'

export const PictureDatas = (function () { 
  let arr = []
  let dataIdx : number = 0
  for(let i = 1 ; i <= 6 ; i++ ){
      for(let j = 1 ; j <= 3; j++){
          let Img = require(`assets/images/${i}_${j}.png`).default
          let Route   = `/album/${i-1}`
          dataIdx += 1 
          let PictureData = {idx : dataIdx, src:Img, alt:Route}
          arr.push(PictureData)
      }
  }
  // shuffle Array
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr
})()
