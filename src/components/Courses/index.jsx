import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

import CourseCard from "./CourseCard";

const Courses = () => {
  const navigate = useNavigate();
  const courses = [
    1, 2, 3, 54, 5, 6, 7, 8, 9, 0, 10, 4, 32, 123, 1234, 241, 1231, 54432,
  ];

  const goToCreateCourses = () => {
    navigate("/create-course");
  };

  return (
    <div className="courses-section">
      <div className="courses-header">
        <h3>Courses</h3>
        <Button variant="contained" onClick={goToCreateCourses}>
          Create Course
        </Button>
      </div>
      <div className="courses-body">
        {courses.map((course) => (
          <CourseCard />
        ))}
      </div>
    </div>
  );
};

export default Courses;

