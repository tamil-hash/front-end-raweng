import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

const AddLessons = () => {
  const lessonsLength = 0;

  return (
    <div className="lessons-container">
      <h2>Add Lessons</h2>
      {[...Array(lessonsLength)].map((value) => (
        <Card sx={{ minWidth: 275 }}>
          {console.log(value)}
          <CardContent>
            <h2>Lesson-1</h2>
          </CardContent>
          <CardActions>
            <Button size="small">Delete Lesson</Button>
          </CardActions>
        </Card>
      ))}
      <Button variant="outlined">Add lesson</Button>
      <Button variant="contained" className="create-course">
        Finish Creating course
      </Button>
    </div>
  );
};

export default AddLessons;

