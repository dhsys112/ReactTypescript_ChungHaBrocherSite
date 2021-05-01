import React, { memo } from 'react';
import styled, { css } from 'styled-components/macro';
import YouTube from 'react-youtube';
import {HeroSection,HeroWrapper,HeroSlide} from 'components/common/Hero'

const Video = memo(({videoId}) => {
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const videoOnReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.playVideo(50);
  }
  const videoOnPlay = (event) => {
    const player =  event.target
    console.log("play")
    console.log(player.getCurrentTime())
  }

  // ex) https://youtu.be/tkBAvP85jvc
  return (
    <>
        <VideoSection>
            <VideoWrapper>
                <VideoSlide >
                    <VideoSlider>
                        <YouTube
                            videoId={videoId}
                            opts={opts} 
                            onReady={videoOnReady} 
                            onPlay={videoOnPlay}
                        />;
                    </VideoSlider>
                </VideoSlide>
            </VideoWrapper>
        </VideoSection>
    </>
  );
});


const VideoSection = styled(HeroSection)``

const VideoWrapper = styled(HeroWrapper)``

// 한장의 slide 에 대한 전체 wrapper 
const VideoSlide = styled(HeroSlide)``

// 일부 slide 에 대한 Slide
const VideoSlider = memo(styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  // 위에 까지는, 하나의 화면이 다 차게끔 하는 것이었다 
  // 아래는 , 해당 image 위에 overlay를 더하는 과정이다 
`);

export default Video;
