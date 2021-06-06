import React, { useRef, useEffect } from "react";
import styled from "styled-components";

const CustomCursor = () => {
  console.log("custom cursor");
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRefFollow = useRef<HTMLDivElement>(null);
  const cursorPosChange = (event: MouseEvent) => {
    const { clientX, clientY } = event;
    if (cursorRef.current != null && cursorRefFollow.current != null) {
      const mouseX = clientX - cursorRef.current.clientWidth / 2;
      const mouseY = clientY - cursorRef.current.clientHeight / 2;
      cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      cursorRefFollow.current.style.transform = `translate3d(${
        mouseX - 10
      }px , ${mouseY - 10}px , 0)`;
    }
  };
  useEffect(() => {
    document.addEventListener("mousemove", cursorPosChange);
    return () => {
      document.removeEventListener("mousemove", cursorPosChange);
    };
  }, []);

  return (
    <>
      <CursorComp ref={cursorRef} />
      <CursorCompFollow ref={cursorRefFollow} />
    </>
  );
};

const CursorComp = styled.div`
  z-index: 100;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  border: 2px solid grey;
  background-color: grey;
  pointer-events: none;
  overflow: hidden;
  transform: translateY(0, 0, 0);
  transition: 0.1s;
  position: fixed;
`;
const CursorCompFollow = styled.div`
  z-index: 100;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  border: 2px solid darkgray;
  pointer-events: none;
  overflow: hidden;
  transform: translateY(0, 0, 0);
  transition: 0.2s;
  position: fixed;
`;

export default CustomCursor;
