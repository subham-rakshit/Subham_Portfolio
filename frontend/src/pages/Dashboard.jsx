import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  DashboardPage,
  DashCertificatesPage,
  DashCreateAboutPage,
  DashCreateProjectsPage,
  DashProfilePage,
  DashProjectsPage,
  DashSideBar,
  DashSkillsPage,
} from "../components";

function Dashboard() {
  const [tab, setTab] = useState("");
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabURL = urlParams.get("tab");

    if (tabURL) {
      setTab(tabURL);
    } else {
      setTab("");
    }
  }, [location.search]);
  return (
    <div className="relative min-h-screen flex bg-[#FBF9ED] w-full max-w-[1400px] mx-auto">
      <DashSideBar tab={tab} />

      {/* Tab Sections */}
      {tab === "dashboard" && <DashboardPage />}
      {tab === "profile" && <DashProfilePage />}
      {tab === "projects" && <DashProjectsPage />}
      {tab === "skills" && <DashSkillsPage />}
      {tab === "certificates" && <DashCertificatesPage />}
      {tab === "create-projects" && <DashCreateProjectsPage />}
      {tab === "create-about" && <DashCreateAboutPage />}
    </div>
  );
}

export default Dashboard;
