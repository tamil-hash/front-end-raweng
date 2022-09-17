import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

//components
import PageLoader from "../PageLoader";

const CourseDetails = lazy(() => import("./CourseDetails"));
const AddLessons = lazy(() => import("./AddLessons"));

const CreateCourse = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="details" element={<CourseDetails />} />
        <Route path="add-lessons" element={<AddLessons />} />
        <Route path="*" element={<Navigate to="details" />} />
      </Routes>
    </Suspense>
  );
};

export default CreateCourse;

