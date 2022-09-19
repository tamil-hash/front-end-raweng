import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

import { userContext } from "../../App";

import axiosInstance from "../../utils/axiosInstance";

import CourseCard from "./CourseCard";
import PageLoader from "../PageLoader";

const Courses = () => {
  const userStore = useContext(userContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState([]);

  const goToCreateCourses = () => {
    navigate("/create-course");
  };

  const fetchAllCourses = async () => {
    setIsLoading(true);
    axiosInstance
      .get("/courses/get-all", {
        headers: { "x-access-token": userStore?.userData?.token },
      })
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="courses-section">
      <div className="courses-header">
        <h3>Courses</h3>
        {userStore?.userData?.role === "Instructor" && (
          <Button variant="contained" onClick={goToCreateCourses}>
            Create Course
          </Button>
        )}
      </div>
      <div className="courses-body">
        {courses.length === 0 ? (
          <div>
            <h1>No Courses Found</h1>
          </div>
        ) : (
          courses.map((course) => <CourseCard key={course} course={course} />)
        )}
      </div>
    </div>
  );
};

export default Courses;

