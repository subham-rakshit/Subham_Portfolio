import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaClipboardCheck, FaLongArrowAltUp } from "react-icons/fa";
import { VscLightbulbSparkle } from "react-icons/vsc";
import { IoRibbon } from "react-icons/io5";
import EyesPlayComponent from "./EyesPlayComponent";
import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import { SyncLoader } from "react-spinners";
import CountUp from "react-countup";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

function DashboardPage() {
  const { userInfo } = useSelector((state) => state.user);
  const [projectsList, setProjectsList] = useState([]);
  const [aboutDetails, setAboutDetails] = useState(null);
  const [totalProjects, setTotalProjects] = useState(0);
  const [totalLastMonthProjects, setTotalLastMonthProjects] = useState(0);
  const [totalLastMonthSkills, setTotalLastMonthSkills] = useState(0);
  const [totalLastMonthCertificates, setTotalLastMonthCertificates] =
    useState(0);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  console.log(aboutDetails && aboutDetails.skillsArray);
  console.log(aboutDetails && aboutDetails.certificatesArray);
  console.log(projectsList);

  useEffect(() => {
    const fetchData = async () => {
      if (!userInfo) return;

      setFetchLoading(true);
      setFetchError(false);

      try {
        //INFO: Fetch both project and about data concurrently with -
        //NOTE: Promise.all() => is a method in JavaScript used to handle multiple promises concurrently.It takes an array of promises and returns a single promise that resolves when all of the promises in the array have resolved or rejects as soon as one of them rejects.

        const [projectRes, aboutRes] = await Promise.all([
          fetch("/api/admin/projects/get"),
          fetch("/api/admin/about"),
        ]);

        if (aboutRes.ok && projectRes.ok) {
          const aboutData = await aboutRes.json();
          const projectData = await projectRes.json();

          //INFO: Update state with the fetch data
          setFetchLoading(false);
          setFetchError(false);

          setProjectsList(projectData.projectsList);
          setTotalProjects(projectData.totalProjectsCount);
          setTotalLastMonthProjects(projectData.lastMonthProjectsCount);

          setAboutDetails(aboutData.aboutDetails);
          setTotalLastMonthSkills(aboutData.lastMonthSkillCount);
          setTotalLastMonthCertificates(aboutData.lastMonthCertificatesCount);
        } else if (!aboutRes.ok || !projectRes.ok) {
          setFetchLoading(false);
          setFetchError(true);
          toast.error("Error fetching data!", {
            theme: "colored",
            position: "bottom-center",
          });
        }
      } catch (error) {
        setFetchLoading(false);
        setFetchError(true);
        console.log(`Error from DashboardPage: ${error}`);
      }
    };
    fetchData();
  }, []);

  //INFO: Formate ISO date to dd/mm/yyyy format
  const formateDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <div className="flex-1 min-h-screen px-1 sm:px-5">
      {fetchLoading ? (
        //INFO: Loading while fetch
        <div className="w-full max-w-[1200px] mx-auto flex items-center justify-center h-screen">
          <SyncLoader color="#18181B" size={10} />
        </div>
      ) : !aboutDetails && totalProjects === 0 && fetchError ? (
        //INFO: Fetch Error display
        <div className="relative flex flex-col items-center justify-center w-full px-5 py-5 overflow-hidden error-page sm:py-10">
          <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-2 lg:gap-3">
            {/* Eye Play */}
            <div className="relative w-full h-[200px]">
              <EyesPlayComponent queryClass="error-page" scale={0.7} />
            </div>
            {["OOPS!", "Something", "Went Wrong!"].map((text, index) => {
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
              <Link to="/dashboard?tab=create-project">
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
        //INFO: Main Function
        <div className="w-full max-w-[1100px] mx-auto py-10">
          {/* Cards */}
          <div className="grid w-full gap-2 md:gap-5 md:grid-cols-3 grid-col-1">
            {/* Total Projects */}
            <div className="h-[170px] sm:h-[200px] whitespace-nowrap rounded-lg shadow-customInset hover:shadow-custom p-5 flex justify-between col-span-1 overflow-hidden">
              <div className="flex flex-col gap-2 sm:gap-5 font-poppins">
                <h1
                  className="text-base font-semibold tracking-tighter text-indigo-500 uppercase lg:text-xl"
                  style={{ transform: "scaleY(1.1)" }}
                >
                  Projects
                </h1>
                {/* Number of projects  */}
                <span
                  className="text-2xl font-extrabold tracking-tighter text-indigo-600"
                  style={{ transform: "scaleY(1.3)" }}
                >
                  <CountUp
                    end={totalProjects}
                    duration={5}
                    formattingFn={(value) => (value < 10 ? `0${value}` : value)}
                  />
                </span>
                <div className="flex items-center">
                  <FaLongArrowAltUp size="18" color="seagreen" />
                  {/* Number of projects in last month  */}
                  <span className="text-xs text-indigo-500">
                    <CountUp
                      end={totalLastMonthProjects}
                      duration={7}
                      formattingFn={(value) =>
                        value < 10 ? `0${value}` : value
                      }
                    />
                  </span>
                  <span className="ml-2 text-xs">Last month</span>
                </div>
              </div>
              <img
                src="/project-dash.jpg"
                alt="project logo"
                className="w-[70px] h-[70px] sm:w-[5vw] sm:h-[5vw]"
              />
            </div>

            {/* Total Skills */}
            <div className="h-[170px] sm:h-[200px] whitespace-nowrap rounded-lg shadow-customInset hover:shadow-custom p-5 flex justify-between col-span-1 overflow-hidden">
              <div className="flex flex-col gap-2 sm:gap-5 font-poppins">
                <h1
                  className="text-base font-semibold tracking-tighter uppercase lg:text-xl text-lime-500"
                  style={{ transform: "scaleY(1.1)" }}
                >
                  Skills
                </h1>
                {/* Number of skills  */}
                <span
                  className="text-2xl font-extrabold tracking-tighter text-lime-600"
                  style={{ transform: "scaleY(1.3)" }}
                >
                  <CountUp
                    end={aboutDetails ? aboutDetails.skillsArray.length : 0}
                    duration={7}
                    formattingFn={(value) => (value < 10 ? `0${value}` : value)}
                  />
                </span>
                <div className="flex items-center">
                  <FaLongArrowAltUp size="18" color="seagreen" />
                  {/* Number of skills in last month  */}
                  <span className="text-xs text-lime-500">
                    <CountUp
                      end={totalLastMonthSkills}
                      duration={9}
                      formattingFn={(value) =>
                        value < 10 ? `0${value}` : value
                      }
                    />
                  </span>
                  <span className="ml-2 text-xs">Last month</span>
                </div>
              </div>
              <img
                src="/skills-dash.png"
                alt="project logo"
                className="w-[70px] h-[70px] sm:w-[5vw] sm:h-[5vw]"
              />
            </div>

            {/* Total Certificates */}
            <div className="h-[170px] sm:h-[200px] whitespace-nowrap rounded-lg shadow-customInset hover:shadow-custom p-5 flex justify-between col-span-1 overflow-hidden">
              <div className="flex flex-col gap-2 sm:gap-5 font-poppins">
                <h1
                  className="text-base font-semibold tracking-tighter uppercase lg:text-xl text-cyan-500"
                  style={{ transform: "scaleY(1.1)" }}
                >
                  Certificates
                </h1>
                {/* Number of certificates */}
                <span
                  className="text-2xl font-extrabold tracking-tighter text-cyan-600"
                  style={{ transform: "scaleY(1.3)" }}
                >
                  <CountUp
                    end={
                      aboutDetails ? aboutDetails.certificatesArray.length : 0
                    }
                    duration={9}
                    formattingFn={(value) => (value < 10 ? `0${value}` : value)}
                  />
                </span>
                <div className="flex items-center">
                  <FaLongArrowAltUp size="18" color="seagreen" />
                  {/* Number of certificates in last month  */}
                  <span className="text-xs text-cyan-500">
                    <CountUp
                      end={totalLastMonthCertificates}
                      duration={11}
                      formattingFn={(value) =>
                        value < 10 ? `0${value}` : value
                      }
                    />
                  </span>
                  <span className="ml-2 text-xs">Last month</span>
                </div>
              </div>
              <img
                src="/certificates-dash.png"
                alt="project logo"
                className="w-[70px] h-[70px] sm:w-[5vw] sm:h-[5vw]"
              />
            </div>
          </div>
          {/* Skills & Certificates */}
          <div className="flex flex-col gap-5 my-10 md:justify-between md:flex-row">
            {/* Skills */}
            <div className="w-full max-w-1/2">
              <h1
                className="mb-5 font-semibold tracking-tighter font-poppins"
                style={{ transform: "scaleY(1.2)" }}
              >
                View Tech Skills:
              </h1>
              <Table hoverable className="tracking-tighter font-poppins">
                <TableHead className="text-xs">
                  <TableHeadCell>Name</TableHeadCell>
                  <TableHeadCell>Category</TableHeadCell>
                  <TableHeadCell>Image</TableHeadCell>
                </TableHead>
                <TableBody>
                  {aboutDetails &&
                    aboutDetails.skillsArray.map((skill, i) => {
                      if (i < 5) {
                        return (
                          <TableRow
                            className="text-xs bg-white"
                            key={skill._id}
                          >
                            <TableCell>{skill.techName}</TableCell>
                            <TableCell>{skill.category}</TableCell>
                            <TableCell>
                              <img
                                src={skill.techImageURL}
                                alt={skill.techName}
                                className="w-[45px] h-[45px]"
                              />
                            </TableCell>
                          </TableRow>
                        );
                      }
                    })}
                </TableBody>
              </Table>
              <Link to="/dashboard?tab=skills">
                <button
                  type="button"
                  className="flex items-center justify-center w-full gap-4 px-3 py-1 text-xs font-semibold text-white transition-all duration-300 border font-poppins border-zinc-900 bg-zinc-800 hover:bg-zinc-950 group"
                >
                  VIEW ALL
                  <div className="flex items-center justify-center w-1 h-1 overflow-hidden transition-all duration-300 bg-white rounded-full group-hover:w-5 group-hover:h-5">
                    <MdArrowOutward
                      size="20"
                      color="#000"
                      className="relative top-[2vw] group-hover:top-0 transition-all duration-700"
                    />
                  </div>
                </button>
              </Link>
            </div>

            {/* Category */}
            <div className="w-full max-w-1/2">
              <h1
                className="mb-5 font-semibold tracking-tighter font-poppins"
                style={{ transform: "scaleY(1.2)" }}
              >
                View Certificates:
              </h1>
              <Table hoverable className="tracking-tighter font-poppins">
                <TableHead className="text-xs">
                  <TableHeadCell>IssueAt</TableHeadCell>
                  <TableHeadCell>Image</TableHeadCell>
                </TableHead>
                <TableBody>
                  {aboutDetails &&
                    aboutDetails.certificatesArray.map((certificate, i) => {
                      if (i < 5) {
                        return (
                          <TableRow
                            className="text-xs bg-white"
                            key={certificate._id}
                          >
                            <TableCell>{certificate.issueDate}</TableCell>
                            <TableCell>
                              <img
                                src={certificate.certificateImageURL}
                                alt={certificate.issueDate}
                                className="w-[65px] h-[45px]"
                              />
                            </TableCell>
                          </TableRow>
                        );
                      }
                    })}
                </TableBody>
              </Table>
              <Link to="/dashboard?tab=certificates">
                <button
                  type="button"
                  className="flex items-center justify-center w-full gap-4 px-3 py-1 text-xs font-semibold text-white transition-all duration-300 border font-poppins border-zinc-900 bg-zinc-800 hover:bg-zinc-950 group"
                >
                  VIEW ALL
                  <div className="flex items-center justify-center w-1 h-1 overflow-hidden transition-all duration-300 bg-white rounded-full group-hover:w-5 group-hover:h-5">
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

          {/* Projects */}
          <div className="w-full">
            <div className="flex items-center justify-between gap-2 mb-5">
              <h1
                className="font-semibold tracking-tighter font-poppins"
                style={{ transform: "scaleY(1.2)" }}
              >
                View Projects:
              </h1>
              <Link to="/dashboard?tab=projects">
                <button
                  type="button"
                  className="flex items-center justify-center gap-4 px-3 py-1 text-xs font-semibold text-white transition-all duration-300 border font-poppins border-zinc-900 bg-zinc-800 hover:bg-zinc-950 group rounded-xl"
                >
                  VIEW ALL
                  <div className="flex items-center justify-center w-1 h-1 overflow-hidden transition-all duration-300 bg-white rounded-full group-hover:w-5 group-hover:h-5">
                    <MdArrowOutward
                      size="20"
                      color="#000"
                      className="relative top-[2vw] group-hover:top-0 transition-all duration-700"
                    />
                  </div>
                </button>
              </Link>
            </div>
            <Table hoverable className="tracking-tighter font-poppins">
              <TableHead>
                <TableHeadCell>Name</TableHeadCell>
                <TableHeadCell>Thumbnail</TableHeadCell>
                <TableHeadCell>Created At</TableHeadCell>
              </TableHead>
              <TableBody>
                {projectsList.length > 0 &&
                  projectsList.map((project, i) => {
                    if (i < 5) {
                      const formatedDate = formateDate(project.createdAt);
                      return (
                        <TableRow className="text-xs bg-white">
                          <TableCell>{project.name}</TableCell>
                          <TableCell>
                            <img
                              src={project.thumbnailURL}
                              alt={project.name}
                              className="w-[73px] h-[45px]"
                            />
                          </TableCell>
                          <TableCell>{formatedDate}</TableCell>
                        </TableRow>
                      );
                    }
                  })}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
