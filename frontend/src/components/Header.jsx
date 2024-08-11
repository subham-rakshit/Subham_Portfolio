import React, { useState } from "react";
import { Link } from "react-router-dom";

import { FaGripLines } from "react-icons/fa";
import { MdClose } from "react-icons/md";

function Header() {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div className="fixed z-[999] w-full px-5 py-2 font-poppins text-white">
      <div className="w-full max-w-[1300px] mx-auto flex items-center justify-between">
        <div className="logo">
          <Link to="/">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/shibaji-website.appspot.com/o/PORTFOLIO%20LOGO%20(2).png?alt=media&token=ca91aa87-3de1-41af-9a8a-a0260af1a218"
              alt="portfolio logo"
              className="w-[50px] h-[40px] cursor-pointer"
            />
          </Link>
        </div>
        {/* Destop NavItems View */}
        <div className="hidden md:block">
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
                  className={`text-sm font-extralight capitalize cursor-pointer hover:font-normal transition-all duration-300 ${
                    index === 3 && "ml-36"
                  }`}
                >
                  {item.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>

        {/* NavItems Mobile View */}
        <button
          type="button"
          className="md:hidden transition-all duration-300 delay-200"
          onClick={() => setIsClicked((prev) => !prev)}
        >
          {isClicked ? <MdClose size="20" /> : <FaGripLines size="20" />}
        </button>
      </div>
    </div>
  );
}

export default Header;
