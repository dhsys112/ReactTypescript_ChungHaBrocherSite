import styled, { css } from "styled-components/macro";
import React, { memo } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowRoundForward } from "react-icons/io";
import { AlbumIntroDataType } from "assets/data/types";

interface OneAlbumProp {
  AlbumData: AlbumIntroDataType;
  first: boolean;
}

const OneAlbum = memo(({ AlbumData, first }: OneAlbumProp) => {
  // console.log("Intro Page Single Album Id", AlbumData.id);
  return (
    <>
      <InfoWrap
        data-aos="zoom-out-up"
        data-aos-duration={first ? "1200" : "900"}
        data-aos-once="true"
        data-aos-anchor-placement="center bottom"
      >
        <AlbumImage
          first={first}
          src={AlbumData && AlbumData.albumImg}
          alt="home"
        />
        <InfoWrapper first={first}>
          <h2>{AlbumData && AlbumData.titleSong}</h2>
          <InfoLink to={`/album/${AlbumData && AlbumData.id}`}>
            <p>View Details</p>
            <Arrow />
          </InfoLink>
        </InfoWrapper>
      </InfoWrap>
    </>
  );
});

const InfoWrap = styled.div`
  padding: 2rem 0rem;
  min-height: 400px;
  height: 100%;
  width: 100%;
  h2 {
    margin-bottom: 1rem;
    font-weight: 400;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 3rem;
    padding: 0;
    margin-bottom: 2rem;
  }
`;

interface AlbumImageProp {
  first: boolean;
  src?: any;
}

const AlbumImage = styled.img<AlbumImageProp>`
  position: relative; // to allow element's placement
  top: -20px;
  ${({ first }) =>
    first
      ? css`
          top: -50px;
        `
      : css`
          top: 50px;
        `};
  width: 100%;
  height: 100%;
  max-width: 300px;
  max-height: 300px;
  object-fit: cover;
  margin-bottom: 1rem;
  transition: all 0.5s ease-in-out;
  &:hover {
    transform: scale(1.02);
  }
  @media screen and (max-width: 768px) {
    top: 0;
  }
`;

const InfoWrapper = styled.div<AlbumImageProp>`
  position: relative;
  ${({ first }) =>
    first
      ? css`
          top: -50px;
        `
      : css`
          top: 50px;
        `};
  @media screen and (max-width: 768px) {
    top: 0;
  }
`;

const InfoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #000d1a;
  width: 140px;
  transition: 0.3s;

  &:hover {
    transform: translateY(-2px);
  }
`;
const Arrow = styled(IoMdArrowRoundForward)`
  margin-left: 10px;
`;

export default OneAlbum;
