import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components/macro';
import { Link, useLocation } from 'react-router-dom';
import { menuData } from 'assets/data/MenuData';
import { Button } from 'components/common/Button';
import Bars from 'assets/images/bars.svg';

// Nav 전체를 감싸는 wrapper
const Nav = styled.nav`
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  z-index: 100;
  // position : fixed를 통해 상단 고정 
  position: fixed;
  width: 100%;
`;

// link 와 관련된 요인들을 위한 공통 css 
const NavLink = css`
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  text-decoration: none;
`;

const Logo = styled(Link)`
// 비슷한 형태의 css를 styled에 묶는다 
  ${NavLink}
  font-style: italic;
`;

// image
const MenuBars = styled.i`
  display: none;
  // 해당 버튼은 오히려, 작아지면 나타나게 한다 
  @media screen and (max-width: 768px) {
    display: block;
    background-image: url(${Bars});
    background-size: contain;
    height: 40px;
    width: 40px;
    cursor: pointer;
    // 여기서 중요한 점 : 전체 nav를 감싸
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-50%, 25%);
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -48px;

  // 특정 크기 이하로 작아지면 사라진다 
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavMenuLinks = styled(Link)`
  ${NavLink}
`;

const NavBtn = styled.div`
  display: flex;
  align-items: center;
  margin-right: 24px;

  // 특정 크기 이하로 작아지면 사라진다 
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Navbar = ({ toggle }) => {
  // useLocation은, 현재 url 에 관한 정보를 보여준다
  // 마치 url에 대한 useState 개념으로, 
  // url 정보가 바뀔 때마다, 해당 url 과 관련된 location obj를 리턴해준다 
  const [navbar, setNavbar] = useState(false);
  const location = useLocation();

  const changeBackground = () => {
    // navBar의 높이가 60이기 때문에, 60으로 설정 
    // pageYOffset : 문서가 수직으로 얼마나 스크롤 되었는가 
    if (window.pageYOffset >= 60) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    const watchScroll = () => {
      window.addEventListener('scroll', changeBackground);
    };

    watchScroll();

    return () => {
      window.removeEventListener('scroll', changeBackground);
    };
  }, []);

  // NavBar 가 Home Page일때만 다르게 style
  let style = {
    backgroundColor:
      navbar || location.pathname !== '/' ? '#353866' : 'transparent',
    transition: '0.4s'
  };

  return (
    <Nav style={style}>
      <Logo to='/'>CHUNGHA</Logo>
      <MenuBars onClick={toggle} />
      <NavMenu>
        {menuData.map((item, index) => (
          <NavMenuLinks to={item.link} key={index}>
            {item.title}
          </NavMenuLinks>
        ))}
      </NavMenu>
      <NavBtn>
        {/* <Button to='/contact' primary='true'>
          Contact Us
        </Button> */}
      </NavBtn>
    </Nav>
  );
};

export default Navbar;
