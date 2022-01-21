import axios from "axios";
// import { useHistory } from "react-router-dom";

export const api = axios.create({
  baseURL: "http://localhost:3333",
});

export const cep = axios.create({
  baseURL: "http://viacep.com.br/ws",
});