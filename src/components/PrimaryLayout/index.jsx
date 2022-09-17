import { lazy, Suspense } from "react";
import "./primarylayout.css";

import { Routes, Route, Navigate } from "react-router-dom";

//components
import PageLoader from "../PageLoader";
const Courses = lazy(() => import("../Courses"));
const CreateCourse = lazy(() => import("../CreateCourse"));
//assets
import ProfilePicture from "../../assets/profilepicture.jpg";

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
          <img className="profile-picture" src={ProfilePicture} alt="profile" />
        </div>
      </div>
      <div className="content-area">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="courses" element={<Courses />} />
            <Route path="create-course" element={<CreateCourse />} />
            <Route path="*" element={<Navigate to="courses" />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default PrimaryLayout;

