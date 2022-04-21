import axios from "axios";

const service = axios.create({
  timeout: 5000,
  baseURL: "http://localhost:3333/api/",
});

export const getList = () => {
  return service.get("/list").then((res) => res.data);
};
