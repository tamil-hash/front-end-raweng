import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

const AddLessons = ({ newCourse, setNewCourse, completeCreatingCourse }) => {
  return (
    <div className="lessons-container">
      <h2>Add Lessons</h2>
      {[...Array(newCourse.lessons)].map((value) => (
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <h2>Lesson</h2>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() =>
                setNewCourse({ ...newCourse, lessons: newCourse.lessons - 1 })
              }
            >
              Delete Lesson
            </Button>
          </CardActions>
        </Card>
      ))}
      <Button
        variant="outlined"
        onClick={() =>
          setNewCourse({ ...newCourse, lessons: newCourse.lessons + 1 })
        }
      >
        Add lesson
      </Button>
      <Button
        onClick={completeCreatingCourse}
        variant="contained"
        className="create-course"
      >
        Finish Creating course
      </Button>
    </div>
  );
};

export default AddLessons;

