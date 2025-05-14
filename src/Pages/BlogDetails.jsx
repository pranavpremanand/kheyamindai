import React from "react";
import PageBanner from "../Components/Website/PageBanner";
import banner from "../assets/images/banners/blogs.webp";
import BlogItem from "../Components/Website/BlogItem";
import HrLine from "../Components/HrLine";
import { Link, useParams } from "react-router-dom";
import FancyLoader from "../Components/FancyLoader";
import { Helmet } from "react-helmet";
import { FaCalendarAlt, FaUser, FaTag, FaFolder } from "react-icons/fa";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useBlogBySlug, useBlogs } from "../hooks/useBlogs";

const BlogDetails = () => {
  const { slug } = useParams();
  
  // Use the custom hooks to fetch data with caching
  const { 
    data: blogData, 
    isLoading: isBlogLoading, 
    error: blogError 
  } = useBlogBySlug(slug);
  
  const { 
    data: blogsData, 
    isLoading: isBlogsLoading 
  } = useBlogs();

  // Derived state
  const blog = blogData?.blog;
  const loading = isBlogLoading || isBlogsLoading;
  const error = blogError?.message;
  
  // Filter recent blogs
  const recentBlogs = blogsData?.blogs
    ? blogsData.blogs
        .filter((item) => item.slug !== slug)
        .slice(0, 3)
    : [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FancyLoader />
      </div>
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

  const bannerBreadcrumbs = () => {
    return (
      <>
        <MdOutlineArrowForwardIos className="-mt-1" />
        <p className="">{blog.categoryId?.name}</p>
        <MdOutlineArrowForwardIos className="-mt-1" />
        <p className="font-semibold">{blog.title}</p>
      </>
    );
  };
  return (
    <>
      <Helmet>
        <title>{blog.title} | Kheya Mindai</title>
        <meta
          name="description"
          content={
            blog.metaDescription || blog.excerpt || `Read about ${blog.title}`
          }
        />
        {blog.metaKeywords && blog.metaKeywords.length > 0 ? (
          <meta name="keywords" content={blog.metaKeywords.join(",")} />
        ) : (
          blog.tags &&
          blog.tags.length > 0 && (
            <meta name="keywords" content={blog.tags.join(",")} />
          )
        )}
        {blog.categoryId && (
          <meta name="category" content={blog.categoryId.name} />
        )}
        <meta property="og:title" content={blog.title} />
        <meta
          property="og:description"
          content={
            blog.metaDescription || blog.excerpt || `Read about ${blog.title}`
          }
        />
        <meta property="og:image" content={blog.imageUrl} />
        <meta property="og:type" content="article" />
      </Helmet>
      <div className="lg:block hidden">
        <PageBanner
          banner={banner}
          title={blog.title}
          breadcrumbs={
            <div className="flex text-white items-center text-xl gap-3">
              <Link to="/" className="hover:text-primary">
                Home
              </Link>
              <MdOutlineArrowForwardIos className="-mt-1" />
              <Link to="/blogs" className="hover:text-primary">
                Blogs
              </Link>
              {bannerBreadcrumbs()}
            </div>
          }
        />
      </div>
      <div className="wrapper pt-[6rem] sm:pt-[10rem] lg:pt-[2rem]">
        {/* breadcrumbs on mobile */}
        <div className="lg:hidden mb-4 text-gray-800 text-sm">
          <Link to="/" className="hover:text-primary inline-block">
            Home
          </Link>
          <MdOutlineArrowForwardIos size={12} className="inline-block mx-2" />
          <Link to="/blogs" className="hover:text-primary">
            Blogs
          </Link>
          <MdOutlineArrowForwardIos size={12} className="inline-block mx-2" />
          <p className="inline-block">{blog.categoryId?.name}</p>
          <MdOutlineArrowForwardIos size={12} className="inline-block mx-2" />
          <p className="inline-block">{blog.title}</p>
        </div>
        <img
          src={blog.imageUrl}
          alt={blog.imageAlt || blog.title}
          className="aspect-[16/9] w-full object-cover rounded-lg shadow-lg"
        />
        <div className="pt-[2rem] space-y-6">
          <h1 className="section-heading text-3xl md:text-4xl font-bold text-secondary">
            {blog.title}
          </h1>

          {/* Blog metadata section */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <FaCalendarAlt className="text-primary" />
              <span>
                {new Date(blog.publishDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
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
                <span
                  key={index}
                  className="bg-primary/40 text-secondary px-3 py-1 rounded-full text-sm"
                >
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
          <div className="prose prose-lg max-w-none">
            <div
              className="reset-html-content"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </div>
        <hr className="border-primary/30 my-[3rem]" />
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="section-heading text-secondary">Recent Blogs</h3>
            <HrLine />
            <p className="text-gray-600">
              Discover more interesting articles from our blog
            </p>
          </div>

          {recentBlogs.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {recentBlogs.map((item) => (
                <BlogItem key={item._id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-600">
                No other blogs found at the moment
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Check back soon for more content!
              </p>
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
