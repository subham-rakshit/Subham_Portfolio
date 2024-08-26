import React from "react";

function Footer() {
  return (
    <div className="w-full bg-[#FBF9ED] pt-5 lg:pt-10 px-5">
      <div className="w-full h-full max-w-[1300px] max-auto flex flex-col sm:flex-row justify-between gap-1 lg:gap-2 font-poppins">
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
                <span className="w-[fit-content] text-sm font-light underline hover:font-medium transition-all duration-300 cursor-pointer">
                  Linkedin
                </span>
                <span className="w-[fit-content] text-sm font-light underline hover:font-medium transition-all duration-300 cursor-pointer">
                  GitHub
                </span>
                <span className="w-[fit-content] text-sm font-light underline hover:font-medium transition-all duration-300 cursor-pointer">
                  Instagram
                </span>
                <span className="w-[fit-content] text-sm font-light underline hover:font-medium transition-all duration-300 cursor-pointer">
                  Facebook
                </span>
              </div>
            </div>
            {/* Links */}
            <div className="flex flex-col w-full">
              <h1 className="text-lg font-medium">L:</h1>
              <div className="flex flex-col gap-1 mt-2">
                <span className="w-[fit-content] text-sm font-light underline hover:font-medium transition-all duration-300 cursor-pointer">
                  Home
                </span>
                <span className="w-[fit-content] text-sm font-light underline hover:font-medium transition-all duration-300 cursor-pointer">
                  Services
                </span>
                <span className="w-[fit-content] text-sm font-light underline hover:font-medium transition-all duration-300 cursor-pointer">
                  Projects
                </span>
                <span className="w-[fit-content] text-sm font-light underline hover:font-medium transition-all duration-300 cursor-pointer">
                  About
                </span>
                <span className="w-[fit-content] text-sm font-light underline hover:font-medium transition-all duration-300 cursor-pointer">
                  Contact
                </span>
              </div>
            </div>
          </div>
          {/* Address */}
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
          {/* Email */}
          <div className="flex flex-col gap-1 mt-5">
            <h1 className="text-lg font-medium">E:</h1>
            <span className="w-[fit-content] text-sm font-light hover:font-medium underline transition-all duration-300 cursor-pointer">
              subhamrakshit667@gmail.com
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 pb-5 mt-5">
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
