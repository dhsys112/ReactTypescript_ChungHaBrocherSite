import React, { useEffect, useState } from "react";
import AlbumContainer from "components/Albums/AlbumContainer";
import styled from "styled-components/macro";
import { AlbumIntroDataType } from "assets/data/types";
import Axios from "axios";

const makeTwoAlbumsOne = (albums: Array<AlbumIntroDataType>) => {
  const twoAsOneArr = [];
  for (let i = 0; i < albums.length; i += 2) {
    twoAsOneArr.push(albums.slice(i, i + 2));
  }
  return twoAsOneArr;
};

const refineAlbumIntoInfo = (album: any) => {
  return {
    id: album.albumId,
    order: 1,
    albumName: album.albumName,
    artistNm: album.artistNm,
    titleSong: album.titleSong,
    albumImg: album.albumImg,
    albumOpenDate: album.albumOpenDate,
  };
};

const Albums = () => {
  const [twoAlbumsAtOne, setTwoAlbumsAtOne] = useState<any>();

  useEffect(() => {
    Axios.post("/api/album/albums").then((res) => {
      console.log("res", res);
      const albumLists: Array<AlbumIntroDataType> = res.data.albums.map(
        (album: any) => refineAlbumIntoInfo(album)
      );
      setTwoAlbumsAtOne(makeTwoAlbumsOne(albumLists));
    });
  }, []);

  return (
    <>
      <Section>
        <Container>
          <Heading>
            <h1
              data-aos="fade-right"
              data-aos-duration="1000"
              data-aos-once="true"
              data-aos-anchor-placement="center bottom"
            >
              View Albums
            </h1>
          </Heading>
          {twoAlbumsAtOne &&
            twoAlbumsAtOne.map(
              (AlbumIntroData: Array<AlbumIntroDataType>, idx: number) => {
                return <AlbumContainer key={idx} datas={AlbumIntroData} />;
              }
            )}
        </Container>
      </Section>
    </>
  );
};

export default Albums;

const Section = styled.section`
  width: 100%;
  height: 100%;
  padding: 10rem calc((100vw - 1300px) / 2);
`;
const Container = styled.div`
  height: 100%;
  width: 100%;
  padding: 2rem 1rem;
`;

const Heading = styled.div`
  font-size: 1.5rem;
  padding: 2rem 1rem;
  margin-bottom: 40px;

  @media screen and (max-width: 768px) {
    text-align: start;
  }
`;
const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem 0rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
