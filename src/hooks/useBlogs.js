import { useQuery } from "@tanstack/react-query";
import { blogsApi, queryKeys } from "../utils/api";

// Hook for fetching all published blogs
export const useBlogs = () => {
  return useQuery({
    queryKey: [queryKeys.blogs],
    queryFn: () => blogsApi.getBlogs(),
  });
};

// Hook for fetching a blog by slug
export const useBlogBySlug = (slug) => {
  return useQuery({
    queryKey: queryKeys.blogBySlug(slug),
    queryFn: () => blogsApi.getBlogBySlug(slug),
    enabled: !!slug, // Only run the query if slug is provided
  });
};

// Hook for fetching featured blogs
export const useFeaturedBlogs = () => {
  return useQuery({
    queryKey: [queryKeys.featuredBlogs],
    queryFn: blogsApi.getFeaturedBlogs,
  });
};
