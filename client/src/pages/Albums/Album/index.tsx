import React, { useEffect, useState } from "react";
import Hero from "components/common/Hero";
import InfoSection from "components/common/InfoSection";
import Video from "components/Video";
import { RouteComponentProps } from "react-router-dom";
import { ImageInfoType, InfosectionProps } from "assets/data/types";
import Axios from "axios";
import { refineAlbumIntroInfo, refineAlbumImgInfo } from "utils/refine";

interface MatchParams {
  albumId: string;
}

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
