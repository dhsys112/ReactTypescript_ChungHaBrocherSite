import React, { useEffect, useState } from "react";
import Hero from "components/common/Hero";
import Axios from "axios";
import { ImageInfoType, SongType } from "assets/data/types";
import styled from "styled-components/macro";
import { refineAlbumIntroInfo, refineSongDatas } from "utils/refine";
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
  const [songs, setSongs] = useState<Array<SongType>>();

  useEffect(() => {
    Axios.post("/api").then((res) => {
      // 최신 6개 앨범
      console.log("albums", res.data.albums);
      const albumLists = res.data.albums.map(
        ({ ...rest }, songNums: any, songs: any) => rest
      );
      setAlbums(albumLists);
      setSongs(refineSongDatas(res.data.songInfos));
    });
  }, [setAlbums]);

  return (
    <>
      <Hero slides={albums} />
      <Heading
        data-aos="fade-right"
        data-aos-duration="1000"
        data-aos-once="true"
        data-aos-anchor-placement="center bottom"
      >
        Recent 6 Albums
      </Heading>
      {albums[0] &&
        albums.map((album) => <InfoSection {...refineAlbumIntroInfo(album)} />)}
      <Heading
        data-aos="fade-right"
        data-aos-duration="1000"
        data-aos-once="true"
        data-aos-anchor-placement="center bottom"
      >
        Top 6 Songs
      </Heading>
      {songs &&
        songs.map((song, idx) => {
          return (
            <Features
              key={idx}
              IsOdd={idx % 2 == 0}
              routeIdx={idx}
              img={song.img}
              album={song.albumName}
              song={song.songTitle}
              paragraph1={song.paragraph1}
              paragraph2={song.paragraph2}
            />
          );
        })}
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

export const Heading = styled.div`
  font-size: 2.5rem;
  padding: 1rem 1rem;
  @media screen and (max-width: 768px) {
    text-align: start;
  }
`;

export default Home;
