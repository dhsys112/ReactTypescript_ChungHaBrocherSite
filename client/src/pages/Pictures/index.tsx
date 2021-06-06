import React, { useState, useRef, useCallback } from "react";
import SinglePicture from "components/Pictures/Picture";
import styled from "styled-components/macro";
import GetPictureData from "components/Pictures/GetPictureData";

const TotalPictureContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  padding-top: 10vh;
`;
const Pictures = () => {
  const [pictureNumber, setPictureNumber] = useState(3);
  const observer = useRef<IntersectionObserver | null>();
  const { loading, pictures, hasMore } = GetPictureData(pictureNumber);

  // lastPictElementRef 에 해당하는 element가 create되면
  // 아래의 함수를 호출하게 된다
  // pictComponent는 해당 dom node가 들어오게 된다
  const lastPictElementRef = useCallback(
    (pictComponent) => {
      console.log("lastBook Element");
      // observer가 존재한다면 , disconnect -> 왜 ? reconnect할 것이기 때문
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        // on single element만 watch 한다
        if (entries[0].isIntersecting && hasMore) {
          setPictureNumber((prevNum) => prevNum + 3);
        }
      });
      // if sth is actually our last element ,
      // observer가 해당 요소를 observe 하게 만든다
      if (pictComponent) observer.current.observe(pictComponent);
    },
    [hasMore]
  );

  return (
    <TotalPictureContainer>
      {pictures[0] &&
        pictures.map((picture, idx) => {
          console.log("picture", picture);
          if (pictures.length === idx + 1) {
            return (
              <SinglePicture
                key={picture.idx}
                ref={lastPictElementRef}
                IsOdd={idx % 2 ? false : true}
                Image={picture}
              />
            );
          } else {
            return (
              <SinglePicture
                key={picture.idx}
                IsOdd={idx % 2 ? false : true}
                Image={picture}
              />
            );
          }
        })}
    </TotalPictureContainer>
  );
  // return null
};

export default Pictures;
