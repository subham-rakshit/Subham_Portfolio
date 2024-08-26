import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  AdminProtectedRoute,
  DashboardProtectedRoute,
  Footer,
  Header,
  PageTransition,
  ScrollToTop,
} from "./components";
import { About, Admin, Contact, Dashboard, Home, Projects } from "./pages";
import Lenis from "lenis";

import Headroom from "react-headroom";
import { gsap, CSSPlugin, Expo } from "gsap";
gsap.registerPlugin(CSSPlugin);

function App() {
  const [counter, setCounter] = useState(0);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, [isFixed]);

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
      <div className="absolute top-0 flex items-center justify-center w-full min-h-screen loading bg-zinc-800">
        <div className="follow absolute bg-[#f48049] h-[2px] w-0 left-0 z-[3]"></div>
        <div
          style={{ width: counter + "%" }}
          className="progressbar hide absolute left-0 bg-zinc-200 h-[2px] w-0 transition-all duration-500 ease-out"
        ></div>
        <p className="count hide absolute text-[100px] sm:text-[130px] text-zinc-200 -translate-y-[15px] font-extrabold">
          {counter}%
        </p>
        <div
          className={`content min-h-screen w-0 absolute left-0 top-0 z-[4] bg-[#FBF9ED] overflow-hidden`}
        >
          <BrowserRouter>
            <Headroom style={{ zIndex: 999 }}>
              <Header isFixed={isFixed} />
            </Headroom>
            <PageTransition>
              <ScrollToTop />
              <Routes>
                <Route>
                  <Route path="/" element={<Home isFixed={isFixed} />} />
                </Route>
                <Route path="/about" element={<About isFixed={isFixed} />} />
                <Route
                  path="/projects"
                  element={<Projects isFixed={isFixed} />}
                />
                <Route
                  path="/contact"
                  element={<Contact isFixed={isFixed} />}
                />
                <Route element={<AdminProtectedRoute />}>
                  <Route path="/admin" element={<Admin />} />
                </Route>
                <Route element={<DashboardProtectedRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                </Route>
              </Routes>
            </PageTransition>
            <Footer />
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
