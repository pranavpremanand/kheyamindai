import axios from "axios";

// const baseUrl = "http://localhost:5000/api";
const baseUrl = "https://kheyamind-blogplatform-backend.vercel.app/api";

// Create an axios instance with default config
const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Query keys for React Query
export const queryKeys = {
  blogs: "blogs",
  blogBySlug: (slug) => ["blog", slug],
  featuredBlogs: "featuredBlogs",
};

// API functions that return the promise and query key for React Query
export const blogsApi = {
  // Get all published blogs
  getBlogs: async () => {
    try {
      console.log('Fetching blogs from API with cache-busting...');
      const response = await api.get("/blogs/published", {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });
      console.log(`API response status: ${response.status}`);
      console.log(`Found ${response.data?.blogs?.length || 0} blogs`);
      return response.data;
    } catch (error) {
      console.error('Error fetching blogs:', error.message);
      throw error;
    }
  },

  // Get blog by slug
  getBlogBySlug: async (slug) => {
    const response = await api.get(`/blogs/slug/${slug}`);
    return response.data;
  },

  // Get featured blogs
  getFeaturedBlogs: async () => {
    const response = await api.get("/blogs/featured");
    return response.data;
  },
};

// Legacy API functions for backward compatibility
export const getBlogs = () => api.get("/blogs/published");
export const getBlogBySlug = (slug) => api.get(`/blogs/slug/${slug}`);
export const getFeaturedBlogs = () => api.get("/blogs/featured");
