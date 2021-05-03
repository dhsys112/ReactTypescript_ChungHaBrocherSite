import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { IoMdArrowRoundForward } from "react-icons/io";
import OneAlbum from "./OneAlbum";
import { AlbumIntroDataType } from "assets/data/types";

interface AlbumContainerProp {
  datas: Array<AlbumIntroDataType>;
}
const AlbumContainer = ({ datas }: AlbumContainerProp) => {
  let DataOne = datas[0];
  let DataTwo = datas[1];
  return (
    <InfoRow>
      <OneAlbum AlbumData={DataOne} first={true} />
      <OneAlbum AlbumData={DataTwo} first={false} />
    </InfoRow>
  );
};

const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem 0rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export default AlbumContainer;
