import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { blogsApi, queryKeys } from "../utils/api";

// Hook for fetching all published blogs (legacy)
export const useBlogs = (options = {}) => {
  return useQuery({
    queryKey: [queryKeys.blogs],
    queryFn: () => blogsApi.getBlogs(),
    ...options,
  });
};

// Hook for fetching paginated blogs with "Show More" functionality
export const useBlogsPaginated = (limit = 6, options = {}) => {
  return useInfiniteQuery({
    queryKey: ["blogs", "infinite", limit],
    queryFn: ({ pageParam = 1 }) => blogsApi.getBlogsPaginated(pageParam, limit),
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.currentPage + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    ...options,
  });
};

// Hook for fetching specific page of blogs
export const useBlogsPage = (page = 1, limit = 6, options = {}) => {
  return useQuery({
    queryKey: queryKeys.blogsPaginated(page, limit),
    queryFn: () => blogsApi.getBlogsPaginated(page, limit),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    ...options,
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
