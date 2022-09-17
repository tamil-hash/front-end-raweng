import Button from "@mui/material/Button";

//assets
import CourseCardImg from "../../assets/coursecard.jpg";

const CourseCard = () => {
  const courseName = "Some Random coures Name";
  const description =
    "Some Random coures Descriptions asdmas asdo ajsoidj aosdoi jasodij aoisjd";

  return (
    <div className="course-card-container">
      <div className="course-card">
        <img className="course-image" src={CourseCardImg} alt="course-card" />
        <h3>{courseName}</h3>
        <p>{description}</p>
        <Button variant="outlined">Take Course</Button>
      </div>
    </div>
  );
};

export default CourseCard;

