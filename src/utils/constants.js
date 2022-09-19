export const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5000/" : "";

export const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const passwordRegex =
  /^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;

