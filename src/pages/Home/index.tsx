import React from 'react';
import Features from 'components/Features';
import Hero from 'components/common/Hero';
import Listings from 'components/common/Listings';
import { InfoData, InfoDataTwo } from 'assets/data/InfoData';
import { SliderData } from 'assets/data/SliderData';
import InfoSection from 'components/common/InfoSection';
import {SingleAlbumDatas} from 'assets/data/AlbumData'


const Home = () => {
  let album = SingleAlbumDatas[SingleAlbumDatas.length - 1]
  let albumInfo = {
    heading      : album.title ,
    paragraphOne : album.paragraphOne ,
    paragraphTwo : album.paragraphTwo ,
    buttonLabel  : 'View HomePage',
    image        : album.images[0].image,
    reverse      : album.id % 2 ? true : false ,
    delay        : 100
}
  return (
    <>
      <Hero slides={album.images} />
      {/* <InfoSection {...InfoData} /> */}
      {/* <Listings datas =  {SliderData.slice(0,2)} /> */}
      {/* <Features /> */}
      {/* <InfoSection {...albumInfo} /> */}
    </>
  );
};

export default Home;
