import {useRef , useEffect, memo } from 'react';
import styled , {keyframes} from 'styled-components/macro';


const CustomScrollDown = memo(() => {
    return(
        <ScrollDown/>
    ) 
})

const scroll_down = keyframes`
    0% {
    /* top:20%; */
    opacity: 0;
    }
    30% {
    opacity: 1;
    }
    60% {
    opacity: 1;
    }
    100% {
    top: 90%;
    opacity: 0;
    }
}
`

const ScrollDown = styled.div`
    height: 50px;
    width: 30px;
    border: 2px solid whitesmoke;
    position: absolute;
    left: 50%;
    bottom: 20px;
    border-radius: 50px;
    cursor: pointer;

    &::before, &::after{
        content: "";
        position: absolute;
        top: 20%;
        left: 50%;
        height: 10px;
        width: 10px;
        transform: translate(-50%, -100%) rotate(45deg);
        border: 2px solid whitesmoke;
        border-top: transparent;
        border-left: transparent;
        // animation: scroll_down 1s ease-in-out infinite;
        animation-duration: 1.5s;
        animation-timing-function: ease-in-out;
        animation-name: ${scroll_down};
        animation-iteration-count: infinite;
    }

    &::before{
        top: 30%;
        animation-delay: 0.3s;
        animation-duration: 1.5s;
        animation-timing-function: ease-in-out;
        animation-name: ${scroll_down};
        animation-iteration-count: infinite;
    }
`

export default CustomScrollDown