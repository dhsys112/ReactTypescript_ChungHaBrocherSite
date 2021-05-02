import React from 'react';
import styled ,{css, keyframes} from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundForward } from 'react-icons/io';

const OneAlbum = ({AlbumData,first}) => {
    console.log("Intro Page Single Album Id", AlbumData.id)
    return (
        <>
        <InfoWrap
            data-aos='zoom-out-up'
            data-aos-duration= {first ? '1200' : '900' }
            data-aos-once='true'
            data-aos-anchor-placement='center bottom'
        >
            <Image first = {first} src={AlbumData.image} alt='home' />
            <InfoWrapper first = {first}>
              <h2>{AlbumData.title}</h2>
              <InfoLink to= {`/album/${AlbumData.id}`}>
              <p>View Details</p>
              <Arrow />
              </InfoLink>
            </InfoWrapper>
        </InfoWrap>
        </>  
    );
  };

  const InfoWrap = styled.div`
  padding: 0rem 1rem;
  min-height: 550px;
  height: 100%;

  h2 {
    margin-bottom: 1rem;
    font-weight: 400;
  }

  @media screen and (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;


const Image = styled.img`
  position: relative; // to allow element's placement
  top: -20px;
  ${({ first }) => ( first ? css `top:-50px;` : css`top:50px;` )};
  width: 100%;
  height: 100%;
  max-width: 600px;
  max-height: 400px;
  object-fit: cover;
  margin-bottom: 1rem;
  transition: all 0.5s ease-in-out;
  &:hover{
    transform : scale(1.02); 
  }
`;

const InfoWrapper = styled.div`
  position: relative;
  ${({ first }) => ( first ? css `top:-50px;` : css`top:50px;` )};
`

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
  