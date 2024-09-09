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

function DashCreateProjectsPage() {
  const { userInfo } = useSelector((state) => state.user);

  //NOTE: Project Details State without Image
  const [projectDetails, setProjectDetails] = useState({
    name: "",
    technologies: [],
    projectDescription: "",
    projectLink: "",
    gitHubLink: "",
    thumbnailURL: "",
    largeScreenViewURL: "",
    mediumScreenViewURL: "",
    smallScreenViewURL: "",
  });
  //NOTE: Input elements focused state
  const [focusedInput, setFocusedInput] = useState({
    name: false,
    technologies: false,
    challenges: false,
    solutions: false,
    projectLink: false,
    gitHubLink: false,
  });
  //NOTE: Image files state
  const [imageUploadFile, setImageUploadFile] = useState({
    thumbnail: null,
    largeScreenView: null,
    mediumScreenView: null,
    smallScreenView: null,
  });
  //NOTE: Image file URL state
  const [imageUploadFileURL, setImageUploadFileURL] = useState({
    thumbnailURL: null,
    largeScreenViewURL: null,
    mediumScreenViewURL: null,
    smallScreenViewURL: null,
  });
  //NOTE: Uploading progress in firebase state
  const [imageUploadingProgress, setImageUploadingProgress] = useState({
    thumbnail: null,
    largeScreenView: null,
    mediumScreenView: null,
    smallScreenView: null,
  });
  //NOTE: Image Uploaded status state
  const [isImageUploading, setIsImageUploading] = useState({
    thumbnail: false,
    largeScreenView: false,
    mediumScreenView: false,
    smallScreenView: false,
  });
  //NOTE: Image Uploaded status state
  const [isImageStored, setIsImageStored] = useState({
    thumbnailURL: false,
    largeScreenViewURL: false,
    mediumScreenViewURL: false,
    smallScreenViewURL: false,
  });
  const navigate = useNavigate();
  const descriptionEditor = useRef(null);

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

  //INFO: Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "technologies") {
      setProjectDetails({
        ...projectDetails,
        [name]: value.split(","),
      });
    } else {
      setProjectDetails({
        ...projectDetails,
        [name]: value,
      });
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
    if (imageUploadFile.thumbnail) {
      imageUploading(imageUploadFile.thumbnail, "thumbnail");
    }
    if (imageUploadFile.largeScreenView) {
      imageUploading(imageUploadFile.largeScreenView, "largeScreenView");
    }
    if (imageUploadFile.mediumScreenView) {
      imageUploading(imageUploadFile.mediumScreenView, "mediumScreenView");
    }
    if (imageUploadFile.smallScreenView) {
      imageUploading(imageUploadFile.smallScreenView, "smallScreenView");
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
    try {
      const apiUrl = `/api/admin/project/create/${userInfo._id}`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectDetails }),
      };
      const res = await fetch(apiUrl, options);
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message, {
          theme: "colored",
          position: "bottom-center",
        });
        navigate(`/project/${data.projectInfo.slug}`); //TODO: Create ProjectItem component
      } else {
        toast.error(data.extraDetails, {
          theme: "colored",
          position: "bottom-center",
        });
        setIsImageStored({
          thumbnailURL: false,
          largeScreenViewURL: false,
          mediumScreenViewURL: false,
          smallScreenViewURL: false,
        });
      }
    } catch (error) {
      console.log(`Create Project Error: ${error}`);
    }
  };

  return (
    <div className="flex-1 min-h-screen px-1 sm:px-5">
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
            {"Your Project".split("").map((l, i) => (
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
                  l === "P" ? "ml-3" : ""
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
              Fill the form to create a project :
            </motion.h1>
          </motion.div>

          {/* Create Form */}
          <div className="flex flex-col gap-4 my-5 lg:gap-5">
            {/* Project Name */}
            <div className="font-poppins tracking-tight text-[25px] sm:text-[35px] text-zinc-800 font-medium overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex flex-col flex-wrap flex-1 gap-2 py-2 sm:flex-row sm:items-end sm:gap-5"
              >
                <span style={{ transform: "scaleY(1.1)" }}>
                  Enter your project name
                </span>
                {/* Input Filed */}
                <div className="relative flex-1 group">
                  {!focusedInput.name && !projectDetails.name && (
                    <span className="absolute left-1/2 top-full -translate-x-[50%] -translate-y-[100%] text-sm w-full text-center font-poppins text-zinc-400 group-hover:text-zinc-500 font-light py-1 pointer-events-none">
                      Project Name*
                    </span>
                  )}
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={projectDetails.name}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                    onChange={handleInputChange}
                    autoComplete="off"
                    className="border-t-0 border-l-0 border-r-0 border-b-[1px] group-hover:border-b-[2px] border-zinc-700 group-hover:border-zinc-800 text-center font-light text-zinc-500 text-sm px-2 py-1 bg-transparent focus:outline-none focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:ring-0 w-full cursor-pointer"
                  />
                </div>
              </motion.div>
            </div>

            {/* Project Techs */}
            <div className="font-poppins tracking-tight text-[25px] sm:text-[35px] text-zinc-800 font-medium overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex flex-col flex-wrap gap-2 py-2 lg:flex-row lg:items-end lg:gap-5"
              >
                <span style={{ transform: "scaleY(1.1)" }}>
                  Write technologies you have used
                </span>
                {/* Input Filed */}
                <div className="relative flex-1 w-full group">
                  {!focusedInput.technologies &&
                    projectDetails.technologies.length === 0 && (
                      <span className="absolute left-1/2 top-full -translate-x-[50%] -translate-y-[100%] text-sm w-full text-center font-poppins text-zinc-400 group-hover:text-zinc-500 font-light py-1 pointer-events-none">
                        Add comma between them*
                      </span>
                    )}
                  <input
                    type="text"
                    id="technologies"
                    name="technologies"
                    value={projectDetails.technologies.join(",")}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                    onChange={handleInputChange}
                    autoComplete="off"
                    className="border-t-0 border-l-0 border-r-0 border-b-[1px] group-hover:border-b-[2px] border-zinc-500 group-hover:border-zinc-800 text-center font-light text-zinc-500 text-sm px-2 py-1 bg-transparent focus:outline-none focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:ring-0 w-full cursor-pointer"
                  />
                </div>
              </motion.div>
            </div>

            {/* Project Description */}
            <motion.div
              initial="initial"
              whileInView="view"
              className="overflow-hidden"
            >
              <span
                style={{ transform: "scaleY(1.1)" }}
                className="inline-block font-poppins tracking-tight text-[25px] sm:text-[35px] text-zinc-800 font-medium overflow-hidden"
              >
                Describe project details :
              </span>
              <motion.div
                variants={{
                  initial: { y: "100%" },
                  view: { y: 0 },
                }}
                transition={{ duration: 1.5, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <JoditEditor
                  ref={descriptionEditor}
                  config={{
                    placeholder: "Project details...",
                    showCharsCounter: false,
                    showWordsCounter: false,
                    showXPathInStatusbar: false,
                  }}
                  value={projectDetails.projectDescription}
                  onBlur={(newContent) =>
                    setProjectDetails({
                      ...projectDetails,
                      projectDescription: newContent,
                    })
                  }
                  className="text-sm tracking-tighter text-zinc-700 font-poppins"
                />
              </motion.div>
            </motion.div>

            {/* Project URL Link */}
            <div className="font-poppins tracking-tight text-[25px] sm:text-[35px] text-zinc-800 font-medium overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex flex-col flex-wrap gap-2 py-2 lg:flex-row lg:items-center lg:gap-5"
              >
                <span style={{ transform: "scaleY(1.1)" }}>
                  Provide project URL
                </span>
                {/* Input Filed */}
                <div className="relative flex-1 w-full group">
                  {!focusedInput.projectLink && !projectDetails.projectLink && (
                    <span className="absolute left-1/2 top-full -translate-x-[50%] -translate-y-[100%] text-sm w-full text-center font-poppins text-zinc-400 group-hover:text-zinc-500 font-light py-1 pointer-events-none">
                      Project link*
                    </span>
                  )}
                  <input
                    type="text"
                    id="projectLink"
                    name="projectLink"
                    value={projectDetails.projectLink}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                    onChange={handleInputChange}
                    autoComplete="off"
                    className="border-t-0 border-l-0 border-r-0 border-b-[1px] group-hover:border-b-[2px] border-zinc-500 group-hover:border-zinc-800 text-center font-light text-zinc-500 text-sm px-2 py-1 bg-transparent focus:outline-none focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:ring-0 w-full cursor-pointer"
                  />
                </div>
              </motion.div>
            </div>

            {/* Project GitHub Link */}
            <div className="font-poppins tracking-tight text-[25px] sm:text-[35px] text-zinc-800 font-medium overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex flex-col flex-wrap gap-2 py-2 lg:flex-row lg:items-center lg:gap-5"
              >
                <span style={{ transform: "scaleY(1.1)" }}>
                  Provide project's GitHub link
                </span>
                {/* Input Filed */}
                <div className="relative flex-1 w-full group">
                  {!focusedInput.gitHubLink && !projectDetails.gitHubLink && (
                    <span className="absolute left-1/2 top-full -translate-x-[50%] -translate-y-[100%] text-sm w-full text-center font-poppins text-zinc-400 group-hover:text-zinc-500 font-light py-1 pointer-events-none">
                      Project github link*
                    </span>
                  )}
                  <input
                    type="text"
                    id="gitHubLink"
                    name="gitHubLink"
                    value={projectDetails.gitHubLink}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                    onChange={handleInputChange}
                    autoComplete="off"
                    className="border-t-0 border-l-0 border-r-0 border-b-[1px] group-hover:border-b-[2px] border-zinc-500 group-hover:border-zinc-800 text-center font-light text-zinc-500 text-sm px-2 py-1 bg-transparent focus:outline-none focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:ring-0 w-full cursor-pointer"
                  />
                </div>
              </motion.div>
            </div>

            {/* Upload Thumbnail Image */}
            <div className="font-poppins tracking-tight text-[25px] sm:text-[35px] text-zinc-800 font-medium overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex flex-col flex-wrap gap-2 py-2 lg:flex-row lg:items-center"
              >
                <span style={{ transform: "scaleY(1.1)" }}>
                  Upload thumbnail image
                </span>
                {/* Input Filed */}
                <input
                  type="file"
                  id="thumbnail"
                  name="thumbnail"
                  accept="image/*"
                  onChange={handleImageChange}
                  autoComplete="off"
                  className="px-2 py-1 text-sm font-light text-center bg-transparent cursor-pointer text-zinc-500 focus:outline-none focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:ring-0 w-fit"
                />
                {/* Upload Button */}
                {isImageStored.thumbnailURL ? (
                  <VerifiedIcon
                    sx={{ fontSize: 30, color: "lime" }}
                    color="green"
                  />
                ) : (
                  <button
                    type="button"
                    name="thumbnailURL"
                    className="w-fit h-fit flex items-center text-xs font-normal font-poppins tracking-tight border border-zinc-900 rounded-full px-3 py-1 bg-[transparent] hover:bg-zinc-950 text-zinc-900 hover:text-white gap-4 group transition-all duration-300 group uppercase"
                    disabled={isImageUploading.thumbnail}
                    onClick={handleImageUpdateInState}
                  >
                    {parseInt(imageUploadingProgress.thumbnail) < 100
                      ? `Uploading...${imageUploadingProgress.thumbnail}`
                      : "Upload"}
                    {!isImageUploading.thumbnail && (
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

            {/* Upload Desktop view Image */}
            <div className="font-poppins tracking-tight text-[25px] sm:text-[35px] text-zinc-800 font-medium overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex flex-col flex-wrap gap-2 py-2 lg:flex-row lg:items-center"
              >
                <span style={{ transform: "scaleY(1.1)" }}>
                  Upload large screen view image
                </span>
                {/* Input Filed */}
                <input
                  type="file"
                  id="largeScreenView"
                  name="largeScreenView"
                  accept="image/*"
                  onChange={handleImageChange}
                  autoComplete="off"
                  className="px-2 py-1 text-sm font-light text-center bg-transparent cursor-pointer text-zinc-500 focus:outline-none focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:ring-0 w-fit"
                />
                {/* Upload Button */}
                {isImageStored.largeScreenViewURL ? (
                  <VerifiedIcon
                    sx={{ fontSize: 30, color: "lime" }}
                    color="green"
                  />
                ) : (
                  <button
                    type="button"
                    name="largeScreenViewURL"
                    className="w-fit h-fit flex items-center text-xs font-normal font-poppins tracking-tight border border-zinc-900 rounded-full px-3 py-1 bg-[transparent] hover:bg-zinc-950 text-zinc-900 hover:text-white gap-4 group transition-all duration-300 group uppercase"
                    disabled={isImageUploading.largeScreenView}
                    onClick={handleImageUpdateInState}
                  >
                    {parseInt(imageUploadingProgress.largeScreenView) < 100
                      ? `Uploading...${imageUploadingProgress.largeScreenView}`
                      : "Upload"}
                    {!isImageUploading.largeScreenView && (
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

            {/* Upload Ipad view Image */}
            <div className="font-poppins tracking-tight text-[25px] sm:text-[35px] text-zinc-800 font-medium overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex flex-col flex-wrap gap-2 py-2 lg:flex-row lg:items-center"
              >
                <span style={{ transform: "scaleY(1.1)" }}>
                  Upload medium screen view image
                </span>
                {/* Input Filed */}
                <input
                  type="file"
                  id="mediumScreenView"
                  name="mediumScreenView"
                  accept="image/*"
                  onChange={handleImageChange}
                  autoComplete="off"
                  className="px-2 py-1 text-sm font-light text-center bg-transparent cursor-pointer text-zinc-500 focus:outline-none focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:ring-0 w-fit"
                />
                {/* Upload Button */}
                {isImageStored.mediumScreenViewURL ? (
                  <VerifiedIcon
                    sx={{ fontSize: 30, color: "lime" }}
                    color="green"
                  />
                ) : (
                  <button
                    type="button"
                    name="mediumScreenViewURL"
                    className="w-fit h-fit flex items-center text-xs font-normal font-poppins tracking-tight border border-zinc-900 rounded-full px-3 py-1 bg-[transparent] hover:bg-zinc-950 text-zinc-900 hover:text-white gap-4 group transition-all duration-300 group uppercase"
                    disabled={isImageUploading.mediumScreenView}
                    onClick={handleImageUpdateInState}
                  >
                    {parseInt(imageUploadingProgress.mediumScreenView) < 100
                      ? `Uploading...${imageUploadingProgress.mediumScreenView}`
                      : "Upload"}
                    {!isImageUploading.mediumScreenView && (
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

            {/* Upload mobile view Image */}
            <div className="font-poppins tracking-tight text-[25px] sm:text-[35px] text-zinc-800 font-medium overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex flex-col flex-wrap gap-2 py-2 lg:flex-row lg:items-center"
              >
                <span style={{ transform: "scaleY(1.1)" }}>
                  Upload small screen view image
                </span>
                {/* Input Filed */}
                <input
                  type="file"
                  id="smallScreenView"
                  name="smallScreenView"
                  accept="image/*"
                  onChange={handleImageChange}
                  autoComplete="off"
                  className="px-2 py-1 text-sm font-light text-center bg-transparent cursor-pointer text-zinc-500 focus:outline-none focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:ring-0 w-fit"
                />
                {/* Upload Button */}
                {isImageStored.smallScreenViewURL ? (
                  <VerifiedIcon
                    sx={{ fontSize: 30, color: "lime" }}
                    color="green"
                  />
                ) : (
                  <button
                    type="button"
                    name="smallScreenViewURL"
                    className="w-fit h-fit flex items-center text-xs font-normal font-poppins tracking-tight border border-zinc-900 rounded-full px-3 py-1 bg-[transparent] hover:bg-zinc-950 text-zinc-900 hover:text-white gap-4 group transition-all duration-300 group uppercase"
                    disabled={isImageUploading.smallScreenView}
                    onClick={handleImageUpdateInState}
                  >
                    {parseInt(imageUploadingProgress.smallScreenView) < 100
                      ? `Uploading...${imageUploadingProgress.smallScreenView}`
                      : "Upload"}
                    {!isImageUploading.smallScreenView && (
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

          {/* Sign In and Google Button */}
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
                    Create Project
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

export default DashCreateProjectsPage;
