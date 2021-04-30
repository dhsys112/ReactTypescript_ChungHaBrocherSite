import React from 'react';
import Features from 'components/Features';

const About = () => {
  return(
    <>
      {Array(7).fill(1).map((feature,idx) => {
          return (
              <Features key = {idx} IsOdd = { idx % 2 == 0} />
          )
      })}
    </>
  )
};

export default About;
