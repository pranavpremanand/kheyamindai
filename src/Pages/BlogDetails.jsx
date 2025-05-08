import React, { useState, useEffect } from "react";
import PageBanner from "../Components/Website/PageBanner";
import banner from "../assets/images/banners/blogs.webp";
import BlogItem from "../Components/Website/BlogItem";
import HrLine from "../Components/HrLine";
import { Link, useParams } from "react-router-dom";
import { getBlogBySlug, getBlogs } from "../utils/api";
import { LoadingSpinner } from "../Components/LoadingSpinner";
import { Helmet } from "react-helmet";

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
        <meta name="description" content={blog.metaDescription} />
        <meta keywords={blog.metaKeywords.join(",")} />
      </Helmet>
      <PageBanner banner={banner} title="Blogs" />
      <div className="wrapper pt-[5rem]">
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="md:aspect-video lg:aspect-[13/6] object-cover rounded-lg"
        />
        <div className="pt-[2rem] space-y-4">
          <h2 className="section-heading">{blog.title}</h2>
          <div className="flex gap-4 justify-between">
            <HrLine />
            <HrLine />
          </div>
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
        <hr className="border-primary/30 my-[3rem]" />
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="section-heading">Recent Blogs</h3>
            <HrLine />
          </div>
          {recentBlogs.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {recentBlogs.map((item) => (
                <BlogItem key={item._id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-5">No other blogs found</div>
          )}
          <div className="pt-[2rem]">
            <Link to="/blogs" className="w-fit mx-auto primary-btn">
              Explore More
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
