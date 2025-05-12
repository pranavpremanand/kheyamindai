import React, { useState, useEffect } from "react";
import PageBanner from "../Components/Website/PageBanner";
import banner from "../assets/images/banners/blogs.webp";
import BlogItem from "../Components/Website/BlogItem";
import HrLine from "../Components/HrLine";
import { Link, useParams } from "react-router-dom";
import { getBlogBySlug, getBlogs } from "../utils/api";
import { LoadingSpinner } from "../Components/LoadingSpinner";
import { Helmet } from "react-helmet";
import { FaCalendarAlt, FaUser, FaTag, FaFolder } from "react-icons/fa";

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        // Fetch the specific blog by slug
        const blogResponse = await getBlogBySlug(slug);
        setBlog(blogResponse.data.blog);

        // Fetch recent blogs
        const blogsResponse = await getBlogs();
        // Filter out the current blog and limit to 3 blogs
        const filteredBlogs = blogsResponse.data.blogs
          .filter((item) => item.slug !== slug)
          .slice(0, 3);
        setRecentBlogs(filteredBlogs);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching blog details:", err);
        setError("Failed to load blog details. Please try again later.");
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlogData();
    }
  }, [slug]);

  if (loading) {
    return (
      <>
        <PageBanner banner={banner} title="Blogs" />
        <LoadingSpinner />
      </>
    );
  }

  if (error || !blog) {
    return (
      <>
        <PageBanner banner={banner} title="Blogs" />
        <div className="wrapper pt-[5rem] text-center text-red-500">
          {error || "Blog not found"}
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{blog.title} | Kheya Mindai</title>
        <meta name="description" content={blog.metaDescription || blog.excerpt || `Read about ${blog.title}`} />
        {blog.metaKeywords && blog.metaKeywords.length > 0 ? (
          <meta name="keywords" content={blog.metaKeywords.join(",")} />
        ) : (
          blog.tags && blog.tags.length > 0 && (
            <meta name="keywords" content={blog.tags.join(",")} />
          )
        )}
        {blog.categoryId && <meta name="category" content={blog.categoryId.name} />}
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.metaDescription || blog.excerpt || `Read about ${blog.title}`} />
        <meta property="og:image" content={blog.imageUrl} />
        <meta property="og:type" content="article" />
      </Helmet>
      <PageBanner banner={banner} title="Blogs" />
      <div className="wrapper pt-[5rem]">
        <img
          src={blog.imageUrl}
          alt={blog.imageAlt || blog.title}
          className="md:aspect-video lg:aspect-[13/6] object-cover rounded-lg shadow-lg"
        />
        <div className="pt-[2rem] space-y-6">
          <h2 className="section-heading text-3xl md:text-4xl font-bold text-secondary">{blog.title}</h2>
          
          {/* Blog metadata section */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <FaCalendarAlt className="text-primary" />
              <span>{new Date(blog.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            
            {blog.authorId && (
              <div className="flex items-center gap-1">
                <FaUser className="text-primary" />
                <span>{blog.authorId.name}</span>
              </div>
            )}
            
            {blog.categoryId && (
              <div className="flex items-center gap-1">
                <FaFolder className="text-primary" />
                <span>{blog.categoryId.name}</span>
              </div>
            )}
          </div>
          
          {/* Tags section */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag, index) => (
                <span key={index} className="bg-primary/40 text-secondary px-3 py-1 rounded-full text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          )}
          
          <div className="flex gap-4 justify-between">
            <HrLine />
            <HrLine />
          </div>
          
          {/* Blog excerpt as a summary */}
          {blog.excerpt && (
            <div className="italic text-gray-700 border-l-4 border-primary pl-4 py-2 bg-gray-50 rounded">
              {blog.excerpt}
            </div>
          )}
          
          {/* Blog content */}
          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
        <hr className="border-primary/30 my-[3rem]" />
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="section-heading text-secondary">Recent Blogs</h3>
            <HrLine />
            <p className="text-gray-600">Discover more interesting articles from our blog</p>
          </div>
          
          {recentBlogs.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {recentBlogs.map((item) => (
                <BlogItem key={item._id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-600">No other blogs found at the moment</p>
              <p className="text-sm text-gray-500 mt-2">Check back soon for more content!</p>
            </div>
          )}
          
          <div className="pt-[2rem] flex justify-center">
            <Link to="/blogs" className="primary-btn flex items-center gap-2">
              Explore More Blogs
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
