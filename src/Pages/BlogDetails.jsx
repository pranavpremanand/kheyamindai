import PageBanner from "../Components/Website/PageBanner";
import banner from "../assets/images/banners/blogs.webp";
import HrLine from "../Components/HrLine";
import { Link, useParams } from "react-router-dom";
import FancyLoader from "../Components/FancyLoader";
import SEO from "../Components/SEO/SEO";
import { FaCalendarAlt, FaUser, FaFolder } from "react-icons/fa";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useBlogBySlug } from "../hooks/useBlogs";
import Breadcrumb from "../Components/Breadcrumb";
import InternalLinkHelper, {
  ServiceReference,
} from "../Components/InternalLinkHelper";
import { getBlogBreadcrumb } from "../utils/internalLinking";
import { lazy } from "react";
const RecentBlogs = lazy(() => import("../Components/Website/RecentBlogs"));

const BlogDetails = () => {
  const { slug } = useParams();

  // Use the custom hooks to fetch data with caching
  const {
    data: blogData,
    isLoading: isBlogLoading,
    error: blogError,
  } = useBlogBySlug(slug);

  // Derived state
  const blog = blogData?.blog;
  const loading = isBlogLoading;
  const error = blogError?.response.data?.message || blogError?.message;

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
        <div className="h-[40vh] flex items-center justify-center wrapper text-2xl pt-[5rem] text-center text-red-500">
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
      <SEO
        type="blog"
        title={`${blog.title} | KheyaMind AI`}
        description={
          blog.metaDescription || blog.excerpt || `Read about ${blog.title}`
        }
        keywords={
          blog.metaKeywords && blog.metaKeywords.length > 0
            ? blog.metaKeywords.join(",")
            : blog.tags && blog.tags.length > 0
            ? blog.tags.join(",")
            : `${blog.title}, AI blog, technology insights, KheyaMind AI`
        }
        url={`https://www.kheyamind.ai/blogs/${blog.slug}`}
        image={blog.imageUrl}
        pageData={{
          title: blog.title,
          description:
            blog.metaDescription || blog.excerpt || `Read about ${blog.title}`,
          image: blog.imageUrl,
          datePublished: blog.publishDate,
          dateModified: blog.updatedAt || blog.publishDate,
          author: blog.authorId?.name || "KheyaMind AI Team",
          breadcrumb: getBlogBreadcrumb(blog.title, blog.slug),
        }}
      />
      <div className="lg:block hidden">
        <PageBanner
          banner={banner}
          title={blog.title}
          breadcrumbs={
            <div className="wrapper flex text-white items-center text-xl gap-3">
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
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={getBlogBreadcrumb(blog.title, blog.slug)}
          className="lg:hidden mb-4"
        />
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

          {/* Blog content with internal linking */}
          <div className="prose prose-lg max-w-none">
            <InternalLinkHelper
              content={blog.content}
              className="reset-html-content"
            />
          </div>

          {/* Related Services Call-out */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 my-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Interested in AI Solutions?
            </h3>
            <p className="text-gray-700 mb-4">
              Discover how our AI services can transform your business
              operations and drive growth.
            </p>
            <div className="flex flex-wrap gap-3">
              <ServiceReference
                serviceSlug="ai-chatbots"
                anchorText="AI Chatbots"
                description="Automate customer support with intelligent chatbots"
                inline={true}
              />
              <span className="text-gray-400">•</span>
              <ServiceReference
                serviceSlug="voice-ai-agents"
                anchorText="Voice AI Agents"
                description="Transform call center operations with voice AI"
                inline={true}
              />
              <span className="text-gray-400">•</span>
              <ServiceReference
                serviceSlug="nlp-custom-gpt-solutions"
                anchorText="Custom AI Development"
                description="Build domain-specific AI solutions"
                inline={true}
              />
            </div>
          </div>
        </div>
        <hr className="border-primary/30 my-[3rem]" />
        <RecentBlogs slug={blog.slug} />
      </div>
    </>
  );
};

export default BlogDetails;
