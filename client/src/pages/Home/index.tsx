import React, { useEffect } from "react";
import Hero from "components/common/Hero";
import { SingleAlbumDatas } from "assets/data/AlbumData";
import Axios from "axios";

const Home = () => {
  let album = SingleAlbumDatas[SingleAlbumDatas.length - 1];
  let albumInfo = {
    heading: album.title,
    paragraphOne: album.paragraphOne,
    paragraphTwo: album.paragraphTwo,
    buttonLabel: "View HomePage",
    image: album.images[0].image,
    reverse: album.id! % 2 ? true : false,
    delay: 100,
  };
  useEffect(() => {
    Axios.post("/api").then((res) => {
      console.log("data", res.data.albums);
    });
  }, []);
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
