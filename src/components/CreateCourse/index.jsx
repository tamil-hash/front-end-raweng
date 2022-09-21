import { Suspense, lazy, useState, useContext } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

import { userContext } from "../../App";

//components
import PageLoader from "../PageLoader";

const CourseDetails = lazy(() => import("./CourseDetails"));
const AddLessons = lazy(() => import("./AddLessons"));

const CreateCourse = () => {
  const userStore = useContext(userContext);
  const navigate = useNavigate();
  const [newCourse, setNewCourse] = useState({
    name: "",
    description: "",
    lessons: 0,
  });

  const completeCreatingCourse = async () => {
    if (newCourse.lessons !== 0) {
      axiosInstance
        .post(
          "/courses/create",
          {
            ...newCourse,
          },
          { headers: { "x-access-token": userStore?.userData?.token } }
        )
        .then((response) => {
          navigate("/courses");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route
          path="details"
          element={
            <CourseDetails newCourse={newCourse} setNewCourse={setNewCourse} />
          }
        />
        <Route
          path="add-lessons"
          element={
            <AddLessons
              newCourse={newCourse}
              setNewCourse={setNewCourse}
              completeCreatingCourse={completeCreatingCourse}
            />
          }
        />
        <Route path="*" element={<Navigate replace to="details" />} />
      </Routes>
    </Suspense>
  );
};

export default CreateCourse;

