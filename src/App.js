import React, { useState, useEffect, useLayoutEffect } from 'react';
import Dropdown from 'components/Dropdown';
import Footer from 'components/Footer';
import Navbar from 'components/Navbar';
import GlobalStyle from './globalStyles';
import { Switch, Route, useLocation } from 'react-router-dom';
import Home from 'pages/Home';
import About from 'pages/About';
import Homes from 'pages/Homes';
import Rentals from 'pages/Rentals';
import Contact from 'pages/Contact';
import Picture from 'pages/Pictures';
import Aos from 'aos';
import 'aos/dist/aos.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  console.log(location.pathname);

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
      <Navbar toggle={toggle} />
      <Dropdown isOpen={isOpen} toggle={toggle} />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/about' component={About} />
        <Route path='/homes' component={Homes} />
        <Route path='/rentals' component={Rentals} />
        <Route path='/contact' component={Contact} />
        <Route path='/picture' component={Picture} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
