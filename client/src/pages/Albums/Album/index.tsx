import React from "react";
import Hero from "components/common/Hero";
import InfoSection from "components/common/InfoSection";
import Video from "components/Video";
import { SingleAlbumDatas } from "assets/data/AlbumData";
import { RouteComponentProps } from "react-router-dom";

interface MatchParams {
  albumId: string;
}

const SingleAlbumPageContainer: React.FC<RouteComponentProps<MatchParams>> = ({
  match,
}) => {
  let { albumId } = match.params;
  let album = SingleAlbumDatas.filter((album) => album.id == albumId)[0];
  let albumInfo = {
    heading: album.title,
    paragraphOne: album.paragraphOne,
    paragraphTwo: album.paragraphTwo,
    buttonLabel: "View HomePage",
    image: album.images[0].image,
    reverse: album.id! % 2 ? true : false,
    delay: 100,
  };
  return (
    <>
      <Hero slides={album.images} />;
      <InfoSection {...albumInfo} />
      <Video videoId={album.videoId} />
    </>
  );
};

export default SingleAlbumPageContainer;
