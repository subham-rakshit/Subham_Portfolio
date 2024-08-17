import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer, Header } from "./components";
import { About, Contact, Home, Projects } from "./pages";

import Headroom from "react-headroom";
import { gsap, CSSPlugin, Expo } from "gsap";
gsap.registerPlugin(CSSPlugin);

function App() {
  const [counter, setCounter] = useState(0);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const count = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter < 100) {
          return prevCounter + 1;
        } else {
          clearInterval(count);
          reveal();
          return 100;
        }
      });
    }, 25);
    return () => clearInterval(count);
  }, []); // Ensure this useEffect runs only once on mount

  const reveal = () => {
    const t1 = gsap.timeline({
      onComplete: () => {
        console.log("Preloader Completed...");
        setIsFixed(true);
      },
    });
    t1.to(".follow", {
      width: "100%",
      duration: 0.3,
      ease: Expo.easeInOut,
    })
      .to(".hide", {
        opacity: 0,
        duration: 0.3,
      })
      .to(".hide", {
        display: "none",
        duration: 0.3,
      })
      .to(".follow", {
        height: "100%",
        duration: 0.5,
        delay: 0.2,
      })
      .to(".content", {
        width: "100%",
        duration: 0.7,
        ease: Expo.easeInOut,
      });
  };

  return (
    <div className="relative">
      <div className="loading w-full min-h-screen bg-zinc-800 flex justify-center items-center absolute top-0">
        <div className="follow absolute bg-[#f48049] h-[2px] w-0 left-0 z-[3]"></div>
        <div
          style={{ width: counter + "%" }}
          className="progressbar hide absolute left-0 bg-zinc-200 h-[2px] w-0 transition-all duration-500 ease-out"
        ></div>
        <p className="count hide absolute text-[100px] sm:text-[130px] text-zinc-200 -translate-y-[15px] font-extrabold">
          {counter}%
        </p>
        <div className="content min-h-screen w-0 absolute left-0 top-0 z-[4] bg-[#FBF9ED] overflow-hidden">
          <BrowserRouter>
            <Headroom>
              <Header isFixed={isFixed} />
            </Headroom>
            <Routes>
              <Route>
                <Route path="/" element={<Home isFixed={isFixed} />} />
              </Route>
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact-me" element={<Contact />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
