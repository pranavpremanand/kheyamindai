# Blog API Optimization

This document outlines the optimizations made to improve the performance of blog-related API calls across the website.

## Implemented Optimizations

### 1. Client-Side Caching with React Query

- Added React Query for efficient data fetching, caching, and state management
- Created custom hooks for blog data fetching:
  - `useBlogs()` - Fetches all published blogs
  - `useBlogBySlug(slug)` - Fetches a specific blog by slug
  - `useFeaturedBlogs()` - Fetches featured blogs

### 2. Server-Side Rendering and Caching

- Created a server.js file that implements:
  - API proxying to reduce direct calls to the backend
  - Server-side caching with a 5-minute cache duration
  - Optimized routes for blog data

### 3. Optimized Components

- Updated all blog-related components to use the new hooks:
  - BlogDetails.jsx
  - Blogs.jsx
  - BlogsSection.jsx

### 4. Conditional API Endpoints

- Implemented conditional API endpoints based on environment:
  - In development: Direct API calls to the backend
  - In production: Proxied API calls through the server for caching

## How to Use

### Development Mode

```bash
npm start
```

This will run the React app in development mode, making direct API calls to the backend.

### Production Mode with Server-Side Rendering

```bash
npm run build
npm run serve
```

This will build the React app and serve it using the Express server with caching and server-side rendering.

## Benefits

1. **Reduced API Calls**: Duplicate API calls are eliminated through caching
2. **Faster Page Loads**: Cached data is served instantly without waiting for API responses
3. **Better User Experience**: No loading spinners when navigating between pages that use the same data
4. **Reduced Backend Load**: Fewer requests to the backend server
5. **SEO Improvements**: Server-side rendering helps search engines index content more effectively

## Cache Configuration

- Client-side cache duration: 5 minutes (stale time)
- Client-side cache retention: 10 minutes (cache time)
- Server-side cache duration: 5 minutes

These values can be adjusted in:
- `src/utils/QueryProvider.jsx` for client-side caching
- `server.js` for server-side caching