import React, { memo } from "react";
import styled, { css } from "styled-components/macro";
import StyledFrame from "react-iframe";
// import YouTube from "react-youtube";
import { HeroSection, HeroWrapper, HeroSlide } from "components/common/Hero";

interface VideoProps {
  videoId: string;
}
const Video = memo(({ videoId }: VideoProps) => {
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  /*
  const videoOnReady = (event :a ) => {
    // access to player in all event handlers via event.target
    event.target.playVideo(50);
  };
  const videoOnPlay = (event) => {
    const player = event.target;
    console.log("play");
    console.log(player.getCurrentTime());
  };
  */

  // ex) https://youtu.be/tkBAvP85jvc
  return (
    <>
      <VideoSection>
        <VideoWrapper>
          <VideoSlide>
            <VideoSlider>
              <YoutubeDiv>
                <YoutubeIframe
                  url={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  frameBorder={1}
                />
              </YoutubeDiv>
              {/* <YouTube
                            videoId={videoId}
                            opts={opts} 
                            onReady={videoOnReady} 
                            onPlay={videoOnPlay}
                        />; */}
            </VideoSlider>
          </VideoSlide>
        </VideoWrapper>
      </VideoSection>
    </>
  );
});

const VideoSection = styled(HeroSection)``;

const VideoWrapper = styled(HeroWrapper)``;

// 한장의 slide 에 대한 전체 wrapper
const VideoSlide = styled(HeroSlide)``;

// 일부 slide 에 대한 Slide
const VideoSlider = styled.div`
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
`;

// Youtube Video Wrapper
const YoutubeDiv = styled.div`
  position: relative;
  padding-bottom: 56.25% /* 16:9 */;
  padding-top: 25;
  width: 100%;
  height: 100%;
`;

// Youtube Iframe
const YoutubeIframe = styled(StyledFrame)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  width: 70%;
  height: 70%;
`;

export default Video;
