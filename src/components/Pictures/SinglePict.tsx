import React, { forwardRef, memo } from "react";
import styled, { css } from "styled-components/macro";
import { motion } from "framer-motion";
import { ImageDataType } from "assets/data/types";

interface SinglePictureProps {
  Image: ImageDataType;
  IsOdd: boolean;
}

const SinglePicture: React.FC<SinglePictureProps> = memo(
  forwardRef(({ Image, IsOdd = true }, ref) => {
    return (
      <PictureContainer odd={IsOdd} ref={ref}>
        <SingleImage
          src={Image.src}
          alt={Image.alt}
          initial="hidden"
          animate="visible"
          exit="exit"
          odd={IsOdd}
          data-aos={IsOdd ? "fade-right" : "fade-left"}
          data-aos-duration="1200"
          data-aos-delay="100"
          data-aos-once="true"
          data-aos-anchor-placement="center bottom"
        />
      </PictureContainer>
    );
  })
);
interface SingleImageContainerProps {
  odd: boolean;
  ref: any;
}
const PictureContainer = styled.div<SingleImageContainerProps>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: ${({ odd }) => (odd ? "flex-start" : "flex-end")};
`;

interface SingleImageProps {
  odd: boolean;
}
const SingleImage = styled(motion.img)<SingleImageProps>`
  width: 60%;
  // max-width :500px;
  height: 70vh;
  object-fit: cover;
  margin: 2vh 0;
  margin-left: ${({ odd }) => (odd ? "5%" : "0%")};
  margin-right: ${({ odd }) => (odd ? "0%" : "5%")};
  border-radius: 10px;
  @media screen and (max-width: 430px) {
    width: 80%;
    height: 40vh;
  }
`;

export default SinglePicture;
