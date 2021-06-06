import React, { useEffect, useState } from "react";
import Hero from "components/common/Hero";
import Axios from "axios";
import { ImageInfoType } from "assets/data/types";
const Home = () => {
  const [albums, setAlbums] = useState<Array<ImageInfoType>>([]);
  /*
    albumName  : string
    artistNm   : string
    albumUrl     : string
    label    : string
    titleSong : string , 
    albumImg    : string | undefined
    alt      : string 
    albumOpenDate : Date
  */

  useEffect(() => {
    Axios.post("/api").then((res) => {
      const albumLists = res.data.albums.map(
        ({ ...rest }, songNums: any, songs: any) => rest
      );
      setAlbums(albumLists);
    });
  }, [setAlbums]);

  return (
    <>
      <Hero slides={albums} />
      {/* <InfoSection {...InfoData} /> */}
      {/* <Listings datas =  {SliderData.slice(0,2)} /> */}
      {/* <Features /> */}
      {/* <InfoSection {...albumInfo} /> */}
    </>
  );
};

export default Home;
