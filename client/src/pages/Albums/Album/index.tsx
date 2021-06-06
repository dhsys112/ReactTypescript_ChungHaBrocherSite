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

const refineAlbumInfo = (album: any) => {
  return {
    heading: album.albumName,
    paragraphOne: "",
    // paragraphOne: album.paragraphOne,
    paragraphTwo: "",
    // paragraphTwo: album.paragraphTwo,
    buttonLabel: `View ${album.albumName}`,
    image: album.albumUrl,
    // reverse: album.id! % 2 ? true : false,
    reverse: true,
    delay: 100,
  };
};

const SingleAlbumPageContainer: React.FC<RouteComponentProps<MatchParams>> = ({
  match,
}) => {
  let { albumId } = match.params;
  const [albumImg, setAlbumImg] = useState<Array<ImageInfoType>>();
  const [albumInfo, setAlbumInfo] = useState<InfosectionProps>();
  useEffect(() => {
    Axios.post(`/api/album/album_by_id`, { albumId }).then((res) => {
      console.log("albumFromDb", res);
      const albumFromDb = res.data.album.map(
        ({ ...rest }, songNums: any, songs: any) => rest
      );
      setAlbumImg([albumFromDb]);
      setAlbumInfo(refineAlbumInfo(res.data.album));
    });
  }, [setAlbumImg, setAlbumInfo]);

  return (
    <>
      {/* <Hero slides={albumImg!} />;
      <InfoSection {...albumInfo} /> */}
      {/* <Video videoId={album.videoId} /> */}
    </>
  );
};

export default SingleAlbumPageContainer;
