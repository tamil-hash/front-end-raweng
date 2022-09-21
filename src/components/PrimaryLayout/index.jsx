import { lazy, Suspense, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./primarylayout.css";

import { userContext } from "../../App";
// mui
import Avatar from "@mui/material/Avatar";

//components
import PageLoader from "../PageLoader";
const Courses = lazy(() => import("../Courses"));
const CreateCourse = lazy(() => import("../CreateCourse"));

const PrimaryLayout = () => {
  const userStore = useContext(userContext);

  return (
    <div className="app-container">
      <div className="topbar">
        <div className="left-top">
          <h2>Raw Engineering Task</h2>
        </div>
        <div className="right-top">
          <div className="user-info">
            <p>
              <b>Name: </b>
              {userStore?.userData?.name}
            </p>
            <p>
              <b>Role: </b>
              {userStore?.userData?.role}
            </p>
          </div>
          <Avatar className="user-avatar">
            {userStore?.userData?.name.substring(0, 1)}
          </Avatar>
        </div>
      </div>
      <div className="content-area">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="courses" element={<Courses />} />
            <Route path="create-course/*" element={<CreateCourse />} />
            <Route path="*" element={<Navigate replace to="courses" />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default PrimaryLayout;

