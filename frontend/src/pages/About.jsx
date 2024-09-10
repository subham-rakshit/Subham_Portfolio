import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { MdArrowOutward } from "react-icons/md";
import {
  CertificateSection,
  EyesPlayComponent,
  JourneySection,
  SwiperTechStacks,
} from "../components";
import { SyncLoader } from "react-spinners";
import { Link } from "react-router-dom";

function About({ isFixed }) {
  const [aboutDetails, setAboutDetails] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Languages");

  useEffect(() => {
    const getAbout = async () => {
      try {
        setFetchLoading(true);
        setFetchError(false);
        const api = "/api/admin/about";
        const res = await fetch(api);
        const data = await res.json();

        if (res.ok) {
          setAboutDetails(data.aboutDetails);
          setCategoryList((prev) => [
            ...prev,
            ...data.aboutDetails.skillsArray.map((skill) => skill.category),
          ]);
          setFetchLoading(false);
          setFetchError(false);
        } else {
          setFetchLoading(false);
          setFetchError(true);
          toast.error(data.extraDetails, {
            theme: "colored",
            position: "bottom-center",
          });
        }
      } catch (error) {
        setFetchLoading(false);
        setFetchError(true);
        console.log(`Error from About details fetching: ${error}`);
      }
    };
    getAbout();
  }, []);

  if (fetchLoading) {
    return (
      //INFO: Loading while fetch
      <div className="w-full max-w-[1200px] mx-auto flex items-center justify-center min-h-screen">
        <SyncLoader color="#18181B" size={10} />
      </div>
    );
  } else {
    if (fetchError) {
      //INFO: Fetch Error display
      <div className="relative flex flex-col items-center justify-center w-full px-5 py-5 overflow-hidden error-page sm:py-10">
        <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-2 lg:gap-3">
          {/* Eye Play */}
          <div className="relative w-full h-[200px]">
            <EyesPlayComponent queryClass="error-page" scale={0.7} />
          </div>
          {["OOPS!", "Something", "Went Wrong!"].map((text, index) => {
            const textId = `${text.toLowerCase().split(" ").join("_")}${index}`;

            return (
              <div
                key={textId}
                className="px-2 pb-1 mx-auto sm:pb-2 w-fit"
                style={{ transform: "scaleY(1.3)" }}
              >
                <h1
                  className="font-Founders_Grotesk_X-Condensed text-4xl sm:text-7xl lg:text-8xl font-extrabold tracking-tighter text-center text-zinc-950 uppercase z-[99] leading-none pt-0"
                  style={{ lineHeight: 0.8 }}
                >
                  {text}
                </h1>
              </div>
            );
          })}
        </div>
      </div>;
    } else {
      return (
        <div className="w-full min-h-screen about-section">
          {/* //INFO: About Masker Section */}
          <div className="masker-section-container w-full h-[40vh] sm:h-[50vh] px-1 sm:px-5 border-b border-zinc-600">
            <div className="masker-outer-container w-full h-full max-w-[1400px] mx-auto flex flex-col justify-center gap-0 sm:gap-4">
              {["Driving Innovation", "with code"].map((item, index) => {
                return (
                  <div
                    key={`${item.split(" ").join("_")}${index}`}
                    className="masker-inner-container w-full h-[45px] sm:h-[62px] flex items-center"
                    style={{ transform: "scaleY(1.1)" }}
                  >
                    <div className="flex items-center">
                      {index === 1 && isFixed && (
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{
                            width: "fit-content",
                            marginRight: "5px",
                          }}
                          viewport={{ margin: "-10px" }}
                          transition={{
                            ease: [0.34, 1.56, 0.64, 1],
                            duration: 1.5,
                          }}
                          className="overflow-hidden"
                        >
                          <img
                            src="/about-photo.png"
                            alt="about image"
                            className="w-[50px] sm:w-[92px] h-[30px] sm:h-[65px] bg-cover"
                          />
                        </motion.div>
                      )}
                      <h1
                        className="font-poppins font-extrabold text-xl sm:text-5xl uppercase tracking-none leading-[0.75]"
                        style={{ transform: "scaleY(1.5)" }}
                      >
                        {item}
                      </h1>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* //INFO: About Details Section */}
          <div className="w-full px-1 py-5 sm:py-10 sm:px-5">
            <div className="w-full max-w-[1400px] mx-auto font-familjen flex flex-col lg:flex-row justify-between gap-5">
              <h1 className="w-full">About me:</h1>
              <div className="flex flex-col w-full gap-3 tracking-tighter">
                <p>{aboutDetails ? aboutDetails.aboutMe : ""}</p>
              </div>
              <div className="flex justify-start w-full lg:justify-end">
                <Link to="/projects">
                  <button
                    type="button"
                    className="h-fit flex items-center text-sm font-semibold border border-zinc-900 rounded-full px-5 py-3 bg-[transparent] hover:bg-zinc-950 text-zinc-900 hover:text-white gap-4 group transition-all duration-300 group uppercase"
                  >
                    My Works
                    <div className="flex items-center justify-center w-1 h-1 overflow-hidden transition-all duration-300 rounded-full group-hover:w-5 group-hover:h-5 bg-zinc-800 group-hover:bg-zinc-200">
                      <MdArrowOutward
                        size="20"
                        color="#000"
                        className="relative top-[2vw] group-hover:top-0 transition-all duration-700"
                      />
                    </div>
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* //INFO: Eye Play Section */}
          <motion.div
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            transition={{
              ease: [0.34, 1.56, 0.64, 1],
              duration: 0.6,
            }}
            className="relative w-full h-[60vh] p-5 hidden sm:inline-block"
          >
            <EyesPlayComponent queryClass="about-section" scale={1.2} />
          </motion.div>

          {/* //INFO: Markee Section */}
          <div className="markee-section relative w-full py-10 sm:py-20 bg-[#004D43] rounded-tl-[20px] sm:rounded-tl-[40px] rounded-tr-[20px] sm:rounded-tr-[40px] overflow-hidden">
            {/* Markee Animate Text */}
            <div className="border-t-[1px] border-b-[1px] border-zinc-300 overflow-hidden whitespace-nowrap text-white flex">
              <motion.h1
                initial={{ x: "0" }}
                animate={{ x: "-100%" }}
                transition={{ ease: "linear", repeat: Infinity, duration: 20 }}
                className="text-[80px] sm:text-[150px] lg:text-[180px] uppercase font-Founders_Grotesk_X-Condensed leading-none tracking-tighter font-bold mb-[15px] pr-10"
              >
                Technologies I Utilize
              </motion.h1>
              <motion.h1
                initial={{ x: "0" }}
                animate={{ x: "-100%" }}
                transition={{ ease: "linear", repeat: Infinity, duration: 20 }}
                className="text-[80px] sm:text-[150px] lg:text-[180px] uppercase font-Founders_Grotesk_X-Condensed leading-none tracking-tighter font-bold mb-[15px] pr-10"
              >
                Technologies I Utilize
              </motion.h1>
            </div>
          </div>

          {/* //INFO: Swiper Tech Stacks Section */}
          <div className="w-full max-w-[1400px] min-h-screen mx-auto px-1 sm:px-5 flex flex-col gap-5 sm:gap-10 bg-neutral-800 py-10">
            <h1 className="text-xl tracking-tighter sm:text-3xl font-poppins text-zinc-100">
              Featured Certificates
            </h1>
            {/* Tech Category Buttons */}
            <div className="flex flex-row flex-wrap w-full gap-2 sm:gap-3 lg:gap-5">
              {[...new Set(categoryList)].map((item) => {
                return (
                  <button
                    type="button"
                    key={item}
                    id={item}
                    className={`w-fit font-poppins text-xs sm:text-lg text-zinc-100 border-2 border-[#CDEA68] px-2 sm:px-4 py-1 rounded-lg sm:rounded-full cursor-pointer ${
                      selectedCategory === item
                        ? "blur-0 bg-zinc-950 text-red-500 font-semibold scale-[1.1]"
                        : "blur-[1px]"
                    } transition-all duration-300 ease-in-out`}
                    onClick={(e) => setSelectedCategory(e.target.id)}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
            {/* Swiper Cards */}
            <SwiperTechStacks
              techStacks={aboutDetails && aboutDetails.skillsArray}
              selectedCategory={selectedCategory}
            />
          </div>

          {/* //INFO: Certificate Sections */}
          <div className="w-full px-1 py-20 sm:px-5 certificated-main-container">
            <CertificateSection
              certificatesStack={aboutDetails && aboutDetails.certificatesArray}
            />
          </div>

          {/* //INFO: Map Section */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1791.8098675173826!2d86.89186425639798!3d23.81294109463465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f6df5adbc3b40d%3A0x395a9735a3cc0a4b!2sMahabir%20Colony%20Kali%20mandir!5e1!3m2!1sen!2sin!4v1724230446001!5m2!1sen!2sin"
            className="w-full max-w-[1400px] mx-auto min-h-[500px]"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          {/* //INFO: Journey Section */}
          <JourneySection queryClass="about-section" />
        </div>
      );
    }
  }
}

export default About;
