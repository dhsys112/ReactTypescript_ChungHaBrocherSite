import React, { useEffect, useState } from "react";
import Hero from "components/common/Hero";
import InfoSection from "components/common/InfoSection";
import Video from "components/Video";
import { RouteComponentProps } from "react-router-dom";
import { ImageInfoType, InfosectionProps } from "assets/data/types";
import Axios from "axios";

interface MatchParams {
  albumId: string;
}

const refineAlbumIntroInfo = (album: any) => {
  return {
    heading: album.albumName,
    paragraphOne: "",
    // paragraphOne: album.paragraphOne,
    paragraphTwo: "",
    // paragraphTwo: album.paragraphTwo,
    buttonLabel: `View ${album.albumName}`,
    image: album.albumImg,
    // reverse: album.id! % 2 ? true : false,
    reverse: true,
    delay: 100,
  };
};

const refineAlbumImgInfo = (album: any) => {
  return [
    {
      albumId: album.albumId,
      albumName: album.albumName,
      artistNm: album.artistNm,
      albumUrl: album.albumUrl,
      label: album.albumName,
      titleSong: album.titleSong,
      albumImg: album.albumImg,
      alt: album.albumName,
      albumOpenDate: new Date(album.albumOpenDate),
    },
  ];
};

const SingleAlbumPageContainer: React.FC<RouteComponentProps<MatchParams>> = ({
  match,
}) => {
  const [albumImg, setAlbumImg] = useState<Array<ImageInfoType>>([]);
  const [albumInfo, setAlbumInfo] = useState<InfosectionProps>();
  let { albumId } = match.params;
  const body = { albumId: albumId };

  useEffect(() => {
    Axios.post("/api/album/album_by_id", body).then((res) => {
      const albumImgInfo = refineAlbumImgInfo(res.data.album);
      setAlbumImg(albumImgInfo);
      setAlbumInfo(refineAlbumIntroInfo(res.data.album));
    });
  }, []);

  return (
    <>
      <Hero slides={albumImg && albumImg} />;
      <InfoSection {...albumInfo} />
      {/* <Video videoId={album.videoId} /> */}
    </>
  );
};

export default SingleAlbumPageContainer;
