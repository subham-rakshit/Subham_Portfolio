import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";
import { EyesPlayComponent } from "../components";

const skillsLists = [
  {
    id: "skill_list_1",
    category: "Languages",
    technologies: [
      {
        id: "python_1",
        tech: "Python",
        imagePath: "/python.png",
      },
      {
        id: "javascript_2",
        tech: "JavaScript",
        imagePath: "/js.png",
      },
    ],
  },
  {
    id: "skill_list_2",
    category: "Frontend Technologies",
    technologies: [
      {
        id: "html_1",
        tech: "HTML",
        imagePath: "/html.png",
      },
      {
        id: "css_2",
        tech: "CSS",
        imagePath: "/css.png",
      },
      {
        id: "tailwind_css_3",
        tech: "Tailwind CSS",
        imagePath: "/tailwind.png",
      },
      {
        id: "bootstrap_4",
        tech: "Bootstrap",
        imagePath: "/bootstrap.png",
      },
      {
        id: "flowbite_react_5",
        tech: "Flowbite React",
        imagePath: "/flowbitereact.jpg",
      },
    ],
  },
  {
    id: "skill_list_3",
    category: "Backend Technologies",
    technologies: [
      {
        id: "express_1",
        tech: "Express.js",
        imagePath: "/express.png",
      },
      {
        id: "nodejs_2",
        tech: "Node.js",
        imagePath: "/nodejs.png",
      },
      {
        id: "jwt_3",
        tech: "JSON Web Tokens",
        imagePath: "/jwt.png",
      },
      {
        id: "nodemailer_4",
        tech: "Nodemailer",
        imagePath: "/nodemailer.png",
      },
      {
        id: "firebase_5",
        tech: "Firebase",
        imagePath: "/firebase.png",
      },
    ],
  },
  {
    id: "skill_list_4",
    category: "JavaScript Libraries",
    technologies: [
      {
        id: "react_1",
        tech: "React",
        imagePath: "/react2.png",
      },
      {
        id: "redux_2",
        tech: "Redux Toolkit",
        imagePath: "/redux.png",
      },
      {
        id: "gsap_3",
        tech: "GSAP",
        imagePath: "/gsap.png",
      },
      {
        id: "framer_motion_4",
        tech: "Framer Motion",
        imagePath: "/framermotion.png",
      },
    ],
  },
  {
    id: "skill_list_5",
    category: "Database Technologies",
    technologies: [
      {
        id: "sql_1",
        tech: "SQL",
        imagePath: "/sql.jpg",
      },
      {
        id: "mongodb_2",
        tech: "MongoDB",
        imagePath: "/mongodb.png",
      },
      {
        id: "atlas_3",
        tech: "MongoDB Atlas",
        imagePath: "/mongodbatlas.png",
      },
      {
        id: "compass_4",
        tech: "MongoDB Compass",
        imagePath: "/mongodbcompass.png",
      },
    ],
  },
];

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
    setSkillId(e.target.id);
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
    <div className="about-section w-full min-h-screen">
      {/* About Masker Section */}
      <div className="masker-section-container w-full h-[50vh] px-5 border-b border-zinc-600">
        <div className="masker-outer-container w-full h-full max-w-[1400px] mx-auto flex flex-col justify-center gap-4">
          {["Driving Innovation", "with code"].map((item, index) => {
            return (
              <div
                key={`${item.split(" ").join("_")}${index}`}
                className="masker-inner-container w-full h-[62px] flex items-center"
              >
                <div className="flex items-center">
                  {index === 1 && isFixed && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "fit-content", marginRight: "5px" }}
                      transition={{
                        ease: [0.76, 0, 0.24, 1],
                        duration: 0.8,
                        delay: 0.5,
                      }}
                      className="overflow-hidden"
                    >
                      <img
                        src="/about-photo.png"
                        alt="about image"
                        className="w-[95px] h-[70px] bg-cover"
                      />
                    </motion.div>
                  )}
                  <h1
                    className="font-poppins font-extrabold text-5xl uppercase tracking-tighter leading-[0.75]"
                    style={{ transform: "scaleY(1.3)" }}
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
        <div className="w-full max-w-[1400px] mx-auto font-familjen flex justify-between gap-5">
          <h1 className="w-full">About me:</h1>
          <div className="w-full flex flex-col gap-3 tracking-tighter">
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
          <div className="w-full flex justify-end">
            <button
              type="button"
              className="h-fit flex items-center text-sm font-semibold border border-zinc-900 rounded-full px-5 py-3 bg-[transparent] hover:bg-zinc-950 text-zinc-900 hover:text-white gap-4 group transition-all duration-300 group uppercase"
            >
              My Works
              <div className="w-1 group-hover:w-5 h-1 group-hover:h-5 bg-zinc-800 group-hover:bg-zinc-200 rounded-full overflow-hidden flex items-center justify-center transition-all duration-300">
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
      <div className="relative w-full h-[60vh] p-5">
        <EyesPlayComponent queryClass="about-section" scale={1.2} />
      </div>

      {/* Markee Section */}
      <div className="w-full py-10 sm:py-20 bg-[#004D43] rounded-tl-[20px] sm:rounded-tl-[40px] rounded-tr-[20px] sm:rounded-tr-[40px] overflow-hidden">
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
        <div className="w-full max-w-[1300px] mx-auto px-5 mt-20 flex justify-between items-center">
          {/* Tech Category Buttons */}
          <div className="w-[48%] flex flex-col gap-5">
            {skillsLists.map((item) => {
              return (
                <button
                  type="button"
                  key={item.id}
                  id={item.id}
                  className={`w-fit font-poppins text-lg text-[#BFDA62] border-2 border-[#CDEA68] px-5 py-1 rounded-full cursor-pointer ${
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
              loop: Infinity,
            }}
            className="tech-box-main relative w-[48%] h-[60vh] cursor-pointer rounded-xl transition-all duration-500 ease-in-out shadow-md shadow-[#CDEA68]"
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
                  className={`absolute top-0 left-0 p-4 w-full h-full rounded-xl transition-all duration-500 ease-linear flex flex-col justify-between bg-zinc-200`}
                  style={{ zIndex: tech.zIndex }}
                  onClick={handleTechChanged}
                >
                  <div className="tech-box-img-container w-full flex justify-between gap-2">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/shibaji-website.appspot.com/o/PORTFOLIO%20LOGO%20(2).png?alt=media&token=ca91aa87-3de1-41af-9a8a-a0260af1a218"
                      alt="portfolio logo"
                      className="w-[50px] h-[40px] cursor-pointer filter brightness-0"
                    />
                    <div className="w-[200px] h-[200px] rounded-xl overflow-hidden flex justify-center items-center bg-zinc-300">
                      <img
                        src={tech.imagePath}
                        alt={tech.tech}
                        className="w-[80%] h-[80%] object-cover rounded-xl"
                      />
                    </div>
                  </div>
                  <div className="tech-box-name-container w-full flex justify-between gap-2">
                    <span
                      className="font-poppins tracking-tighter font-extrabold text-zinc-800 text-3xl uppercase"
                      style={{ transform: "scaleY(1.2)" }}
                    >
                      {tech.tech}
                    </span>
                    <span
                      className="font-poppins tracking-tighter font-extrabold text-zinc-800 text-3xl uppercase"
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
      </div>
    </div>
  );
}

export default About;
