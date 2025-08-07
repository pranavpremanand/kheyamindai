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
  blogsPaginated: (page, limit) => ["blogs", "paginated", page, limit],
  blogBySlug: (slug) => ["blog", slug],
  featuredBlogs: "featuredBlogs",
};

// API functions that return the promise and query key for React Query
export const blogsApi = {
  // Get all published blogs (legacy - for backward compatibility)
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

  // Get paginated blogs with enhanced performance
  getBlogsPaginated: async (page = 1, limit = 6) => {
    try {
      console.log(`Fetching blogs page ${page} with limit ${limit}...`);
      const response = await api.get("/blogs/published", {
        params: { page, limit },
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });
      console.log(`API response status: ${response.status}`);
      console.log(`Found ${response.data?.blogs?.length || 0} blogs on page ${page}`);
      return {
        blogs: response.data?.blogs || [],
        totalBlogs: response.data?.totalBlogs || 0,
        totalPages: response.data?.totalPages || 1,
        currentPage: page,
        hasMore: page < (response.data?.totalPages || 1),
      };
    } catch (error) {
      console.error('Error fetching paginated blogs:', error.message);
      // Fallback to getting all blogs and manually paginating
      try {
        const allBlogsResponse = await api.get("/blogs/published");
        const allBlogs = allBlogsResponse.data?.blogs || [];
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedBlogs = allBlogs.slice(startIndex, endIndex);
        const totalPages = Math.ceil(allBlogs.length / limit);
        
        return {
          blogs: paginatedBlogs,
          totalBlogs: allBlogs.length,
          totalPages,
          currentPage: page,
          hasMore: page < totalPages,
        };
      } catch (fallbackError) {
        console.error('Fallback pagination also failed:', fallbackError.message);
        throw fallbackError;
      }
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
