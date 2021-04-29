import React ,{ useState , useRef } from 'react';
import SinglePicture from 'components/Pictures/SinglePict';
import styled from 'styled-components/macro';
import GetPictureData from 'components/Pictures/GetPictureData'

const TotalPictureContainer = styled.div`
    width : 100%;
    height : fit-content;
    display: flex;
    flex-direction: column;
    padding-top : 10vh;
`;
const Pictures = () => {
    const [pictureNumber , setPictureNumber ] = useState(1) 
    const observer = useRef()

    const {
        loading,
        pictures,
        hasMore
    } = GetPictureData(pictureNumber)
    return (
        <TotalPictureContainer>
            {pictures.map((picture,idx) => {
                return <SinglePicture key = {picture.src} IsOdd = {idx % 2 ? false : true} Image ={picture} />;
            })}
        </TotalPictureContainer>
    )
  // return null
};

export default Pictures;
