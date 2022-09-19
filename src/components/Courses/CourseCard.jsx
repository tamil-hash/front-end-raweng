import Button from "@mui/material/Button";

//assets
import CourseCardImg from "../../assets/coursecard.jpg";

const CourseCard = ({ course }) => {
  return (
    <div className="course-card-container">
      <div className="course-card">
        <img className="course-image" src={CourseCardImg} alt="course-card" />
        <h3>{course?.name}</h3>
        <p>{course?.description}</p>
        <h4>Total lessons:{course.lessons}</h4>
        <Button variant="outlined">Take Course</Button>
      </div>
    </div>
  );
};

export default CourseCard;

