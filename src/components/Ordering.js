import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Slideshow from "./components/Slideshow";
import Gallery from "./components/Gallery";
import About from "./components/About";
import Contact from "./components/Contact";
import Ordering from "./components/Ordering";  // Import the new component

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <Navbar />
      <Routes>
        <Route path="/" element={<PageWrapper component={<Slideshow />} />} />
        <Route path="/gallery" element={<PageWrapper component={<Gallery />} />} />
        <Route path="/about" element={<PageWrapper component={<About />} />} />
        <Route path="/ordering" element={<PageWrapper component={<Ordering />} />} /> {/* Add Ordering route */}
        <Route path="/contact" element={<PageWrapper component={<Contact />} />} />
      </Routes>
      <Footer />
    </Router>
  );
};

const PageWrapper = ({ component }) => {
  const isSlideshowPage = window.location.pathname === "/";
  return (
    <PageContainer isSlideshowPage={isSlideshowPage}>{component}</PageContainer>
  );
};

const PageContainer = styled.div`
  padding-top: ${(props) => (props.isSlideshowPage ? "0" : "105px")};
  padding-bottom: ${(props) => (props.isSlideshowPage ? "0" : "50px")};
  min-height: ${(props) =>
    props.isSlideshowPage ? "100vh" : "calc(100vh - 150px)"};
  overflow: ${(props) => (props.isSlideshowPage ? "hidden" : "auto")};
`;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif;
    box-sizing: border-box;
    overflow-x: hidden; /* Avoid horizontal scroll */
  }

  * {
    box-sizing: border-box;
  }
`;

export default App;
