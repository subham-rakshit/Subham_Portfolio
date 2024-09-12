import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  AdminProtectedRoute,
  DashboardProtectedRoute,
  Footer,
  Header,
  PageTransition,
  ProjectItemDetails,
  ScrollToTop,
} from "./components";
import {
  About,
  Admin,
  Contact,
  Dashboard,
  DashboardAboutUpdate,
  DashboardProjectUpdate,
  Home,
  Projects,
} from "./pages";
import Lenis from "lenis";
import Headroom from "react-headroom";
import { gsap, CSSPlugin, Expo } from "gsap";
gsap.registerPlugin(CSSPlugin);

function App() {
  const [counter, setCounter] = useState(0);
  const [isFixed, setIsFixed] = useState(false);

  //NOTE: Lenis Smooth Scroll effect
  useEffect(() => {
    const lenis = new Lenis();
    //INFO: Create a requestAnimationFrame loop for Lenis
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    //INFO: Cleanup Lenis on unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  //NOTE: Preloader Counter
  useEffect(() => {
    const count = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter < 100) {
          return prevCounter + 1;
        } else {
          clearInterval(count);
          reveal(); //INFO: Calling the function to execute GSAP functionality
          return 100;
        }
      });
    }, 25);

    return () => clearInterval(count);
  }, []); //INFO: Ensure this useEffect runs only once on mount

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
        {/* //INFO: Main white progress bar, will come according to counter value */}
        <div
          style={{ width: counter + "%" }}
          className="progressbar hide absolute left-0 bg-zinc-200 h-[2px] w-0 transition-all duration-500 ease-out"
        ></div>

        {/* //INFO: After complition of white progress bar, this orange bar will come and expand in Y axis */}
        <div className="follow absolute bg-[#f48049] h-[2px] w-0 left-0 z-[3]"></div>

        {/* //INFO: Counter value */}
        <p className="count hide absolute text-[100px] sm:text-[130px] text-zinc-200 -translate-y-[15px] font-extrabold">
          {counter}%
        </p>

        {/* //INFO: Main Content Components  */}
        <div
          className={`content min-h-screen w-0 absolute left-0 top-0 z-[4] bg-[#FBF9ED] overflow-hidden`}
        >
          <BrowserRouter>
            {/* //INFO: Header Component */}
            <Headroom style={{ zIndex: 999 }}>
              <Header isFixed={isFixed} />
            </Headroom>
            <PageTransition>
              {/* //INFO: Scroll To Top while navigating between pages */}
              <ScrollToTop />
              <Routes>
                {/* //INFO: Home Route */}
                <Route path="/" element={<Home isFixed={isFixed} />} />
                {/* //INFO: About Route */}
                <Route path="/about" element={<About isFixed={isFixed} />} />
                {/* //INFO: All Projects Route */}
                <Route
                  path="/projects"
                  element={<Projects isFixed={isFixed} />}
                />
                {/* //INFO: Contact Route */}
                <Route
                  path="/contact"
                  element={<Contact isFixed={isFixed} />}
                />
                {/* //INFO: ProjectItem Details Route */}
                <Route
                  path="/project/:projectSlug"
                  element={<ProjectItemDetails />}
                />
                {/* //INFO: Admin Login Route */}
                <Route element={<AdminProtectedRoute />}>
                  <Route path="/admin" element={<Admin />} />
                </Route>
                {/* //INFO: Dashboard Routes */}
                <Route element={<DashboardProtectedRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route
                    path="/dashboard/projectUpdate/:slug/:projectId"
                    element={<DashboardProjectUpdate />}
                  />
                  <Route
                    path="/dashboard/aboutUpdate"
                    element={<DashboardAboutUpdate />}
                  />
                </Route>
              </Routes>
            </PageTransition>
            {/* //INFO: Footer Component */}
            <Footer />
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
