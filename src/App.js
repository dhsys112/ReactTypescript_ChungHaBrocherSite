import React, { useState, useEffect, useLayoutEffect } from 'react';
import Dropdown from 'components/Dropdown';
import Footer from 'components/Footer';
import CustomCursor from 'components/common/CustomEffect/CustomCursor';
import Navbar from 'components/Navbar';
import GlobalStyle from './globalStyles';
import { Switch, Route, useLocation } from 'react-router-dom';
import Home from 'pages/Home';
import About from 'pages/HitSongs';
import Albums from 'pages/Albums';
import SingleAlbum from 'pages/Albums/SingleAlbum';
import Contact from 'pages/Contact';
import Pictures from 'pages/Pictures';
import Aos from 'aos';
import 'aos/dist/aos.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  
  // useEffect와 같은 역할
  // 단지, 렌더링 이후, 화면 업데이트 되기 "이전"
  // 동기적으로 실행된다
  // 보통, DOM을 변경하려는 경우, 많이 사용된다 
  useLayoutEffect(
    () => {
      window.scrollTo(0, 0);
    },
    [location.pathname]
  );

  useEffect(() => {
    Aos.init({});
  }, []);

  return (
    <>
      <GlobalStyle />
      <CustomCursor/>
      <Navbar toggle={toggle} />
      <Dropdown isOpen={isOpen} toggle={toggle} />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/hitSongs' component={About} />
        <Route path='/albums' component={Albums} />
        <Route path='/album/:albumId' component={SingleAlbum} />
        {/*<Route path='/rentals' component={Rentals} />*/}
        <Route path='/contact' component={Contact} />
        <Route path='/pictures' component={Pictures} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
