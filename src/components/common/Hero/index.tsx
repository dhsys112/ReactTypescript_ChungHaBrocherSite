import React, { useEffect, useState, useRef, memo } from "react";
import styled, { css } from "styled-components/macro";
import { Button } from "components/common/Button";
import { IoMdArrowRoundForward } from "react-icons/io";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import CustomScrollDown from "components/common/CustomEffect/CustomScrollDown";
import { ImageInfoType } from "assets/data/types";

interface HeroProps {
  slides: Array<ImageInfoType>;
}

const Hero = memo(({ slides }: HeroProps) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const nextSlide = () => {
      setCurrent((current) => (current === length - 1 ? 0 : current + 1));
    };
    // 맨 처음 화면 render 마자 실행된다
    timeout.current = setTimeout(nextSlide, 3000);
    // 다른 화면 등으로 넘어가게 되면 종료시켜준다
    return function () {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [current, length]);

  const nextSlide = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  // 현재 slide에 해당하는 요소가 배열이 아니거나
  // 배열 내에 데이터가 존재하지 않는다면
  // null을 리턴시킨다
  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  // Animation을 함수 obj 개념으로도 적용할 수 있다
  const fadeAnimation = {
    hidden: { opacity: 0 },
    // duration : framer-motion 효과 (얼마나 빨리 나타나는지 )
    visible: { opacity: 1, transition: { duration: 0.8 } },
    exit: { opacity: 0 },
  };

  return (
    <>
      <HeroSection>
        <HeroWrapper>
          <AnimatePresence>
            {slides.map((slide, index) => {
              return (
                <HeroSlide key={index}>
                  {/* index == current , 즉 현재 
                current img 번째와 맞는 img 를 보여준다 */}
                  {index === current && (
                    <HeroSlider>
                      <HeroImage
                        src={slide.image}
                        alt={slide.alt}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={fadeAnimation}
                      />
                      {/* data-aos...이는 모두 animation 적용 방법을 세팅하는 것  */}
                      <HeroContent>
                        <h1 data-aos="fade-down" data-aos-duration="600">
                          {slide.title}
                        </h1>
                        <p
                          data-aos="fade-down"
                          data-aos-duration="600"
                          data-aos-delay="200"
                        >
                          {slide.price}
                        </p>
                        <Button
                          data-aos="zoom-out"
                          data-aos-duration="500"
                          data-aos-delay="250"
                          to={slide.path}
                          primary={true}
                          maxControl={true}
                        >
                          {slide.label}
                          <Arrow />
                        </Button>
                      </HeroContent>
                    </HeroSlider>
                  )}
                </HeroSlide>
              );
            })}
          </AnimatePresence>
          <SliderButtons>
            <PrevArrow onClick={prevSlide} />
            <NextArrow onClick={nextSlide} />
          </SliderButtons>
          <ScrollDownCssDiv>
            <CustomScrollDown />
          </ScrollDownCssDiv>
        </HeroWrapper>
      </HeroSection>
    </>
  );
});

export const HeroSection = memo(styled.section`
  height: 100vh;
  max-height: 1100px;
  position: relative;
  overflow: hidden;
`);

export const HeroWrapper = memo(styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
`);

// 한장의 slide 에 대한 전체 wrapper
export const HeroSlide = memo(styled.div`
  z-index: 1;
  width: 100%;
  height: 100%;
`);

// 일부 slide 에 대한 Slide
const HeroSlider = memo(styled.div`
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

  &::before {
    content: "";
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100vh;
    bottom: 0vh;
    left: 0;
    overflow: hidden;
    opacity: 0.4;
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0.2) 50%,
      rgba(0, 0, 0, 0.6) 100%
    );
  }
`);

// framer-motion 적용을 위해 일반 img가 아니라
// motion.img로 바꿔야 한다
const HeroImage = memo(styled(motion.img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  // object-fit : (img),(video) 같은 콘텐츠 크기를
  // 어떤 방식으로 조절하여, 요소에 맞출 것인가
  // cover : 세로,가로비 유지하여, 전체 채운다 (일부 잘릴 수 있다)
  object-fit: cover;
`);

const HeroContent = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  max-width: 1600px;
  width: calc(100% - 100px);
  color: #fff;

  h1 {
    // font-size : clamp
    // 1번째 요소 = 1rem : 제일 작은 크기
    // 2번째 요소 = 8vw : 기준점(작으면,1rem로 작아져간다,크면,2rem으로 커간다)
    // 3번째 요소 = 2rem : 제일 큰 크기
    font-size: clamp(1rem, 8vw, 2rem);
    font-weight: 400;
    text-transform: uppercase;
    text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.4);
    text-align: left;
    margin-bottom: 0.8rem;
  }

  p {
    margin-bottom: 1.2rem;
    text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.4);
  }
`;

const Arrow = memo(styled(IoMdArrowRoundForward)`
  margin-left: 0.5rem;
`);

const ScrollDownCssDiv = styled.div`
  position: absolute;
  bottom: 0;
  right: 50%;
  z-index: 10;
`;

const SliderButtons = styled.div`
  position: absolute;
  bottom: 50px;
  right: 50px;
  display: flex;
  z-index: 10;
`;

const arrowButtons = css`
  width: 50px;
  height: 50px;
  color: #fff;
  cursor: pointer;
  background: #000d1a;
  border-radius: 50px;
  padding: 10px;
  margin-right: 1rem;
  // 텍스트를 선택하지 못하도록 한다
  user-select: none;
  transition: 0.3s;

  &:hover {
    background: #353866;
    transform: scale(1.05);
  }
`;

const PrevArrow = styled(IoArrowBack)`
  ${arrowButtons}
`;

const NextArrow = styled(IoArrowForward)`
  ${arrowButtons}
`;

export default Hero;
