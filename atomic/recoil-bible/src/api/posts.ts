import axios from "axios";
import { POST } from "../store/posts/types";

const baseURL = "https://jsonplaceholder.typicode.com/posts";
const client = axios.create({
  baseURL,
});

export const getPosts = () => client.get<POST[]>("/");
export const getPost = (id: number) => client.get<POST>(`/${id}`);
