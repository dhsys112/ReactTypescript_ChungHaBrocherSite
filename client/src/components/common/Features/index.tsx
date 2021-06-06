import React from "react";
import styled, { css } from "styled-components";
import { Button } from "components/common/Button";
import ImageOne from "assets/images/kitchen-1.jpg";

interface FeaturesPrps {
  IsOdd: boolean;
  routeIdx: number;
  img: string;
  album: string;
  song: string;
  paragraph1: string;
  paragraph2: string;
}
const Features = ({
  IsOdd,
  routeIdx,
  img,
  album,
  song,
  paragraph1,
  paragraph2,
}: FeaturesPrps) => {
  return (
    <Section>
      <Container>
        <Wrap>
          <ColumnLeft IsOdd={IsOdd}>
            <Content
              data-aos={IsOdd ? "fade-left" : "fade-right"}
              data-aos-duration="1200"
              data-aos-delay="200"
              data-aos-once="true"
              data-aos-anchor-placement="center bottom"
            >
              <h1>{song}</h1>
              <p>{album}</p>

              <Button to={`/album/${routeIdx}`}>Learn More</Button>
            </Content>
          </ColumnLeft>
          <ColumnRight IsOdd={IsOdd}>
            <Image
              src={img}
              data-aos={IsOdd ? "fade-left" : "fade-right"}
              data-aos-duration="1200"
              data-aos-once="true"
              data-aos-anchor-placement="center bottom"
            />
          </ColumnRight>
        </Wrap>
      </Container>
    </Section>
  );
};

const Section = styled.section`
  // background: #000d1a;
  background: #aaabd3;
  padding: 6rem 0rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Container = styled.div`
  background: #fff;
  padding: 2rem 2rem;
  position: relative;
`;

const Wrap = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

interface FeatureColumnPrps {
  IsOdd: boolean;
}

const ColumnLeft = styled.div<FeatureColumnPrps>`
  // flex-wrap : flex-item 요소들이 강제로 한줄에
  // 배치되게 할 것인지, 가능한 영역 내에서 벗어나지 않고
  // 여러행으로 나누어 표현할 것인지 결정한다
  // 1) nowrap : 한줄에 강제로 배치 ( 범위 벗어날 수 있음 )
  // 2) wrap : 여러행으로 나누어 나타나게 한다
  display: flex;
  flex-wrap: wrap;
  margin: 0px -15px;
  justify-content: flex-start;
  padding: 1rem;
  ${({ IsOdd }) =>
    IsOdd
      ? css`
          justify-content: flex-start;
        `
      : css`
          justify-content: flex-end;
        `}
`;

const Content = styled.div`
  // flex : 하나의 flex 아이템이 컨테이너가 차지하는
  // 공간에 맞추기 위해, 크기 키우거나 줄이는 방법
  // 아래의 경우 3 value 에 대해 지정해준 것이다
  // 이렇게 되면, 브라우저 크기가 클 때는, 이미지가 오른쪽 50% 차지
  // 모두 가로 배치
  flex: 0 0 50%;
  font-size: 1rem;
  @media screen and (max-width: 768px) {
    // 이미지가 100% 차지, 세로 배치
    flex: 0 0 100%;
    max-width: 100%;
    margin-top: 250px;
  }
  h1 {
    margin-bottom: 2rem;
    font-size: 2rem;
  }
  p {
    margin-bottom: 1rem;
    line-height: 1.5;
  }
`;

const ColumnRight = styled.div<FeatureColumnPrps>`
  position: absolute;
  // top: -80px;
  top: -10%;
  ${({ IsOdd }) =>
    IsOdd
      ? css`
          right: 0;
        `
      : css`
          left: 0;
        `}
  max-width: 850px;
  height: 120%;
  width: 45%;
  padding-left: 1rem;
  @media screen and (max-width: 768px) {
    height: 320px;
    top: -65px;
    width: 80%;
    margin: 0 auto;
    left: 0;
  }
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
  border-radius: 5px;
`;

export default Features;
