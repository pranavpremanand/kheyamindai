const express = require('express');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// API base URL
const baseUrl = "https://kheyamind-blogplatform-backend.vercel.app/api";

// Cache configuration
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const cache = {
  blogs: {
    data: null,
    timestamp: 0
  },
  featuredBlogs: {
    data: null,
    timestamp: 0
  },
  blogsBySlug: {}
};

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'build')));

// API proxy endpoints with caching
app.get('/api/blogs/published', async (req, res) => {
  try {
    const now = Date.now();
    
    // Check if cache is valid
    if (cache.blogs.data && now - cache.blogs.timestamp < CACHE_DURATION) {
      return res.json(cache.blogs.data);
    }
    
    // Fetch fresh data
    const response = await axios.get(`${baseUrl}/blogs/published`);
    
    // Update cache
    cache.blogs.data = response.data;
    cache.blogs.timestamp = now;
    
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

app.get('/api/blogs/featured', async (req, res) => {
  try {
    const now = Date.now();
    
    // Check if cache is valid
    if (cache.featuredBlogs.data && now - cache.featuredBlogs.timestamp < CACHE_DURATION) {
      return res.json(cache.featuredBlogs.data);
    }
    
    // Fetch fresh data
    const response = await axios.get(`${baseUrl}/blogs/featured`);
    
    // Update cache
    cache.featuredBlogs.data = response.data;
    cache.featuredBlogs.timestamp = now;
    
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching featured blogs:', error);
    res.status(500).json({ error: 'Failed to fetch featured blogs' });
  }
});

app.get('/api/blogs/slug/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const now = Date.now();
    
    // Check if cache is valid
    if (
      cache.blogsBySlug[slug] && 
      cache.blogsBySlug[slug].data && 
      now - cache.blogsBySlug[slug].timestamp < CACHE_DURATION
    ) {
      return res.json(cache.blogsBySlug[slug].data);
    }
    
    // Fetch fresh data
    const response = await axios.get(`${baseUrl}/blogs/slug/${slug}`);
    
    // Update cache
    if (!cache.blogsBySlug[slug]) {
      cache.blogsBySlug[slug] = {};
    }
    cache.blogsBySlug[slug].data = response.data;
    cache.blogsBySlug[slug].timestamp = now;
    
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching blog with slug ${req.params.slug}:`, error);
    res.status(500).json({ error: 'Failed to fetch blog details' });
  }
});

// Serve the React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});