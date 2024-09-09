import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Modal,
  Button,
} from "flowbite-react";
import { MdArrowOutward, MdDeleteForever, MdEditNote } from "react-icons/md";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";
import EyesPlayComponent from "./EyesPlayComponent";
import { Link } from "react-router-dom";
import { Label, Select } from "flowbite-react";

function DashSkillsPage() {
  const [skillsList, setSkillsList] = useState([]);
  const [totalSkills, setTotalSkills] = useState(null);
  const [fetchError, setFetchError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [showModal, setShowModal] = useState(false);
  const [selectedSkillId, setSelectedSkillId] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(false);
  const { userInfo } = useSelector((state) => state.user);

  //INFO: Fetch all skills details
  useEffect(() => {
    const getAllSkills = async () => {
      try {
        setFetchLoading(true);
        const api = `/api/admin/about/skills${
          selectedCategory === "All Categories"
            ? ""
            : `?category=${selectedCategory}`
        }`;
        const options = {
          method: "GET",
        };
        const res = await fetch(api, options);
        const data = await res.json();

        if (res.ok) {
          setFetchLoading(false);
          setSkillsList(data.skillsArrList);
          setTotalSkills(data.skillsArrList.length);
        } else {
          toast.error(data.extraDetails, {
            theme: "colored",
            position: "bottom-center",
          });
          setFetchLoading(false);
          setFetchError(data.extraDetails);
        }
      } catch (error) {
        setFetchLoading(false);
        console.log(
          `Error from fetching all skills in DashSkillsPage: ${error}`
        );
      }
    };

    getAllSkills();
  }, [selectedCategory]);

  //INFO: Handle specific skill
  const handleDeleteSkill = async () => {
    try {
      const api = `/api/admin/deleteSkill/${selectedSkillId}/${userInfo._id}`;
      const options = {
        method: "DELETE",
      };
      const res = await fetch(api, options);
      const data = await res.json();

      if (res.ok) {
        setSkillsList((prev) =>
          prev.filter((skill) => skill._id !== selectedSkillId)
        );

        toast.success(data.message, {
          theme: "colored",
          position: "bottom-center",
        });

        setShowModal(false);
      } else {
        toast.error(data.extraDetails, {
          theme: "colored",
          position: "bottom-center",
        });
      }
    } catch (error) {
      console.log(`Delete project ERROR: ${error.message}`);
    }
  };

  //INFO: Category array
  const categoryList = [
    "All Categories",
    "Languages",
    "Frontend",
    "Backend",
    "JS Libraries",
    "Database",
  ];

  return (
    <div className="flex-1 min-h-screen px-1 overflow-x-scroll table-auto sm:px-5 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-200">
      {fetchLoading ? (
        //INFO: Loading while fetch
        <div className="w-full max-w-[1200px] mx-auto flex items-center justify-center min-h-screen">
          <SyncLoader color="#18181B" size={10} />
        </div>
      ) : fetchError || skillsList.length === 0 ? (
        //INFO: Fetch Error display
        <div className="relative flex flex-col items-center justify-center w-full px-5 py-5 overflow-hidden error-page sm:py-10">
          <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-2 lg:gap-3">
            {/* Eye Play */}
            <div className="relative w-full h-[200px]">
              <EyesPlayComponent queryClass="error-page" scale={0.7} />
            </div>
            {["OOPS!", "Skills Not", "Added Yet"].map((text, index) => {
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
                    className="font-Founders_Grotesk_X-Condensed text-4xl sm:text-7xl lg:text-8xl font-extrabold tracking-tighter text-center text-zinc-950 uppercase z-[99] leading-none pt-0"
                    style={{ lineHeight: 0.8 }}
                  >
                    {text}
                  </h1>
                </div>
              );
            })}

            {/* Create Skills Btn */}
            <div className="flex justify-center mt-10 overflow-hidden">
              <Link to="/dashboard?tab=create-about">
                <button
                  type="button"
                  className="flex items-center font-poppins text-sm font-semibold border border-zinc-900 rounded-full px-5 py-3 bg-[transparent] hover:bg-zinc-950 text-zinc-800 hover:text-white gap-4 group transition-all duration-300 group"
                >
                  CREATE HERE
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
      ) : (
        //INFO: Main Content
        <div className="w-full max-w-[1200px] mx-auto overflow-x-auto">
          {/* Masker Section */}
          <motion.div
            initial="initial"
            whileInView="view"
            className="w-full h-[30vh] flex items-center gap-2"
          >
            <div
              className="overflow-hidden"
              style={{ transform: "scaleY(1.5)" }}
            >
              {"Total".split("").map((l, i) => (
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
            <motion.div
              variants={{
                initial: { width: 0 },
                view: { width: "fit-content" },
              }}
              transition={{
                duration: 1.5,
                delay: 0.3,
                ease: [0.68, -0.6, 0.32, 1.6],
              }}
              className="overflow-hidden rounded-[8px]"
            >
              <img
                src="/Skills.png"
                alt="project_image"
                className="w-[80px] sm:w-[150px] h-[50px] rounded-[8px] sm:h-[80px] bg-cover"
              />
            </motion.div>
            <div
              className="overflow-hidden"
              style={{ transform: "scaleY(1.5)" }}
            >
              {`${parseInt(totalSkills) < 10 ? `0${totalSkills}` : totalSkills}`
                .split("")
                .map((l, i) => (
                  <motion.span
                    variants={{
                      initial: { y: "100%" },
                      view: { y: 0 },
                    }}
                    transition={{
                      duration: 1.3,
                      ease: [0.68, -0.6, 0.32, 1.6],
                      delay: 0.04 * i,
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

          {/* Category Filter Input */}
          <div className="max-w-sm my-10">
            <div className="block mb-2">
              <Label
                htmlFor="categories"
                value="Select category"
                className="font-poppins"
              />
            </div>
            <Select
              id="categories"
              className="font-poppins"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categoryList.map((cat, i) => (
                <option key={`${cat.toLowerCase()}_${i}`} value={cat}>
                  {cat}
                </option>
              ))}
            </Select>
          </div>

          {/* Skills Details Table */}
          <Table hoverable className="mb-10 tracking-tighter font-poppins">
            <TableHead className="text-xs">
              <TableHeadCell>Images</TableHeadCell>
              <TableHeadCell>Categories</TableHeadCell>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Edit</TableHeadCell>
              <TableHeadCell>Delete</TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {skillsList.map((skill) => {
                //INFO: Handle Modal Visibility for Project delete
                const handleModalVisibilityChange = () => {
                  setShowModal(true);
                  setSelectedSkillId(skill._id);
                };

                return (
                  <TableRow className="bg-white" key={skill._id}>
                    {/* //INFO: Skill's Image */}
                    <TableCell>
                      <img
                        src={skill.techImageURL}
                        alt={skill.techName}
                        className="w-[45px] h-[45px]"
                      />
                    </TableCell>
                    {/* //INFO: Skill's category */}
                    <TableCell>{skill.category}</TableCell>
                    {/* //INFO: Skill's Name */}
                    <TableCell className="font-medium text-gray-900 whitespace-nowrap">
                      {skill.techName}
                    </TableCell>
                    <TableCell>
                      <a
                        href="#"
                        className="font-medium text-cyan-600 hover:underline"
                      >
                        <MdEditNote size="30" />
                      </a>
                    </TableCell>
                    <TableCell>
                      <MdDeleteForever
                        size="30"
                        color="red"
                        onClick={handleModalVisibilityChange}
                        className="cursor-pointer"
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
      <Modal
        show={showModal}
        size="md"
        onClose={() => setShowModal(false)}
        popup
        className="pt-[60px] sm:pt-[70px]"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 text-gray-400 h-14 w-14 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this skill?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteSkill}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default DashSkillsPage;
