import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";
import {
  CertificateSection,
  EyesPlayComponent,
  JourneySection,
} from "../components";
import { skillsLists } from "../data/data";

function About({ isFixed }) {
  const [skillId, setSkillId] = useState(null);
  //? techList state with adding z-index for each tech items
  const [techList, setTechList] = useState(() => {
    return skillsLists[0].technologies.map((tech, index) => ({
      ...tech,
      zIndex: (skillsLists[0].technologies.length - index) * 10,
    }));
  });
  const [selectedCategory, setSelectedCategory] = useState(skillsLists[0].id);

  //* Handle Skill's Category button's functionality
  const handleSkillCategory = (e) => {
    // Change the selectedCategory state
    setSelectedCategory(e.target.id);

    // Adding new z-index to the new techList
    const selectedCategoryData = skillsLists.find(
      (skill) => skill.id === e.target.id
    );
    const newTechList = selectedCategoryData.technologies.map(
      (tech, index) => ({
        ...tech,
        zIndex: (selectedCategoryData.technologies.length - index) * 10,
      })
    );
    setTechList(newTechList);
  };

  //* Handle technologies box functionality
  const handleTechChanged = (e) => {
    const clickedTechId = e.target.id;
    setSkillId(clickedTechId);
  };

  //* Handle technologies box after clicked animation functionality
  useEffect(() => {
    if (skillId) {
      const techArr = [...techList]; // Copy of techList data

      // Find the index of clicked tech
      const selectedTechIndex = techList.findIndex(
        (tech) => tech.id === skillId
      );

      // Remove the clicked tech from techArr
      const [techData] = techArr.splice(selectedTechIndex, 1);

      // Shuffle z-index for remaining tech items
      techArr.forEach((tech, index) => {
        tech.zIndex = (techArr.length - index) * 10;
      });

      techArr.push({ ...techData, zIndex: 0 }); // Add the clicked tech at the last with a new zIndex

      setTechList(techArr); // set the techList state
    }
  }, [skillId]);

  return (
    <div className="min-h-screen -full about-section">
      {/* About Masker Section */}
      <div className="masker-section-container w-full h-[40vh] sm:h-[50vh] px-5 border-b border-zinc-600">
        <div className="masker-outer-container w-full h-full max-w-[1400px] mx-auto flex flex-col justify-center gap-0 sm:gap-4">
          {["Driving Innovation", "with code"].map((item, index) => {
            return (
              <div
                key={`${item.split(" ").join("_")}${index}`}
                className="masker-inner-container w-full h-[45px] sm:h-[62px] flex items-center"
              >
                <div className="flex items-center">
                  {index === 1 && isFixed && (
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "fit-content", marginRight: "5px" }}
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
                        className="w-[50px] sm:w-[92px] h-[35px] sm:h-[65px] bg-cover"
                      />
                    </motion.div>
                  )}
                  <h1
                    className="font-poppins font-extrabold text-xl sm:text-5xl uppercase tracking-tighter leading-[0.75]"
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
      {/* About Details Section */}
      <div className="w-full px-5 py-10">
        <div className="w-full max-w-[1400px] mx-auto font-familjen flex flex-col lg:flex-row justify-between gap-5">
          <h1 className="w-full">About me:</h1>
          <div className="flex flex-col w-full gap-3 tracking-tighter">
            <p>
              In the world of web development, agility and precision are
              paramount. These aren't just buzzwords—they're the essence of my
              craft. Every line of code I write, every application I build, is
              driven by a commitment to seamless user experiences and robust,
              scalable solutions.
            </p>
            <p>
              I believe that powerful digital products speak louder than words.
              They captivate users, streamline operations, and elevate
              businesses. That's why I've dedicated myself to mastering the MERN
              stack—so I can bring your ideas to life with efficiency and
              elegance. Let's transform your vision into reality, one
              exceptional web application at a time.
            </p>
          </div>
          <div className="flex justify-start w-full lg:justify-end">
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
          </div>
        </div>
      </div>
      {/* Eye Play Section */}
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

      {/* Markee Section */}
      <motion.div
        initial={{ opacity: 0.5 }}
        whileInView={{ opacity: 1 }}
        viewport={{ amount: 0.5 }}
        transition={{
          ease: [0.34, 1.56, 0.64, 1],
          duration: 1.2,
        }}
        className="markee-section relative w-full py-10 sm:py-20 bg-[#004D43] rounded-tl-[20px] sm:rounded-tl-[40px] rounded-tr-[20px] sm:rounded-tr-[40px] overflow-hidden"
      >
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
        {/* Technologies */}
        <div className="w-full max-w-[1300px] mx-auto px-5 mt-10 sm:mt-20 flex flex-col lg:flex-row gap-5  sm:gap-16 justify-between items-center">
          {/* Tech Category Buttons */}
          <div className="w-full lg:w-[48%] flex flex-row flex-wrap gap-1 sm:gap-3 lg:gap-5">
            {skillsLists.map((item) => {
              return (
                <button
                  type="button"
                  key={item.id}
                  id={item.id}
                  className={`w-fit font-poppins text-xs sm:text-lg text-[#BFDA62] border-2 border-[#CDEA68] px-2 sm:px-4 py-1 rounded-lg sm:rounded-full cursor-pointer ${
                    selectedCategory === item.id
                      ? "blur-0 bg-[#CDEA68] text-black font-semibold"
                      : "blur-[1px]"
                  } hover:bg-[#CDEA68] hover:text-black transition-all duration-300 ease-in-out`}
                  onClick={handleSkillCategory}
                >
                  {item.category}
                </button>
              );
            })}
          </div>
          {/* Technologies Boxes */}
          <motion.div
            key={selectedCategory} // Forces re-render on category change
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.5, 0.8, 1],
              scale: [0, 0.5, 0.8, 1],
            }}
            transition={{
              ease: "easeInOut",
              duration: 0.8,
            }}
            className="tech-box-main relative w-full sm:w-[80%] lg:w-[48%] h-[40vh] lg:h-[60vh] cursor-pointer rounded-xl transition-all duration-500 ease-in-out shadow-md shadow-[#CDEA68]"
          >
            {techList.map((tech) => {
              return (
                <motion.div
                  initial={{ y: 0, x: 0, scale: 1 }}
                  animate={
                    skillId === `${tech.id}` && {
                      y: ["0%", "100%", "0%"],
                      x: ["0%", "-100%", "0%"],
                      scale: [1, 0.5, 1],
                    }
                  }
                  transition={{
                    ease: [0.76, 0, 0.24, 1],
                    duration: 1.5,
                    delay: skillId !== `${tech.id}` ? 0.3 : 0, // Adding delay for better visibility
                  }}
                  id={tech.id}
                  key={`${tech.id + new Date().getTime()}`}
                  className={`each-tech-box absolute top-0 left-0 p-4 w-full h-full rounded-xl transition-all duration-500 ease-linear flex flex-col justify-between bg-zinc-200`}
                  style={{ zIndex: tech.zIndex }}
                  onClick={handleTechChanged}
                >
                  <div className="flex justify-between w-full gap-2 tech-box-img-container">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/shibaji-website.appspot.com/o/PORTFOLIO%20LOGO%20(2).png?alt=media&token=ca91aa87-3de1-41af-9a8a-a0260af1a218"
                      alt="portfolio logo"
                      className="w-[50px] h-[40px] cursor-pointer filter brightness-0"
                    />
                    <div className="w-[100px] sm:w-[200px] h-[100px] sm:h-[200px] rounded-xl overflow-hidden flex justify-center items-center bg-zinc-300">
                      <img
                        src={tech.imagePath}
                        alt={tech.tech}
                        className="w-[80%] h-[80%] object-cover rounded-xl"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between w-full gap-2 tech-box-name-container">
                    <span
                      className="text-2xl font-extrabold tracking-tighter uppercase font-poppins text-zinc-800 sm:text-4xl"
                      style={{ transform: "scaleY(1.2)" }}
                    >
                      {tech.tech}
                    </span>
                    <span
                      className="text-2xl font-extrabold tracking-tighter uppercase font-poppins text-zinc-800 sm:text-3xl"
                      style={{ transform: "scaleY(1.2)" }}
                    >
                      {tech.id.split("_")[tech.id.split("_").length - 1]} /{" "}
                      {techList.length}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>

      {/* Certificate Sections */}
      <div className="w-full px-5 py-20 certificated-main-container">
        <CertificateSection />
      </div>

      {/* Map Section */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1791.8098675173826!2d86.89186425639798!3d23.81294109463465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f6df5adbc3b40d%3A0x395a9735a3cc0a4b!2sMahabir%20Colony%20Kali%20mandir!5e1!3m2!1sen!2sin!4v1724230446001!5m2!1sen!2sin"
        className="w-full min-h-[500px]"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      {/* Journey Section */}
      <JourneySection queryClass="about-section" />
    </div>
  );
}

export default About;
