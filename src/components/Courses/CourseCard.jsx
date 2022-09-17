import React from "react";

const CourseCard = () => {
  const courseName = "Some Random coures Name";
  const description =
    "Some Random coures Descriptions asdmas asdo ajsoidj aosdoi jasodij aoisjd";

  return (
    <div className="course-card-container">
      <div className="course-card">
        <h3>{courseName}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default CourseCard;

