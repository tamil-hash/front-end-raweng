import { useNavigate } from "react-router-dom";

//mui components
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";

const courseDetails = () => {
  const navigate = useNavigate();

  const submitCourseDetails = (event) => {
    event.preventDefault();
    navigate("/create-course/add-lessons");
  };

  return (
    <div className="login-container">
      <Box
        component="form"
        className="login-form"
        noValidate
        autoComplete="off"
        onSubmit={submitCourseDetails}
      >
        <FormControl>
          <InputLabel htmlFor="name">Course Name</InputLabel>
          <Input id="name" type="text" required={true} />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="description">Course Description</InputLabel>
          <Input id="description" type="password" required={true} />
        </FormControl>
        <FormControl>
          <Button variant="contained" type="submit">
            Create Course
          </Button>
        </FormControl>
      </Box>
    </div>
  );
};

export default courseDetails;

