import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";
import { toast } from "react-toastify";
import { app } from "../firebase";
import JoditEditor from "jodit-react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import VerifiedIcon from "@mui/icons-material/Verified";
import { skillsLists } from "../data/data";

function DashCreateAboutPage() {
  const editor = useRef(null); //INFO: Jodit React editor ref

  //NOTE: Project Details State without Image
  const [projectDetails, setProjectDetails] = useState({
    aboutMe: "",
    techName: "",
    selectedCategory: skillsLists[0].category,
    issueDate: "",
    techImageURL: "",
    certificateImageURL: "",
  });

  //NOTE: Input elements focused state
  const [focusedInput, setFocusedInput] = useState({
    techName: false,
  });
  //NOTE: Image files state
  const [imageUploadFile, setImageUploadFile] = useState({
    techImage: null,
    certificateImage: null,
  });
  //NOTE: Image file URL state
  const [imageUploadFileURL, setImageUploadFileURL] = useState({
    techImageURL: null,
    certificateImageURL: null,
  });
  //NOTE: Uploading progress in firebase state
  const [imageUploadingProgress, setImageUploadingProgress] = useState({
    techImage: null,
    certificateImage: null,
  });
  //NOTE: Image Uploaded status state
  const [isImageUploading, setIsImageUploading] = useState({
    techImage: false,
    certificateImage: false,
  });
  //NOTE: Image Uploaded status state
  const [isImageStored, setIsImageStored] = useState({
    techImageURL: false,
    certificateImageURL: false,
  });

  //INFO: Handle placeholder gets disappear when specific input field gets focused
  const handleOnFocus = (e) => {
    const { id } = e.target;
    setFocusedInput((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  //INFO: Handle placeholder gets visible when specific input filed gets empty value
  const handleOnBlur = (e) => {
    const { id, value } = e.target;
    if (!value) {
      setFocusedInput((prev) => ({
        ...prev,
        [id]: false,
      }));
    }
  };

  //INFO: Handle image input field changes
  const handleImageChange = (e) => {
    const imgFile = e.target.files[0];
    const name = e.target.name;

    setImageUploadFile({
      ...imageUploadFile,
      [name]: imgFile,
    });
    setImageUploadFileURL({
      ...imageUploadFileURL,
      [`${name}URL`]: URL.createObjectURL(imgFile),
    });
  };

  //INFO: Push Image file into Firebase storage and generate an image link
  useEffect(() => {
    if (imageUploadFile.techImage) {
      imageUploading(imageUploadFile.techImage, "techImage");
    }
    if (imageUploadFile.certificateImage) {
      imageUploading(imageUploadFile.certificateImage, "certificateImage");
    }
  }, [imageUploadFile]);

  const imageUploading = (file, keyName) => {
    setIsImageUploading({
      ...isImageUploading,
      [keyName]: true,
    });

    const storage = getStorage(app);
    const uniqueImgFileName = new Date().getTime() + "-" + file.name;
    const storageRef = ref(storage, uniqueImgFileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadingProgress({
          ...imageUploadingProgress,
          [keyName]: progress.toFixed(0),
        });
      },
      (error) => {
        toast.error("File size must be less than 3MB!", {
          theme: "colored",
          position: "bottom-center",
        });
        setImageUploadingProgress({
          ...imageUploadingProgress,
          [keyName]: null,
        });
        setImageUploadFile({
          ...imageUploadFile,
          [keyName]: null,
        });
        setImageUploadFileURL({
          ...imageUploadFileURL,
          [`${keyName}URL`]: null,
        });
        setIsImageUploading({
          ...isImageUploading,
          [keyName]: false,
        });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUploadFileURL({
            ...imageUploadFileURL,
            [`${keyName}URL`]: downloadURL,
          });
          setIsImageUploading({
            ...isImageUploading,
            [keyName]: false,
          });
          setImageUploadFile({
            ...imageUploadFile,
            [keyName]: null,
          });
        });
      }
    );
  };

  //INFO: Handle Iamge URL store in projectDetails state
  const handleImageUpdateInState = (e) => {
    const name = e.target.name;
    const url = imageUploadFileURL[name];
    if (imageUploadFileURL[name]) {
      setProjectDetails({
        ...projectDetails,
        [name]: url,
      });
      setIsImageStored({
        ...isImageStored,
        [name]: true,
      });
    }
  };

  //INFO: Handle Admin form
  const handleCreateProjectForm = async (e) => {
    e.preventDefault();
    console.log(projectDetails);
  };

  return (
    <div className="flex-1 min-h-screen px-2 sm:px-5">
      <div className="w-full max-w-[1200px] mx-auto py-10">
        {/* Masker section */}
        <motion.div
          initial="initial"
          whileInView="view"
          className="w-full h-[30vh] flex items-center gap-1"
        >
          <motion.div
            variants={{
              initial: { width: 0 },
              view: { width: "fit-content" },
            }}
            transition={{
              duration: 0.8,
              ease: [0.68, -0.6, 0.32, 1.6],
            }}
            className="overflow-hidden rounded-[8px]"
          >
            <img
              src="/create.png"
              alt="create_image"
              className="w-[80px] sm:w-[150px] h-[50px] rounded-[8px] sm:h-[80px] bg-cover"
            />
          </motion.div>
          <div className="overflow-hidden" style={{ transform: "scaleY(1.5)" }}>
            {"About".split("").map((l, i) => (
              <motion.span
                variants={{
                  initial: { y: "100%" },
                  view: { y: 0 },
                }}
                transition={{
                  duration: 1.3,
                  ease: [0.68, -0.6, 0.32, 1.6],
                  delay: 0.035 * i,
                }}
                key={i}
                className={`inline-block text-2xl sm:text-5xl font-extrabold tracking-tighter uppercase font-poppins text-zinc-900 ${
                  l === "C" ? "ml-3" : ""
                }`}
              >
                {l}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Create Projects Form Section */}
        <form onSubmit={handleCreateProjectForm} className="mt-10 font-poppins">
          {/* Form Heading */}
          <motion.div
            initial="initial"
            whileInView="view"
            className="overflow-hidden"
          >
            <motion.h1
              variants={{
                initial: { y: "100%" },
                view: { y: 0 },
              }}
              transition={{
                duration: 1,
                ease: [0.68, -0.6, 0.32, 1.6],
              }}
              className="inline-block"
            >
              Fill the form to create about section's content :
            </motion.h1>
          </motion.div>

          {/* Create Form */}
          <div className="flex flex-col gap-2 my-10 sm:gap-5 lg:gap-10">
            {/* //NOTE: About Me Input details STARTS */}
            <div>
              <span
                style={{ transform: "scaleY(1.1)" }}
                className="inline-block font-poppins tracking-tight text-[25px] sm:text-[35px] text-zinc-800 font-medium overflow-hidden"
              >
                Describe yourself :
              </span>
              <motion.div
                initial="initial"
                whileInView="view"
                className="flex flex-col gap-5 overflow-hidden"
              >
                <motion.div
                  variants={{
                    initial: { y: "100%" },
                    view: { y: 0 },
                  }}
                  transition={{ duration: 1.5, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  <JoditEditor
                    ref={editor}
                    config={{
                      placeholder: "About you...",
                      showCharsCounter: false,
                      showWordsCounter: false,
                    }}
                    value={projectDetails.aboutMe}
                    onBlur={(newContent) =>
                      setProjectDetails({
                        ...projectDetails,
                        aboutMe: newContent,
                      })
                    }
                    className="text-sm tracking-tighter text-zinc-700 font-poppins"
                  />
                </motion.div>
              </motion.div>
            </div>
            {/* //NOTE: About Me Input details ENDS */}

            {/* //NOTE: Skills Input details STARTS */}
            <div>
              <span
                style={{ transform: "scaleY(1.1)" }}
                className="inline-block font-poppins tracking-tight text-[25px] sm:text-[35px] text-zinc-800 font-medium overflow-hidden"
              >
                Skills input details :
              </span>
              {/* Tech name AND Category Input */}
              <div className="font-poppins tracking-tight text-[25px] sm:text-[35px] text-zinc-800 font-medium overflow-hidden">
                <motion.div
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                  className="flex flex-col flex-wrap flex-1 gap-2 py-2 lg:flex-row lg:items-end lg:gap-5"
                >
                  {/* Tech Name */}
                  <div className="flex flex-col flex-1 gap-2 sm:flex-row sm:items-end">
                    <span
                      style={{ transform: "scaleY(1.1)" }}
                      className="text-[20px] sm:text-xl"
                    >
                      Name of the technology
                    </span>
                    {/* Input Filed */}
                    <div className="relative flex-1 group">
                      {!focusedInput.techName && !projectDetails.techName && (
                        <span className="absolute left-1/2 top-full -translate-x-[50%] -translate-y-[100%] text-sm w-full text-center font-poppins text-zinc-400 group-hover:text-zinc-500 font-light py-1 pointer-events-none">
                          Tech name*
                        </span>
                      )}
                      <input
                        type="text"
                        id="techName"
                        name="techName"
                        value={projectDetails.techName}
                        onFocus={handleOnFocus}
                        onBlur={handleOnBlur}
                        onChange={(e) =>
                          setProjectDetails({
                            ...projectDetails,
                            techName: e.target.value,
                          })
                        }
                        autoComplete="off"
                        className="border-b-[1px] group-hover:border-b-[2px] border-zinc-500 group-hover:border-zinc-800 text-center font-light text-zinc-500 text-sm px-2 py-1 bg-transparent focus:outline-none focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:ring-0 w-full cursor-pointer"
                      />
                    </div>
                  </div>
                  {/* Tech Category */}
                  <div className="flex flex-col flex-1 gap-2 sm:flex-row sm:items-end">
                    <span
                      style={{ transform: "scaleY(1.1)" }}
                      className="text-[20px] sm:text-xl"
                    >
                      Select category
                    </span>
                    {/* Input Filed */}
                    <div className="relative flex-1 group">
                      <select
                        name="selectedCategory"
                        value={projectDetails.selectedCategory}
                        onChange={(e) =>
                          setProjectDetails({
                            ...projectDetails,
                            selectedCategory: e.target.value,
                          })
                        }
                        id="selectedCategory"
                        className="border-b-[1px] group-hover:border-b-[2px] border-zinc-500 group-hover:border-zinc-800 text-center font-light text-zinc-500 text-sm px-2 py-1 bg-transparent focus:outline-none focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:ring-0 w-full cursor-pointer"
                      >
                        {skillsLists.map((cat, i) => (
                          <option
                            value={cat.category}
                            key={`${cat.category.toLowerCase()}_${i}`}
                          >
                            {cat.category}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </motion.div>
              </div>
              {/* Upload Tech Image Input */}
              <div className="font-poppins tracking-tight text-[25px] sm:text-[35px] text-zinc-800 font-medium overflow-hidden">
                <motion.div
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                  className="flex flex-wrap gap-2 py-2 lg:flex-row lg:items-center"
                >
                  <span
                    style={{ transform: "scaleY(1.1)" }}
                    className="text-[20px] sm:text-xl"
                  >
                    Upload technology image
                  </span>
                  {/* Input Filed */}
                  <input
                    type="file"
                    id="techImage"
                    name="techImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    autoComplete="off"
                    className="px-2 py-1 text-sm font-light text-center bg-transparent cursor-pointer text-zinc-500 focus:outline-none focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:ring-0 w-fit"
                  />
                  {/* Upload Button */}
                  {isImageStored.techImageURL ? (
                    <VerifiedIcon
                      sx={{ fontSize: 30, color: "lime" }}
                      color="green"
                    />
                  ) : (
                    <button
                      type="button"
                      name="techImageURL"
                      className="w-fit h-fit flex items-center text-xs font-normal font-poppins tracking-tight border border-zinc-900 rounded-full px-3 py-1 bg-[transparent] hover:bg-zinc-950 text-zinc-900 hover:text-white gap-4 group transition-all duration-300 group uppercase"
                      disabled={isImageUploading.techImage}
                      onClick={handleImageUpdateInState}
                    >
                      {parseInt(imageUploadingProgress.techImage) < 100
                        ? `Uploading...${imageUploadingProgress.techImage}`
                        : "Upload"}
                      {!isImageUploading.techImage && (
                        <div className="flex items-center justify-center w-1 h-1 overflow-hidden transition-all duration-300 rounded-full group-hover:w-5 group-hover:h-5 bg-zinc-800 group-hover:bg-zinc-200">
                          <MdArrowOutward
                            size="20"
                            color="#000"
                            className="relative top-[2vw] group-hover:top-0 transition-all duration-700"
                          />
                        </div>
                      )}
                    </button>
                  )}
                </motion.div>
              </div>
            </div>
            {/* //NOTE: Skills Input details ENDS */}

            {/* //NOTE: Cetificates Input details STARTS */}
            <div>
              <span
                style={{ transform: "scaleY(1.1)" }}
                className="inline-block font-poppins tracking-tight text-[25px] sm:text-[35px] text-zinc-800 font-medium overflow-hidden"
              >
                Certificates input details :
              </span>
              {/* Certificate Date AND URL */}
              <div className="font-poppins tracking-tight text-[25px] sm:text-[35px] text-zinc-800 font-medium overflow-hidden">
                <motion.div
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                  className="flex flex-col flex-wrap flex-1 gap-2 py-2 sm:flex-row sm:items-end sm:gap-5"
                >
                  <span
                    style={{ transform: "scaleY(1.1)" }}
                    className="text-[20px] sm:text-xl"
                  >
                    The date when certification was granted
                  </span>
                  {/* Input Filed */}
                  <div className="relative flex-1 group">
                    <input
                      type="date"
                      id="issueDate"
                      name="issueDate"
                      value={projectDetails.issueDate}
                      onChange={(e) =>
                        setProjectDetails({
                          ...projectDetails,
                          issueDate: e.target.value,
                        })
                      }
                      required
                      className="border-b-[1px] group-hover:border-b-[2px] border-zinc-500 group-hover:border-zinc-800 text-center font-light text-zinc-500 text-sm px-2 py-1 bg-transparent focus:outline-none focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:ring-0 w-full cursor-pointer"
                    />
                  </div>
                </motion.div>
              </div>
              {/* Upload Certificate Image Input */}
              <div className="font-poppins tracking-tight text-[25px] sm:text-[35px] text-zinc-800 font-medium overflow-hidden">
                <motion.div
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                  className="flex flex-wrap gap-2 py-2 lg:flex-row lg:items-center"
                >
                  <span
                    style={{ transform: "scaleY(1.1)" }}
                    className="text-[20px] sm:text-xl"
                  >
                    Upload certificate image
                  </span>
                  {/* Input Filed */}
                  <input
                    type="file"
                    id="certificateImage"
                    name="certificateImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    autoComplete="off"
                    className="px-2 py-1 text-sm font-light text-center bg-transparent cursor-pointer text-zinc-500 focus:outline-none focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:ring-0 w-fit"
                  />
                  {/* Upload Button */}
                  {isImageStored.certificateImageURL ? (
                    <VerifiedIcon
                      sx={{ fontSize: 30, color: "lime" }}
                      color="green"
                    />
                  ) : (
                    <button
                      type="button"
                      name="certificateImageURL"
                      className="w-fit h-fit flex items-center text-xs font-normal font-poppins tracking-tight border border-zinc-900 rounded-full px-3 py-1 bg-[transparent] hover:bg-zinc-950 text-zinc-900 hover:text-white gap-4 group transition-all duration-300 group uppercase"
                      disabled={isImageUploading.certificateImage}
                      onClick={handleImageUpdateInState}
                    >
                      {parseInt(imageUploadingProgress.certificateImage) < 100
                        ? `Uploading...${imageUploadingProgress.certificateImage}`
                        : "Upload"}
                      {!isImageUploading.certificateImage && (
                        <div className="flex items-center justify-center w-1 h-1 overflow-hidden transition-all duration-300 rounded-full group-hover:w-5 group-hover:h-5 bg-zinc-800 group-hover:bg-zinc-200">
                          <MdArrowOutward
                            size="20"
                            color="#000"
                            className="relative top-[2vw] group-hover:top-0 transition-all duration-700"
                          />
                        </div>
                      )}
                    </button>
                  )}
                </motion.div>
              </div>
            </div>
            {/* //NOTE: Cetificates Input details ENDS */}
          </div>

          {/* Create About Button */}
          <motion.div
            initial="initial"
            whileInView="view"
            className="relative h-[30vh] flex rounded-xl overflow-hidden"
          >
            {/* Left Silde Container */}
            <motion.div
              variants={{
                initial: { y: 0, opacity: 1 },
                view: { y: "-100%", opacity: 0 },
              }}
              viewport={{ margin: "-100px" }}
              transition={{
                duration: 1.8,
                delay: 0.2,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="bg-[#CDEA68] w-[50%] h-full rounded-l-xl z-[99]"
            />
            {/* Right Silde Container */}
            <motion.div
              variants={{
                initial: { y: 0, opacity: 1 },
                view: { y: "100%", opacity: 0 },
              }}
              viewport={{ margin: "-100px" }}
              transition={{
                duration: 1.8,
                delay: 0.2,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="bg-[#CDEA68] w-[50%] h-full rounded-r-xl z-[99]"
            />

            {/* Main Buttons */}
            <motion.div
              initial="initial"
              whileInView="buttonView"
              className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] h-full flex flex-col sm:flex-row items-center justify-center sm:items-center gap-3 w-full"
            >
              <div className="overflow-hidden">
                <motion.div
                  variants={{
                    initial: { y: "100%" },
                    buttonView: { y: 0 },
                  }}
                  viewport={{ margin: "-100px" }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                >
                  <button
                    type="submit"
                    className="h-fit flex items-center text-sm font-normal font-poppins tracking-tight border border-zinc-900 rounded-full px-5 py-3 bg-[transparent] hover:bg-zinc-950 text-zinc-900 hover:text-white gap-4 group transition-all duration-300 group uppercase"
                  >
                    Create About
                    <div className="flex items-center justify-center w-1 h-1 overflow-hidden transition-all duration-300 rounded-full group-hover:w-5 group-hover:h-5 bg-zinc-800 group-hover:bg-zinc-200">
                      <MdArrowOutward
                        size="20"
                        color="#000"
                        className="relative top-[2vw] group-hover:top-0 transition-all duration-700"
                      />
                    </div>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </form>
      </div>
    </div>
  );
}

export default DashCreateAboutPage;
