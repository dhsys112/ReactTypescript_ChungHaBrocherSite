import React from 'react';
import AlbumContainer from 'components/Albums/AlbumContainer';
import styled from 'styled-components/macro';
import {AlbumIntroDatas} from 'assets/data/AlbumData'

const Albums = () => {
  const TwoAlbumsAtOnceArray = []
  for(let i = 0 ; i < AlbumIntroDatas.length; i+= 2){
    TwoAlbumsAtOnceArray.push(AlbumIntroDatas.slice(i,i+2))
  }
  return (
    <>
    <Section>
      <Container>
        <Heading>
          <h1
            data-aos='fade-right'
            data-aos-duration='1000'
            data-aos-once='true'
            data-aos-anchor-placement='center bottom'
          >
            View Albums
          </h1>
        </Heading>
        {TwoAlbumsAtOnceArray[0] && TwoAlbumsAtOnceArray.map((AlbumIntroData,idx) => {
          return (
            <AlbumContainer key = {idx} datas = {AlbumIntroData} />
          )
        })}
      </Container>
    </Section>
    </>
  )
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

