import axios from "axios";
// import { useHistory } from "react-router-dom";

export const api = axios.create({
  baseURL: "http://localhost:3333",
});