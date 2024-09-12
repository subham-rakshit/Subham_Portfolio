import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="w-full bg-[#FBF9ED] pt-5 lg:pt-10 px-5">
      <div className="w-full h-full max-w-[1400px] mx-auto flex flex-col sm:flex-row justify-between gap-1 lg:gap-2 font-poppins">
        <div className="flex items-center w-full gap-2 sm:w-1/2 sm:flex-col sm:items-start">
          <div className="flex items-end overflow-hidden w-fit">
            <h1 className="text-2xl font-extrabold tracking-tighter uppercase sm:text-4xl lg:text-6xl">
              Subham
            </h1>
          </div>
          <div className="flex items-end overflow-hidden w-fit">
            <h1 className="text-2xl sm:text-4xl lg:text-6xl font-extrabold uppercase tracking-tighter leading-[.75]">
              Rakshit
            </h1>
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <h1 className="mb-5 text-2xl font-extrabold tracking-tighter uppercase font-poppins sm:text-4xl">
            Portfolio
          </h1>
          <div className="flex justify-between gap-5">
            {/* Socilas */}
            <div className="flex flex-col w-full">
              <h1 className="text-lg font-medium">S:</h1>
              <div className="flex flex-col gap-1 mt-2">
                <Link
                  to="https://www.linkedin.com/in/subhamjitu97/"
                  target="_blank"
                >
                  <span className="w-[fit-content] text-sm font-light underline hover:font-medium transition-all duration-300 cursor-pointer">
                    Linkedin
                  </span>
                </Link>

                <Link to="https://github.com/subham-rakshit" target="_blank">
                  <span className="w-[fit-content] text-sm font-light underline hover:font-medium transition-all duration-300 cursor-pointer">
                    GitHub
                  </span>
                </Link>

                <Link
                  to="https://www.instagram.com/subham_rakshit_1/"
                  target="_blank"
                >
                  <span className="w-[fit-content] text-sm font-light underline hover:font-medium transition-all duration-300 cursor-pointer">
                    Instagram
                  </span>
                </Link>

                <Link
                  to="https://www.facebook.com/subham.rakshit.142"
                  target="_blank"
                >
                  <span className="w-[fit-content] text-sm font-light underline hover:font-medium transition-all duration-300 cursor-pointer">
                    Facebook
                  </span>
                </Link>
              </div>
            </div>
            {/* Links */}
            <div className="flex flex-col w-full">
              <h1 className="text-lg font-medium">L:</h1>
              <div className="flex flex-col gap-1 mt-2">
                <Link to="/">
                  <span className="w-[fit-content] text-sm font-light underline hover:font-medium transition-all duration-300 cursor-pointer">
                    Home
                  </span>
                </Link>

                <Link to="/about">
                  <span className="w-[fit-content] text-sm font-light underline hover:font-medium transition-all duration-300 cursor-pointer">
                    About
                  </span>
                </Link>

                <Link to="/projects">
                  <span className="w-[fit-content] text-sm font-light underline hover:font-medium transition-all duration-300 cursor-pointer">
                    Projects
                  </span>
                </Link>

                <Link to="/contact">
                  <span className="w-[fit-content] text-sm font-light underline hover:font-medium transition-all duration-300 cursor-pointer">
                    Contact
                  </span>
                </Link>
              </div>
            </div>
          </div>
          {/* Address */}
          <Link to="https://maps.app.goo.gl/N1MV9cJfvp4pdD4V6" target="_blank">
            <div className="flex flex-col flex-wrap gap-1 mt-5">
              <h1 className="text-lg font-medium">A:</h1>
              <div className="w-[fit-content] flex flex-col gap-1 mt-2 group">
                <span className="text-sm font-light transition-all duration-300 cursor-pointer group-hover:font-medium group-hover:underline">
                  Mahabir Colony East Rangamatia
                </span>
                <span className="text-sm font-light transition-all duration-300 cursor-pointer group-hover:font-medium group-hover:underline">
                  Rupnarayanpur, Paschim Bardhaman
                </span>
                <span className="text-sm font-light transition-all duration-300 cursor-pointer group-hover:font-medium group-hover:underline">
                  WestBengal
                </span>
                <span className="text-sm font-light transition-all duration-300 cursor-pointer group-hover:font-medium group-hover:underline">
                  713386
                </span>
              </div>
            </div>
          </Link>
          {/* Email */}
          <div className="flex flex-col gap-1 mt-5">
            <h1 className="text-lg font-medium">E:</h1>
            <span className="w-[fit-content] text-sm font-light hover:font-medium transition-all duration-300 cursor-pointer">
              subhamrakshit667@gmail.com
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between w-full gap-2 pb-5 mt-5 max-w-[1400px] mx-auto">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/shibaji-website.appspot.com/o/PORTFOLIO%20LOGO%20(2).png?alt=media&token=ca91aa87-3de1-41af-9a8a-a0260af1a218"
          alt="portfolio logo"
          className="w-[40px] h-[35px] cursor-pointer filter brightness-[.5] hidden sm:inline-block"
        />
        <span className="text-xs font-light font-poppins text-zinc-400">
          © 2024. <span className="underline">Legal Terms</span>
        </span>
        <span className="text-xs font-light font-poppins text-zinc-400">
          Website by Subham
        </span>
      </div>
    </div>
  );
}

export default Footer;
