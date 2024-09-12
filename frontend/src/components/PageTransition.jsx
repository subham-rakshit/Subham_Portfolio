import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap, Expo } from "gsap";
import { useLocation } from "react-router-dom";
import EyesPlayComponent from "./EyesPlayComponent";

function PageTransition({ children }) {
  const location = useLocation();
  const prevPathname = useRef(location.pathname);

  //NOTE: Compute the display text based on the path segments
  const pathSegments = location.pathname.split("/");
  const displayText =
    pathSegments.length > 2
      ? pathSegments[2].split("-").join(" ")
      : pathSegments[1] === ""
      ? "Home"
      : pathSegments[1];

  useEffect(() => {
    //INFO: If the pathname hasn't changed, skip the transition
    if (prevPathname.current === location.pathname) {
      return;
    }

    //INFO: Update the previous pathname with the current one
    prevPathname.current = location.pathname;

    const cntx = gsap.context(() => {
      const tl = gsap.timeline();

      //INFO: Animate the div sliding from left to right
      tl.from(".transition-slide", {
        y: "100%",
        duration: 1.5,
        ease: Expo.easeInOut,
      })
        .to(".transition-slide", {
          y: "-100%",
          duration: 1.2,
          ease: Expo.easeInOut,
        })
        .to(".transition-slide", {
          display: "none",
          duration: 0.3,
        });

      //INFO: Animate the content fade-in and slide up
      tl.from(".page", {
        opacity: 0,
        y: "100%",
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
      }).to(".page", {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
      });
    });

    return () => cntx.revert(); //INFO: Cleanup the context on unmount
  }, [location.pathname]);

  return (
    <>
      {prevPathname.current !== location.pathname && (
        <>
          <div className="transition-slide fixed top-0 left-0 w-full h-full bg-zinc-800 z-[999999999999] flex flex-col justify-between">
            <div className="relative w-full h-full p-2 borpder sm:p-5">
              <div className="absolute flex items-center overflow-hidden -translate-y-1/2 top-1/2 w-fit">
                <motion.span
                  key={location.pathname}
                  initial={{ y: "100%" }} //INFO: Start invisible
                  animate={{ y: ["100%", "0%", "-100%"] }} //INFO: Move to original position and then top
                  transition={{
                    duration: 1.5, //INFO: Duration for the entire animation
                    delay: 0.6, //INFO: Delay for start the animation
                    times: [0, 0.5, 1], //INFO: Timing for each phase
                    ease: [0.76, 0, 0.24, 1], //INFO: Easing function from easings.net (easeInOutQuart)
                  }}
                  className="w-fit font-franklin text-3xl sm:text-6xl text-[#FBF9ED] font-extrabold uppercase"
                >
                  {displayText}
                </motion.span>
              </div>
              <div className="absolute top-full left-full -translate-x-full -translate-y-full w-fit h-[150px]">
                <EyesPlayComponent
                  queryClass="transition-slide"
                  scale={0.5}
                  position={{
                    top: "50%",
                    left: "100%",
                    translateX: "-100%",
                    translateY: "-50%",
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}
      <div className="page">{children}</div>
    </>
  );
}

export default PageTransition;
