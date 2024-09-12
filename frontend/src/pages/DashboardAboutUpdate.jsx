import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
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
import {
  Link,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { SyncLoader } from "react-spinners";
import EyesPlayComponent from "../components/EyesPlayComponent";

function DashboardAboutUpdate() {
  const { userInfo } = useSelector((state) => state.user);
  const editor = useRef(null); //INFO: Jodit React editor ref

  //NOTE: API fetching loading state
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  //NOTE: Project Details State without Image
  const [aboutDetails, setAboutDetails] = useState({
    aboutMe: "",
    techName: "",
    selectedCategory: "",
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

  //NOTE: Extract skillId or certificateId from path url
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  const skillId = urlParams.get("skillId");
  const certificateId = urlParams.get("certificateId");
  const navigate = useNavigate();

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

  //INFO: Fetch About details
  useEffect(() => {
    const getAboutDetailsInfo = async () => {
      try {
        setIsFetching(true);
        setFetchError(false);
        const api = `${import.meta.env.VITE_BASE_URL}/api/admin/about`;
        const res = await fetch(api);
        const data = await res.json();

        if (res.ok) {
          //INFO: Specific skill details according to skillId in pathUrl search results
          const skillInfo = skillId
            ? data.aboutDetails.skillsArray.find(
                (skill) => skill._id === skillId
              )
            : null;

          //INFO: Specific certificate details according to skillId in pathUrl search results
          const certificateInfo = certificateId
            ? data.aboutDetails.certificatesArray.find(
                (certificate) => certificate._id === certificateId
              )
            : null;

          setIsFetching(false);
          setFetchError(false);
          setAboutDetails({
            aboutMe: data.aboutDetails.aboutMe,
            techName: skillInfo ? skillInfo.techName : "",
            selectedCategory: skillInfo ? skillInfo.category : "",
            issueDate: certificateInfo ? certificateInfo.issueDate : "",
            techImageURL: skillInfo ? skillInfo.techImageURL : "",
            certificateImageURL: certificateInfo
              ? certificateInfo.certificateImageURL
              : "",
          });
        }
      } catch (error) {
        console.log(
          `Error from fetching about details in DashboardAboutUpdate: ${error}`
        );
      }
    };

    if (userInfo) {
      getAboutDetailsInfo();
    }
  }, []);

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
      setAboutDetails({
        ...aboutDetails,
        [name]: url,
      });
      setIsImageStored({
        ...isImageStored,
        [name]: true,
      });
    }
  };

  //INFO: Handle Admin form
  const handleUpdateAboutForm = async (e) => {
    e.preventDefault();
    if (
      !aboutDetails.aboutMe &&
      !aboutDetails.techName &&
      aboutDetails.selectedCategory === "Languages" &&
      !aboutDetails.techImageURL &&
      !aboutDetails.issueDate &&
      !aboutDetails.certificateImageURL
    ) {
      toast.error("Please fill the input field", {
        theme: "colored",
        position: "bottom-center",
      });
    } else if (
      aboutDetails.aboutMe ||
      aboutDetails.techName ||
      aboutDetails.selectedCategory ||
      aboutDetails.techImageURL ||
      aboutDetails.issueDate ||
      aboutDetails.certificateImageURL
    ) {
      try {
        const apiUrl = `${
          import.meta.env.VITE_BASE_URL
        }/api/admin/updateAbout/${userInfo._id}?${
          skillId ? `skillId=${skillId}` : `certificateId=${certificateId}`
        }`;
        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ aboutDetails }),
        };
        const res = await fetch(apiUrl, options);
        const data = await res.json();

        if (res.ok) {
          toast.success(data.message, {
            theme: "colored",
            position: "bottom-center",
          });
          navigate(
            skillId ? "/dashboard?tab=skills" : "/dashboard?tab=certificates"
          );
        } else {
          toast.error(data.extraDetails, {
            theme: "colored",
            position: "bottom-center",
          });
        }
      } catch (error) {
        console.log(`Create About Form Error: ${error}`);
      }
    }
  };

  if (isFetching) {
    //NOTE: Fetch Loading View
    return (
      <div className="w-full max-w-[1200px] mx-auto flex items-center justify-center h-screen">
        <SyncLoader color="#18181B" size={14} />
      </div>
    );
  } else {
    if (fetchError) {
      //NOTE: Error view
      return (
        //INFO: Fetch Error display
        <div className="relative flex flex-col items-center justify-center w-full px-5 py-5 overflow-hidden error-page sm:py-10">
          <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-2 lg:gap-3">
            {/* Eye Play */}
            <div className="relative w-full h-[200px]">
              <EyesPlayComponent queryClass="error-page" scale={0.7} />
            </div>
            {["OOPS!", "About Items Not", "Added Yet"].map((text, index) => {
              const textId = `${text
                .toLowerCase()
                .split(" ")
                .join("_")}${index}`;

              return (
                <div
                  key={textId}
                  className="px-2 pb-1 mx-auto sm:pb-2 w-fit"
                  style={{ transform: "scaleY(1.3)" }}
                >
                  <h1
                    className="font-Founders_Grotesk_X-Condensed text-4xl sm:text-7xl font-extrabold tracking-tighter text-center text-zinc-950 uppercase z-[99] leading-none pt-0"
                    style={{ lineHeight: 0.8 }}
                  >
                    {text}
                  </h1>
                </div>
              );
            })}

            {/* Create Skills Btn */}
            <div className="flex justify-center mt-10 overflow-hidden">
              <Link to="/dashboard?tab=dashboard">
                <button
                  type="button"
                  className="flex items-center font-poppins text-sm font-semibold border border-zinc-900 rounded-full px-5 py-3 bg-[transparent] hover:bg-zinc-950 text-zinc-800 hover:text-white gap-4 group transition-all duration-300 group"
                >
                  Dashboard
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
      );
    } else {
      return (
        <div className="flex-1 min-h-screen px-1 sm:px-5">
          <div className="w-full max-w-[1200px] mx-auto py-10">
            {/* //IDEA: Masker section */}
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
                  src="/dash-update.png"
                  alt="update"
                  className="w-[80px] sm:w-[150px] h-[50px] rounded-[8px] sm:h-[80px] bg-cover shadow-customInset"
                />
              </motion.div>
              <div
                className="overflow-hidden"
                style={{ transform: "scaleY(1.5)" }}
              >
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

            {/* //IDEA: Create Projects Form Section */}
            <form
              onSubmit={handleUpdateAboutForm}
              className="mt-10 font-poppins"
            >
              {/* //NOTE: Form Heading */}
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
                  Fill the form to update about section's content :
                </motion.h1>
              </motion.div>

              {/* //IDEA: Create Form */}
              <div className="flex flex-col gap-2 my-10 sm:gap-5 lg:gap-10">
                {/* //NOTE: About Me Input details STARTS */}
                <div>
                  <span
                    style={{ transform: "scaleY(1.1)" }}
                    className="inline-block font-poppins tracking-tight text-[25px] sm:text-[35px] text-zinc-800 font-medium overflow-hidden"
                  >
                    Update about you :
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
                      transition={{
                        duration: 1.5,
                        ease: [0.34, 1.56, 0.64, 1],
                      }}
                    >
                      <JoditEditor
                        ref={editor}
                        config={{
                          placeholder: "About you...",
                          showCharsCounter: false,
                          showWordsCounter: false,
                          showXPathInStatusbar: false,
                        }}
                        value={aboutDetails.aboutMe}
                        onBlur={(newContent) =>
                          setAboutDetails({
                            ...aboutDetails,
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
                    Update skills input details :
                  </span>
                  {/* Tech name AND Category Input */}
                  <div className="font-poppins tracking-tight text-[25px] sm:text-[35px] text-zinc-800 font-medium overflow-hidden">
                    <motion.div
                      initial={{ y: "100%" }}
                      whileInView={{ y: 0 }}
                      transition={{
                        duration: 0.8,
                        ease: [0.34, 1.56, 0.64, 1],
                      }}
                      className="flex flex-col flex-wrap flex-1 gap-2 py-2 lg:flex-row lg:items-end lg:gap-5"
                    >
                      {/* //INFO: Tech Name */}
                      <div className="flex flex-col flex-1 gap-2 sm:flex-row sm:items-end">
                        <span
                          style={{ transform: "scaleY(1.1)" }}
                          className="text-[20px] sm:text-xl"
                        >
                          Update technology name
                        </span>
                        {/* Input Filed */}
                        <div className="relative flex-1 group">
                          {!focusedInput.techName && !aboutDetails.techName && (
                            <span
                              className={`absolute left-1/2 top-full -translate-x-[50%] -translate-y-[100%] text-sm w-full text-center font-poppins ${
                                location.search.includes("certificateId")
                                  ? "text-red-500 group-hover:text-red-600 font-semibold"
                                  : "text-zinc-400 group-hover:text-zinc-500"
                              } font-light py-1 pointer-events-none`}
                            >
                              {location.search.includes("certificateId")
                                ? "Not Allowed!"
                                : "Tech name*"}
                            </span>
                          )}
                          <input
                            type="text"
                            id="techName"
                            name="techName"
                            value={aboutDetails.techName}
                            onFocus={handleOnFocus}
                            onBlur={handleOnBlur}
                            onChange={(e) =>
                              setAboutDetails({
                                ...aboutDetails,
                                techName: e.target.value,
                              })
                            }
                            disabled={location.search.includes("certificateId")}
                            autoComplete="off"
                            className={`border-t-0 border-l-0 border-r-0 border-b-[1px] group-hover:border-b-[2px] border-zinc-500 group-hover:border-zinc-800 text-center font-light text-zinc-500 text-sm px-2 py-1 bg-transparent focus:outline-none focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:ring-0 w-full ${
                              location.search.includes("certificateId")
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                          />
                        </div>
                      </div>

                      {/* //INFO: Tech Category */}
                      <div className="flex flex-col flex-1 gap-2 sm:flex-row sm:items-end">
                        <span
                          style={{ transform: "scaleY(1.1)" }}
                          className="text-[20px] sm:text-xl"
                        >
                          Update category
                        </span>
                        {/* Input Filed */}
                        <div className="relative flex-1 group">
                          <select
                            name="selectedCategory"
                            value={
                              location.search.includes("certificateId")
                                ? "Not Allowed!"
                                : aboutDetails.selectedCategory
                            }
                            onChange={(e) =>
                              setAboutDetails({
                                ...aboutDetails,
                                selectedCategory: e.target.value,
                              })
                            }
                            disabled={location.search.includes("certificateId")}
                            id="selectedCategory"
                            className={`border-t-0 border-l-0 border-r-0 border-b-[1px] group-hover:border-b-[2px] border-zinc-500 group-hover:border-zinc-800 text-center font-light text-sm px-2 py-1 bg-transparent focus:outline-none focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:ring-0 w-full ${
                              location.search.includes("certificateId")
                                ? "text-red-600 font-semibold cursor-not-allowed"
                                : "text-zinc-500 cursor-pointer"
                            }`}
                          >
                            {location.search.includes("certificateId") ? (
                              <option>Not Allowed!</option>
                            ) : (
                              skillsLists.map((cat, i) => (
                                <option
                                  value={cat.category}
                                  key={`${cat.category.toLowerCase()}_${i}`}
                                >
                                  {cat.category}
                                </option>
                              ))
                            )}
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  {/* //INFO: Upload Tech Image Input */}
                  <div className="font-poppins tracking-tight text-[25px] sm:text-[35px] text-zinc-800 font-medium overflow-hidden">
                    <motion.div
                      initial={{ y: "100%" }}
                      whileInView={{ y: 0 }}
                      transition={{
                        duration: 0.8,
                        ease: [0.34, 1.56, 0.64, 1],
                      }}
                      className="flex flex-wrap gap-2 py-2 lg:flex-row lg:items-center"
                    >
                      <span
                        style={{ transform: "scaleY(1.1)" }}
                        className="text-[20px] sm:text-xl"
                      >
                        Upload new technology image
                      </span>
                      {/* Input Filed */}
                      <input
                        type="file"
                        id="techImage"
                        name="techImage"
                        accept="image/*"
                        onChange={handleImageChange}
                        autoComplete="off"
                        disabled={location.search.includes("certificateId")}
                        className={`px-2 py-1 text-sm font-light text-center bg-transparent cursor-pointer text-zinc-500 focus:outline-none focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:ring-0 w-fit ${
                          location.search.includes("certificateId")
                            ? "cursor-not-allowed"
                            : "cursor-pointer"
                        }`}
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
                          className={`w-fit h-fit flex items-center text-xs font-normal font-poppins tracking-tight border border-zinc-900 rounded-full px-3 py-1 bg-[transparent] hover:bg-zinc-950 text-zinc-900 hover:text-white gap-4 group transition-all duration-300 group uppercase ${
                            location.search.includes("certificateId")
                              ? "cursor-not-allowed"
                              : "cursor-pointer"
                          }`}
                          disabled={location.search.includes("certificateId")}
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
                    Update certificates input details :
                  </span>
                  {/* //INFO: Certificate Date AND URL */}
                  <div className="font-poppins tracking-tight text-[25px] sm:text-[35px] text-zinc-800 font-medium overflow-hidden">
                    <motion.div
                      initial={{ y: "100%" }}
                      whileInView={{ y: 0 }}
                      transition={{
                        duration: 0.8,
                        ease: [0.34, 1.56, 0.64, 1],
                      }}
                      className="flex flex-col flex-wrap flex-1 gap-2 py-2 sm:flex-row sm:items-end sm:gap-5"
                    >
                      <span
                        style={{ transform: "scaleY(1.1)" }}
                        className="text-[20px] sm:text-xl"
                      >
                        Update date when certification was granted
                      </span>
                      {/* Input Filed */}
                      <div className="relative flex-1 group">
                        <input
                          type={
                            location.search.includes("skillId")
                              ? "text"
                              : "date"
                          }
                          id="issueDate"
                          name="issueDate"
                          value={
                            location.search.includes("skillId")
                              ? "Not Allowed!"
                              : aboutDetails.issueDate
                          }
                          onChange={(e) =>
                            setAboutDetails({
                              ...aboutDetails,
                              issueDate: e.target.value,
                            })
                          }
                          disabled={location.search.includes("skillId")}
                          className={`border-t-0 border-l-0 border-r-0 border-b-[1px] group-hover:border-b-[2px] border-zinc-500 group-hover:border-zinc-800 text-center font-light text-sm px-2 py-1 bg-transparent focus:outline-none focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:ring-0 w-full ${
                            location.search.includes("skillId")
                              ? "cursor-not-allowed text-red-600 font-semibold"
                              : "cursor-pointer text-zinc-500"
                          }`}
                        />
                      </div>
                    </motion.div>
                  </div>
                  {/* Upload Certificate Image Input */}
                  <div className="font-poppins tracking-tight text-[25px] sm:text-[35px] text-zinc-800 font-medium overflow-hidden">
                    <motion.div
                      initial={{ y: "100%" }}
                      whileInView={{ y: 0 }}
                      transition={{
                        duration: 0.8,
                        ease: [0.34, 1.56, 0.64, 1],
                      }}
                      className="flex flex-wrap gap-2 py-2 lg:flex-row lg:items-center"
                    >
                      <span
                        style={{ transform: "scaleY(1.1)" }}
                        className="text-[20px] sm:text-xl"
                      >
                        Upload new certificate image
                      </span>
                      {/* Input Filed */}
                      <input
                        type="file"
                        id="certificateImage"
                        name="certificateImage"
                        accept="image/*"
                        onChange={handleImageChange}
                        autoComplete="off"
                        disabled={location.search.includes("skillId")}
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
                          className={`w-fit h-fit flex items-center text-xs font-normal font-poppins tracking-tight border border-zinc-900 rounded-full px-3 py-1 bg-[transparent] hover:bg-zinc-950 text-zinc-900 hover:text-white gap-4 group transition-all duration-300 group uppercase ${
                            location.search.includes("skillId")
                              ? "cursor-not-allowed"
                              : "cursor-pointer"
                          }`}
                          disabled={location.search.includes("skillId")}
                          onClick={handleImageUpdateInState}
                        >
                          {parseInt(imageUploadingProgress.certificateImage) <
                          100
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

              {/* //IDEA: Create About Button */}
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
                        Update About
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
  }
}

export default DashboardAboutUpdate;
