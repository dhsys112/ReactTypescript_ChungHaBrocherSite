import React, { useState, useEffect, useLayoutEffect } from "react";
import Dropdown from "components/Dropdown";
import Footer from "components/Footer";
import CustomCursor from "components/common/CustomEffect/CustomCursor";
import Navbar from "components/Navbar";
import GlobalStyle from "./style/globalStyles";
import { Switch, Route, useLocation } from "react-router-dom";
import Home from "pages/Home";
import About from "pages/HitSongs";
import Albums from "pages/Albums";
import SingleAlbum from "pages/Albums/Album";
import Pictures from "pages/Pictures";
import Aos from "aos";
import "aos/dist/aos.css";

// routes array
const routes = [
  { path: "/", name: "Home", Component: Home },
  { path: "/hitSongs", name: "hitSongs", Component: About },
  { path: "/albums", name: "albums", Component: Albums },
  { path: "/album/:albumId", name: "singleAlbum", Component: SingleAlbum },
  { path: "/pictures", name: "pictures", Component: Pictures },
];

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
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    Aos.init({});
  }, []);

  return (
    <>
      <GlobalStyle />
      <CustomCursor />
      <Navbar toggle={toggle} />
      <Dropdown isOpen={isOpen} toggle={toggle} />
      <Switch>
        {routes.map(({ path, Component }) => (
          <Route key={path} exact path={path} component={Component} />
        ))}
      </Switch>
      <Footer />
    </>
  );
}

export default App;
