import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap, Expo } from "gsap";
import { useLocation } from "react-router-dom";
import EyesPlayComponent from "./EyesPlayComponent";

function PageTransition({ children }) {
  const location = useLocation();
  const prevPathname = useRef(location.pathname);

  useEffect(() => {
    // If the pathname hasn't changed, skip the transition
    if (prevPathname.current === location.pathname) {
      return;
    }

    // Update the previous pathname with the current one
    prevPathname.current = location.pathname;

    const cntx = gsap.context(() => {
      const tl = gsap.timeline();

      // Animate the div sliding from left to right
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

      // Animate the content fade-in and slide up
      tl.from(".page", {
        opacity: 0,
        y: "100%",
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }).to(".page", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      });
    });

    return () => cntx.revert(); // Cleanup the context on unmount
  }, [location.pathname]);

  return (
    <>
      {prevPathname.current !== location.pathname && (
        <>
          <div className="transition-slide fixed top-0 left-0 w-full h-full bg-zinc-800 z-50 flex flex-col justify-between">
            <div className="relative w-full h-full p-10">
              <div className="absolute top-1/2 -translate-y-1/2 overflow-hidden flex items-center w-fit">
                <motion.span
                  key={location.pathname}
                  initial={{ y: "100%" }} // Start invisible
                  animate={{ y: ["100%", "0%", "-100%"] }} // Move to original position and then top
                  transition={{
                    duration: 1.5, // Duration for the entire animation
                    delay: 0.6, // Delay for start the animation
                    times: [0, 0.5, 1], // Timing for each phase
                    ease: [0.76, 0, 0.24, 1], // Easing function from easings.net (easeInOutQuart)
                  }}
                  className="w-fit font-franklin text-4xl sm:text-6xl text-[#FBF9ED] font-extrabold uppercase"
                >
                  {location.pathname.split("/")[1] === ""
                    ? "home"
                    : location.pathname.split("/")[1]}
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
