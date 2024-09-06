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
import {
  MdDeleteForever,
  MdEditNote,
  MdOutlineInsertLink,
} from "react-icons/md";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";
import { Link } from "react-router-dom";

function DashProjectsPage() {
  const [projectsList, setProjectsList] = useState([]);
  const [totalProjects, setTotalProjects] = useState(0);
  const { userInfo } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(false);
  // <SyncLoader color="#9eff00" />;

  //INFO: Fetch all project details
  useEffect(() => {
    const getAllProjects = async () => {
      try {
        setFetchLoading(true);
        const api = "/api/admin/projects/get";
        const options = {
          method: "GET",
        };
        const res = await fetch(api, options);
        const data = await res.json();

        if (res.ok) {
          setProjectsList(data.projectsList);
          setTotalProjects(data.totalProjectsCount);
          setFetchLoading(false);
        }
      } catch (error) {
        setFetchLoading(false);
        console.log(
          `Error from fetching all projects in DashProjectsPage: ${error}`
        );
      }
    };

    getAllProjects();
  }, []);

  //INFO: Formate ISO date to dd/mm/yyyy format
  const formateDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const formateTechStacks = (techArr) => {
    const formatedTechList = [];
    const limit = techArr.length > 4 ? 4 : techArr.length;
    for (let i = 0; i < limit; i++) {
      formatedTechList.push(techArr[i]);
    }

    return formatedTechList;
  };

  //INFO: Handle specific project
  const handleDeleteProject = async () => {
    try {
      const api = `/api/admin/deleteProject/${selectedProjectId}/${userInfo._id}`;
      const options = {
        method: "DELETE",
      };
      const res = await fetch(api, options);
      const data = await res.json();

      if (res.ok) {
        setProjectsList((prev) =>
          prev.filter((project) => project._id !== selectedProjectId)
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

  return (
    <div className="flex-1 min-h-screen px-5 overflow-x-scroll table-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-200">
      {fetchLoading ? (
        //INFO: Loading while fetch
        <div className="w-full max-w-[1200px] mx-auto flex items-center justify-center h-screen">
          <SyncLoader color="#18181B" size={10} />
        </div>
      ) : (
        //INFO: Main Content
        <div className="w-full max-w-[1200px] mx-auto overflow-x-auto">
          {/* Masker Section */}
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
                duration: 1.5,
                ease: [0.68, -0.6, 0.32, 1.6],
              }}
              className="overflow-hidden rounded-[8px]"
            >
              <img
                src="/project-logo.png"
                alt="project_image"
                className="w-[80px] sm:w-[150px] h-[50px] rounded-[8px] sm:h-[80px] bg-cover"
              />
            </motion.div>
            <div
              className="overflow-hidden"
              style={{ transform: "scaleY(1.5)" }}
            >
              {`${
                parseInt(totalProjects) < 10
                  ? `0${totalProjects}`
                  : totalProjects
              }`
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

          {/* Projects Details Table */}
          <Table hoverable className="tracking-tighter font-poppins">
            <TableHead className="text-xs">
              <TableHeadCell>Created At</TableHeadCell>
              <TableHeadCell>Thumbnail</TableHeadCell>
              <TableHeadCell>Project Name</TableHeadCell>
              <TableHeadCell>Tech Stacks</TableHeadCell>
              <TableHeadCell>Link</TableHeadCell>
              <TableHeadCell>Edit</TableHeadCell>
              <TableHeadCell>Delete</TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {projectsList.map((project) => {
                const formatedDate = formateDate(project.createdAt);
                const formatedTechStacks = formateTechStacks(
                  project.technologies
                );
                //IDEA: Handle Modal Visibility for Project delete
                const handleModalVisibilityChange = () => {
                  setShowModal(true);
                  setSelectedProjectId(project._id);
                };

                return (
                  <TableRow className="bg-white" key={project._id}>
                    <TableCell className="font-medium text-gray-900 whitespace-nowrap">
                      {formatedDate}
                    </TableCell>
                    <TableCell>
                      <img
                        src={project.thumbnailURL}
                        alt={project.name}
                        className="w-[73px] h-[45px]"
                      />
                    </TableCell>
                    <TableCell>{project.name}</TableCell>
                    <TableCell className="text-xs">
                      {project.technologies.length === formatedTechStacks.length
                        ? formatedTechStacks.join(" ")
                        : `${formatedTechStacks.join(" ")} ...`}
                    </TableCell>
                    <TableCell className="text-xs">
                      <Link to={`/project/${project.slug}`}>
                        <span className="flex items-center gap-1 text-cyan-500 hover:text-cyan-700">
                          Click
                          <MdOutlineInsertLink />
                        </span>
                      </Link>
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
              Are you sure you want to delete this project?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteProject}>
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

export default DashProjectsPage;
