import { useContext } from "react";
import Button from "@mui/material/Button";

//assets
import CourseCardImg from "../../assets/coursecard.jpg";

import { userContext } from "../../App";

const CourseCard = ({ course, deleteCourse }) => {
  const userStore = useContext(userContext);

  return (
    <div className="course-card-container">
      <div className="course-card">
        <img className="course-image" src={CourseCardImg} alt="course-card" />
        <h3>{course?.name}</h3>
        <p>{course?.description}</p>
        <h4>Total lessons:{course.lessons}</h4>
        <Button variant="outlined">Take Course</Button>
        {userStore?.userData?.role === "Instructor" && (
          <Button
            onClick={() => deleteCourse(course._id)}
            variant="outlined"
            color="error"
          >
            Delete Course
          </Button>
        )}
      </div>
    </div>
  );
};

export default CourseCard;

