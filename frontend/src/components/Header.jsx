import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import { FaGripLines } from "react-icons/fa";
import { MdClose } from "react-icons/md";

function Header({ isFixed }) {
  const [isClicked, setIsClicked] = useState(false);
  const [path, setPath] = useState(null);
  const location = useLocation();

  // Onscroll navbar background change logic
  window.addEventListener("scroll", function () {
    let headerElem = document.querySelector(".navbar");
    headerElem.classList.toggle("sticky", window.scrollY > 0);
  });

  // Extracting the pathname from path location
  useEffect(() => {
    const urlParams = new URLSearchParams(location);
    const pathURL = urlParams.get("pathname");
    if (isFixed) {
      setPath(pathURL);
    }
  }, [location, isFixed]);

  return (
    <div
      className={`navbar w-full px-5 py-2 font-poppins text-zinc-800 transition-all duration-300 ease-in-out`}
    >
      <div className="w-full max-w-[1300px] mx-auto flex items-center justify-between">
        <div className="logo">
          <Link to="/">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/shibaji-website.appspot.com/o/PORTFOLIO%20LOGO%20(2).png?alt=media&token=ca91aa87-3de1-41af-9a8a-a0260af1a218"
              alt="portfolio logo"
              className="w-[50px] h-[40px] cursor-pointer filter brightness-0"
            />
          </Link>
        </div>
        {/* Destop NavItems View */}
        <div className="hidden sm:inline-block">
          <ul className="list-none pl-0 flex items-center gap-5">
            {[
              { name: "Home", link: "/" },
              { name: "About", link: "/about" },
              { name: "Projects", link: "/projects" },
              { name: "Contact", link: "/contact-me" },
            ].map((item, index) => (
              <Link to={item.link} key={`${item.name}${index}`}>
                <li
                  key={`${item.name}${index}`}
                  className={`text-sm capitalize cursor-pointer hover:font-medium transition-all duration-500 ease-in-out ${
                    index === 3 && "ml-20 lg:ml-36"
                  } ${path && path === item.link && "font-medium"}`}
                >
                  {item.name}
                  <motion.hr
                    initial={{ width: 0, border: "none" }}
                    animate={
                      path && path === item.link
                        ? {
                            width: "100%",
                            border: "1px solid rgb(217, 102, 255)",
                          }
                        : { width: 0, border: "none" }
                    }
                    transition={{ duration: 0.4, delay: 0.2, ease: "linear" }}
                    className="w-0"
                  />
                </li>
              </Link>
            ))}
          </ul>
        </div>

        {/* NavItems Mobile View */}
        <button
          type="button"
          className="sm:hidden transition-all duration-300 delay-200"
          onClick={() => setIsClicked((prev) => !prev)}
        >
          <FaGripLines size="20" />
        </button>

        {/* Nav Items Container */}
        <motion.div
          initial={{ y: "-100%", opacity: 0 }}
          animate={
            isClicked ? { y: 0, opacity: 1 } : { y: "-100%", opacity: 0 }
          }
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className={`absolute sm:hidden top-0 left-0 w-full h-screen overflow-hidden bg-[rgba(66,66,66,0.8)] backdrop-blur-[10px] flex flex-col justify-between p-10`}
        >
          <MdClose
            color="#FBF9ED"
            size="30"
            className="self-end cursor-pointer"
            onClick={() => setIsClicked((prev) => !prev)}
          />
          {/* Navigation Items Mobile view */}
          <ul className="list-none pl-0 flex flex-col gap-5 mt-5">
            {[
              { name: "Home", link: "/" },
              { name: "About", link: "/about" },
              { name: "Projects", link: "/projects" },
              { name: "Contact", link: "/contact-me" },
            ].map((item, index) => (
              <Link to={item.link} key={`${item.name}${index}`}>
                <li
                  key={`${item.name}${index}`}
                  className={`w-fit text-2xl text-[#FBF9ED] font-Founders_Grotesk_X-Condensed capitalize cursor-pointer transition-all duration-300 ${
                    path && path === item.link
                      ? "text-[#B8D253] font-bold"
                      : "text-[#FBF9ED] font-normal"
                  }`}
                >
                  {item.name}
                  <motion.hr
                    initial={{ width: 0, border: "none" }}
                    animate={
                      path && path === item.link
                        ? {
                            width: "100%",
                            border: "1px solid rgb(217, 102, 255)",
                          }
                        : { width: 0, border: "none" }
                    }
                    transition={{ duration: 0.4, delay: 0.2, ease: "linear" }}
                    className="w-0"
                  />
                </li>
              </Link>
            ))}
          </ul>

          {/* Social Links Mobile view */}
          <ul className="list-none pl-0 flex justify-between items-center gap-2 mt-5">
            {[
              { name: "linkedin_1", href: "/linkedin.png", link: "/" },
              { name: "github_2", href: "/github-light.png", link: "/about" },
              { name: "facebook_3", href: "/facebook.png", link: "/projects" },
              {
                name: "instagram_4",
                href: "/instagram.png",
                link: "/contact-me",
              },
            ].map((logo) => (
              <Link to={logo.link} key={logo.name}>
                <li
                  key={logo.name}
                  className={`w-fit hover:scale-[1.2] transition-all duration-300 ease-in-out`}
                >
                  <img src={logo.href} alt={logo.name} className="w-7 h-w-7" />
                </li>
              </Link>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

export default Header;
