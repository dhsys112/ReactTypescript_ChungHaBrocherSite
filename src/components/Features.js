import React from 'react';
import styled from 'styled-components';
import { Button } from 'components/common/Button';
import ImageOne from 'images/kitchen-1.jpg';

const Section = styled.section`
  background: #000d1a;
  padding: 12rem 0rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Container = styled.div`
  background: #fff;
  padding: 3rem 2rem;
  position: relative;
`;

const Wrap = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ColumnLeft = styled.div`
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
`;

const Content = styled.div`
// flex : 하나의 flex 아이템이 컨테이너가 차지하는
// 공간에 맞추기 위해, 크기 키우거나 줄이는 방법 
// 아래의 경우 3 value 에 대해 지정해준 것이다 
// 이렇게 되면, 브라우저 크기가 클 때는, 이미지가 오른쪽 50% 차지
// 모두 가로 배치 
  flex: 0 0 50%;

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

const ColumnRight = styled.div`
  position: absolute;
  top: -80px;
  right: 0;
  max-width: 850px;
  height: 140%;
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
  object-fit: cover;
`;

const Features = () => {
  return (
    <Section>
      <Container>
        <Wrap>
          <ColumnLeft>
            <Content
              data-aos='fade-right'
              data-aos-duration='1200'
              data-aos-delay='300'
              data-aos-once='true'
              data-aos-anchor-placement='center bottom'
            >
              <h1>Stunning Interior</h1>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Deserunt maxime commodi rem dignissimos, laborum eum beatae
                harum consectetur possimus architecto!
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod,
                voluptatem.
              </p>
              <Button to='/homes'>Learn More</Button>
            </Content>
          </ColumnLeft>
          <ColumnRight>
            <Image
              src={ImageOne}
              data-aos='fade-left'
              data-aos-duration='1200'
              data-aos-once='true'
              data-aos-anchor-placement='center bottom'
            />
          </ColumnRight>
        </Wrap>
      </Container>
    </Section>
  );
};

export default Features;
