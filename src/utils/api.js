import axios from "axios";

// const baseUrl = "http://localhost:5000/api";
const baseUrl = "https://kheyamind-blogplatform-backend.vercel.app/api";

// get all blogs
export const getBlogs = () => axios.get(`${baseUrl}/blogs`);

// get blog by slug
export const getBlogBySlug = (slug) => axios.get(`${baseUrl}/blogs/slug/${slug}`);
