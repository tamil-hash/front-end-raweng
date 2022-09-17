import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./primarylayout.css";

// mui
import Avatar from "@mui/material/Avatar";

//components
import PageLoader from "../PageLoader";
const Courses = lazy(() => import("../Courses"));
const CreateCourse = lazy(() => import("../CreateCourse"));

const PrimaryLayout = () => {
  return (
    <div className="app-container">
      <div className="topbar">
        <div className="left-top">
          <h2>Raw Engineering Task</h2>
        </div>
        <div className="right-top">
          <div className="user-info">
            <h4>Tamilselvan</h4>
            <p>Admin</p>
          </div>
          <Avatar className="user-avatar">T</Avatar>
        </div>
      </div>
      <div className="content-area">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="courses" element={<Courses />} />
            <Route path="create-course/*" element={<CreateCourse />} />
            <Route path="*" element={<Navigate to="courses" />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default PrimaryLayout;

