export const wcmContent = [
  {
    id: "WCM_1",
    title: "Versatile Skill Set",
    content:
      "I bring a comprehensive skill set that spans the entire development stack. Whether it's front-end design with React, back-end logic with Node.js, or database management with MongoDB, I have the expertise to handle every aspect of your project. My versatility ensures that I can see the bigger picture and deliver a cohesive, fully functional application.",
  },
  {
    id: "WCM_2",
    title: "Proven Track Record",
    content:
      "I have successfully completed numerous projects across various fileds, from small to big applications. My portfolio includes a wide range of web applications, each designed to solve specific category and deliver measurable results in terms of quality, reliability, and user interface.",
  },
  {
    id: "WCM_3",
    title: "Best Practices",
    content:
      "I follows industry best practices in coding, security, and user experience design. This commitment ensures that the applications I develop are not only functional but also secure, maintainable, and future-proof. I use modern development tools and workflows to ensure that your project is delivered on time and to the highest standards.",
  },
  {
    id: "WCM_4",
    title: "Problem-Solving Skills",
    content:
      "Complex challenges excite me. I enjoy diving into the basics of a problem, understanding its core, and devising effective solutions. My problem-solving mindset ensures that I can tackle any issues that arise during development, ensuring smooth progress and a high-quality end product.",
  },
  {
    id: "WCM_5",
    title: "Dedication to Growth",
    content:
      "When you bring me on board, you're not just hiring a developer, you're investing in someone who is committed to growing alongside your company. I'm passionate about contributing to the long-term success of the organization, continuously seeking ways to enhance my skills and bring more value to the team.",
  },
];

export const certificateList = [
  {
    id: "cer_1",
    image: "/1 Static Website Certificate.png",
    date: "30-11-2022",
  },
  {
    id: "cer_2",
    image: "/2 Responsive Website Certficate.png",
    date: "13-12-2022",
  },
  {
    id: "cer_3",
    image: "/3 Python.png",
    date: "15-03-2023",
  },
  {
    id: "cer_4",
    image: "/4 Dynamic Web Application.png",
    date: "28-04-2023",
  },
  {
    id: "cer_5",
    image: "/5 Databases SQL.png",
    date: "02-06-2023",
  },
  {
    id: "cer_6",
    image: "/6 JS Essential.png",
    date: "06-07-2023",
  },
  {
    id: "cer_7",
    image: "/7 Responsive Web Design Using Flexbox.png",
    date: "27-07-2023",
  },
  {
    id: "cer_8",
    image: "/8 Developer Foundation.png",
    date: "05-09-2023",
  },
  {
    id: "cer_9",
    image: "/9 NodeJs.png",
    date: "11-10-2023",
  },
  {
    id: "cer_10",
    image: "/10 ReactJS.png",
    date: "23-04-2024",
  },
];

export const skillsLists = [
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
    category: "Frontend",
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
    category: "Backend",
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
    category: "JS Libraries",
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
    category: "Database",
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

// //NOTE: Create About Details
//   async createAboutDetails(req, res, next) {
//     if (req.user.userId !== req.params.userId) {
//       const adminError = {
//         status: 406,
//         message: "User not valid administrator.",
//         extraDetails: "You are not allowed to create about!",
//       };
//       return next(adminError);
//     }

//     const { aboutDetails } = req.body;
//     const {
//       aboutMe,
//       techName,
//       selectedCategory,
//       techImageURL,
//       issueDate,
//       certificateImageURL,
//     } = aboutDetails;

//     //INFO: Check all filed's value is present or not
//     if (
//       !aboutMe &&
//       !techName &&
//       selectedCategory === "Languages" &&
//       !techImageURL &&
//       !issueDate &&
//       !certificateImageURL
//     ) {
//       const valueError = {
//         status: 404,
//         message: "Input value missing!",
//         extraDetails: "Please fill the field properly.",
//       };
//       return next(valueError);
//     }

//     //INFO: Exsistance about details
//     const defaultAboutMe =
//       "In the world of web development, agility and precision are paramount. These aren't just buzzwords—they're the essence of my craft. Every line of code I write, every application I build, is driven by a commitment to seamless user experiences and robust, scalable solutions. I believe that powerful digital products speak louder than words. They captivate users, streamline operations, and elevate businesses. That's why I've dedicated myself to mastering the MERN stack—so I can bring your ideas to life with efficiency and elegance. Let's transform your vision into reality, one exceptional web application at a time.";

//     const about = await AboutCollection.findOne({});

//     //INFO: Check techName is already present or not
//     if (about) {
//       const techNameIsPresent = about.skillsArray.some(
//         (item) => item.techName === techName
//       );
//       if (techNameIsPresent) {
//         const techNameError = {
//           status: 400,
//           message: "Tech already present.",
//           extraDetails: "Tech details already present.",
//         };
//         return next(techNameError);
//       }
//     }

//     //INFO: Check certificate is already present or not
//     if (about) {
//       const certificateIsPresent = about.certificatesArray.some(
//         (item) => item.certificateImageURL === certificateImageURL
//       );
//       if (certificateIsPresent) {
//         const certificateError = {
//           status: 400,
//           message: "Certificate already present.",
//           extraDetails: "Certificate details already present.",
//         };
//         return next(certificateError);
//       }
//     }

//     //INFO: Check about is present in DB or not
//     if (!about) {
//       //INFO: Create new about details and store in DB
//       const aboutInfo = new AboutCollection({
//         aboutMe: aboutMe.trim() || defaultAboutMe,
//         skillsArray: [
//           {
//             techName: techName.trim(),
//             techImageURL: techImageURL.trim(),
//             category: selectedCategory,
//           },
//         ],
//         certificatesArray: [
//           {
//             issueDate,
//             certificateImageURL,
//           },
//         ],
//       });
//       try {
//         const saveAboutInfo = await aboutInfo.save();
//         res.status(201).json({
//           success: true,
//           message: "You have successfully create about details.",
//           aboutDetails: saveAboutInfo,
//         });
//       } catch (error) {
//         return next(error);
//       }
//     } else if (about) {
//       //INFO: If admin fill only tech related details
//       if (
//         techName &&
//         techImageURL &&
//         selectedCategory &&
//         !issueDate &&
//         !certificateImageURL
//       ) {
//         const updatedAboutInfo = await AboutCollection.findByIdAndUpdate(
//           about._id,
//           {
//             $set: {
//               aboutMe: aboutMe.trim() || defaultAboutMe,
//               skillsArray: [
//                 ...about.skillsArray,
//                 {
//                   techName: techName.trim(),
//                   techImageURL: techImageURL.trim(),
//                   category: selectedCategory,
//                 },
//               ],
//             },
//           },
//           { new: true }
//         );

//         res.status(201).json({
//           success: true,
//           message: "You have successfully updated about details.",
//           aboutDetails: updatedAboutInfo,
//         });
//       } else if (
//         issueDate &&
//         certificateImageURL &&
//         !techName &&
//         !techImageURL &&
//         selectedCategory === "Languages"
//       ) {
//         //INFO: If admin fill only certificate related details
//         const updatedAboutInfo = await AboutCollection.findByIdAndUpdate(
//           about._id,
//           {
//             $set: {
//               aboutMe: aboutMe.trim() || defaultAboutMe,
//               certificatesArray: [
//                 ...about.certificatesArray,
//                 {
//                   issueDate,
//                   certificateImageURL,
//                 },
//               ],
//             },
//           },
//           { new: true }
//         );

//         res.status(201).json({
//           success: true,
//           message: "You have successfully updated about details.",
//           aboutDetails: updatedAboutInfo,
//         });
//       } else {
//         //INFO: Else
//         const updatedAboutInfo = await AboutCollection.findByIdAndUpdate(
//           about._id,
//           {
//             $set: {
//               aboutMe: aboutMe.trim() || defaultAboutMe,
//               skillsArray: [
//                 ...about.skillsArray,
//                 {
//                   techName: techName.trim(),
//                   techImageURL: techImageURL.trim(),
//                   category: selectedCategory,
//                 },
//               ],
//               certificatesArray: [
//                 ...about.certificatesArray,
//                 {
//                   issueDate,
//                   certificateImageURL,
//                 },
//               ],
//             },
//           },
//           { new: true }
//         );

//         res.status(201).json({
//           success: true,
//           message: "You have successfully updated about details.",
//           aboutDetails: updatedAboutInfo,
//         });
//       }
//     }
//   },

// {
//   /* Technologies */
// }
// <div className="w-full max-w-[1300px] mx-auto px-1 sm:px-5 mt-10 sm:mt-20 flex flex-col lg:flex-row gap-5  sm:gap-16 justify-between items-center">
//   {/* Tech Category Buttons */}
//   <div className="w-full lg:w-[48%] flex flex-row flex-wrap gap-1 sm:gap-3 lg:gap-5">
//     {skillsLists.map((item) => {
//       return (
//         <button
//           type="button"
//           key={item.id}
//           id={item.id}
//           className={`w-fit font-poppins text-xs sm:text-lg text-[#BFDA62] border-2 border-[#CDEA68] px-2 sm:px-4 py-1 rounded-lg sm:rounded-full cursor-pointer ${
//             selectedCategory === item.id
//               ? "blur-0 bg-[#CDEA68] text-black font-semibold"
//               : "blur-[1px]"
//           } hover:bg-[#CDEA68] hover:text-black transition-all duration-300 ease-in-out`}
//           onClick={handleSkillCategory}
//         >
//           {item.category}
//         </button>
//       );
//     })}
//   </div>
//   {/* Technologies Boxes */}
//   <motion.div
//     key={selectedCategory} // Forces re-render on category change
//     initial={{ opacity: 0, scale: 0 }}
//     animate={{
//       opacity: [0, 0.5, 0.8, 1],
//       scale: [0, 0.5, 0.8, 1],
//     }}
//     transition={{
//       ease: "easeInOut",
//       duration: 0.8,
//     }}
//     className="tech-box-main relative w-full sm:w-[80%] lg:w-[48%] h-[40vh] lg:h-[60vh] cursor-pointer rounded-xl transition-all duration-500 ease-in-out shadow-md shadow-[#CDEA68]"
//   >
//     {techList.map((tech) => {
//       return (
//         <motion.div
//           initial={{ y: 0, x: 0, scale: 1 }}
//           animate={
//             skillId === `${tech.id}` && {
//               y: ["0%", "100%", "0%"],
//               x: ["0%", "-100%", "0%"],
//               scale: [1, 0.5, 1],
//             }
//           }
//           transition={{
//             ease: [0.76, 0, 0.24, 1],
//             duration: 1.5,
//             delay: skillId !== `${tech.id}` ? 0.3 : 0, // Adding delay for better visibility
//           }}
//           id={tech.id}
//           key={`${tech.id + new Date().getTime()}`}
//           className={`each-tech-box absolute top-0 left-0 p-4 w-full h-full rounded-xl transition-all duration-500 ease-linear flex flex-col justify-between bg-zinc-200`}
//           style={{ zIndex: tech.zIndex }}
//           onClick={handleTechChanged}
//         >
//           <div className="flex justify-between w-full gap-2 tech-box-img-container">
//             <img
//               src="https://firebasestorage.googleapis.com/v0/b/shibaji-website.appspot.com/o/PORTFOLIO%20LOGO%20(2).png?alt=media&token=ca91aa87-3de1-41af-9a8a-a0260af1a218"
//               alt="portfolio logo"
//               className="w-[50px] h-[40px] cursor-pointer filter brightness-0"
//             />
//             <div className="w-[100px] sm:w-[200px] h-[100px] sm:h-[200px] rounded-xl overflow-hidden flex justify-center items-center bg-zinc-300">
//               <img
//                 src={tech.imagePath}
//                 alt={tech.tech}
//                 className="w-[80%] h-[80%] object-cover rounded-xl"
//               />
//             </div>
//           </div>
//           <div className="flex justify-between w-full gap-2 tech-box-name-container">
//             <span
//               className="text-2xl font-extrabold tracking-tighter uppercase font-poppins text-zinc-800 sm:text-4xl"
//               style={{ transform: "scaleY(1.2)" }}
//             >
//               {tech.tech}
//             </span>
//             <span
//               className="text-2xl font-extrabold tracking-tighter uppercase font-poppins text-zinc-800 sm:text-3xl"
//               style={{ transform: "scaleY(1.2)" }}
//             >
//               {tech.id.split("_")[tech.id.split("_").length - 1]} /{" "}
//               {techList.length}
//             </span>
//           </div>
//         </motion.div>
//       );
//     })}
//   </motion.div>
// </div>;
