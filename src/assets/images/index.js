/*
import A1_ImageOne from 'assets/images/1st/1.png';
import A1_ImageTwo from 'assets/images/1st/2.png';
import A1_ImageThree from 'assets/images/1st/3.png';

import A2_ImageOne from 'assets/images/1st/1.png';
import A2_ImageTwo from 'assets/images/1st/2.png';
import A3_ImageThree from 'assets/images/1st/3.png';

import A3_ImageOne from 'assets/images/1st/1.png';
import A3_ImageTwo from 'assets/images/1st/2.png';
import A3_ImageThree from 'assets/images/1st/3.png';

import A4_ImageOne from 'assets/images/1st/1.png';
import A4_ImageTwo from 'assets/images/1st/2.png';
import A4_ImageThree from 'assets/images/1st/3.png';

import A5_ImageOne from 'assets/images/1st/1.png';
import A5_ImageTwo from 'assets/images/1st/2.png';
import A5_ImageThree from 'assets/images/1st/3.png';

import A6_ImageOne from 'assets/images/1st/1.png';
import A6_ImageTwo from 'assets/images/1st/2.png';
import A6_ImageThree from 'assets/images/1st/3.png';
*/

export const IMAGES_DATA = (function () { 
    let arr = []
    for(let i = 1 ; i <= 6 ; i++ ){
        for(let j = 1 ; j <= 3; j++){
            let tmpImg = require(`assets/images/${i}_${j}.png`).default
            arr.push(tmpImg)
        }
    }
    console.log("arr",arr)
    return arr
})()

console.log(IMAGES_DATA)
