import React, { useEffect, useState } from "react";
import Hero from "components/common/Hero";
import Axios from "axios";
import { ImageInfoType } from "assets/data/types";
import styled from "styled-components/macro";
import { refineAlbumIntroInfo, refineAlbumImgInfo } from "utils/refine";
import InfoSection from "components/common/InfoSection";
import Listings from "components/common/Listings";
import Features from "components/common/Features";

const sliceByTwo = (albums: any, length: number) => {
  const sets = [];
  // 짝수 여부 검사
  if (length % 2 != 0) length -= 1;
  for (let i = 0; i <= length; i = i + 2) {
    sets.push([albums[i], albums[i + 1]]);
  }
  return sets;
};

const Home = () => {
  const [albums, setAlbums] = useState<Array<ImageInfoType>>([]);
  // const albumListings = sliceByTwo(albums, albums.length).map((elems) =>
  //   elems.map((elem) => refineAlbumImgInfo(elem)[0])
  // );

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
      // 최신 6개 앨범
      const albumLists = res.data.albums.map(
        ({ ...rest }, songNums: any, songs: any) => rest
      );
      setAlbums(albumLists);
    });
  }, [setAlbums]);

  return (
    <>
      <Hero slides={albums} />
      <SongsHeading>Recent 6 Albums</SongsHeading>
      {albums[0] &&
        albums.map((album) => <InfoSection {...refineAlbumIntroInfo(album)} />)}
      {/*{albumListings &&
        albumListings[0] &&
        albumListings.map((albumList) => {
          return <Listings datas={albumList} />;
        })}*/}
      {/*<Features />*/}
      {/* <InfoSection {...albumInfo} /> */}
    </>
  );
};

export const SongsHeading = styled.div`
  font-size: 2.5rem;
  padding: 1rem 1rem;
  @media screen and (max-width: 768px) {
    text-align: start;
  }
`;

export default Home;
