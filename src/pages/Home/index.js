import React from 'react';
import Features from 'components/Features';
import Hero from 'components/common/Hero';
import Listings from 'components/common/Listings';
import { InfoData, InfoDataTwo } from 'assets/data/InfoData';
import { SliderData } from 'assets/data/SliderData';
import InfoSection from 'components/common/InfoSection';
import Video from 'components/Video'

const Home = () => {
  return (
    <>
      <Hero slides={SliderData} />
      <InfoSection {...InfoData} />
      <Listings datas =  {SliderData.slice(0,2)} />
      <Features />
      <InfoSection {...InfoDataTwo} />
      <Video/>
    </>
  );
};

export default Home;
