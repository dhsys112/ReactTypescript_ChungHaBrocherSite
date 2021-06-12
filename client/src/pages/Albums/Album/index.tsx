import React, { useEffect, useState } from "react";
import Hero from "components/common/Hero";
import styled from "styled-components/macro";
import InfoSection from "components/common/InfoSection";
import Features from "components/common/Features";
import { RouteComponentProps } from "react-router-dom";
import { ImageInfoType, InfoSectionProps } from "assets/data/types";
import Axios from "axios";
import {
  refineAlbumIntroInfo,
  refineAlbumImgInfo,
  refineSongDatas,
} from "utils/refine";
import { SongType } from "assets/data/types";

interface MatchParams {
  albumId: string;
}

const SingleAlbumPageContainer: React.FC<RouteComponentProps<MatchParams>> = ({
  match,
}) => {
  const [albumImg, setAlbumImg] = useState<Array<ImageInfoType>>([]);
  const [albumInfo, setAlbumInfo] = useState<InfoSectionProps>();
  const [songs, setSongs] = useState<Array<SongType>>();
  let { albumId } = match.params;
  const body = { albumId: albumId };

  useEffect(() => {
    Axios.post("/api/album/album_by_id", body).then((res) => {
      const albumImgInfo = refineAlbumImgInfo(res.data.album);
      setAlbumImg(albumImgInfo);
      console.log("songdata", res.data.album.songs[0]);
      setAlbumInfo(refineAlbumIntroInfo(res.data.album));
      setSongs(
        refineSongDatas(
          res.data.album.songs.map((song: any) => {
            return { ...song, songImg: res.data.album.albumImg };
          })
        )
      );
    });
  }, []);

  return (
    <>
      <Hero slides={albumImg && albumImg} />;
      <InfoSection {...albumInfo!} />
      <SongsHeading>View Songs</SongsHeading>
      {songs &&
        songs.map((song: SongType, idx) => {
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
    </>
  );
};

export const SongsHeading = styled.div`
  font-size: 2.5rem;
  padding: 1rem 1rem;
  margin-bottom: 10px;
  @media screen and (max-width: 768px) {
    text-align: start;
  }
`;

export default SingleAlbumPageContainer;
