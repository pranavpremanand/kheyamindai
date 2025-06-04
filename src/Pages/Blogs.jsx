import React from "react";
import banner from "../assets/images/banners/blogs.webp";
import PageBanner from "../Components/Website/PageBanner";
import BlogItem from "../Components/Website/BlogItem";
import HrLine from "../Components/HrLine";
import ContactForm from "../Components/ContactForm";
import FancyLoader from "../Components/FancyLoader";
import { useBlogs } from "../hooks/useBlogs";
import SEO from "../Components/SEO/SEO";

const Blogs = () => {
  // Use the custom hook to fetch blogs with caching
  const {
    data,
    isLoading: loading,
    error: fetchError
  } = useBlogs();

  // Derived state
  const blogs = data?.blogs || [];
  const error = fetchError?.message;

  return (
    <>
      <SEO
        type="website"
        title="AI & Technology Blogs | Latest Insights from KheyaMind AI"
        description="Explore the latest insights on AI chatbots, voice assistants, automation, and emerging technologies. Stay updated with KheyaMind AI's expert blog content."
        keywords="AI blogs, technology insights, chatbot articles, voice AI content, automation guides, AI trends, KheyaMind AI blog"
        url="https://www.kheyamind.ai/blogs"
        image={banner}
      />
      <div className="min-h-screen">
        <div className="fixed top-0 left-0 w-full z-[-1]">
          <PageBanner banner={banner} title="Blogs" />
        </div>

        <div className="pt-[400px] md:pt-[450px]">
          <div className="wrapper space-y-10">
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="space-y-4 flex flex-col md:items-center md:text-center"
            >
              <p className="uppercase text-primary font-medium">Blogs</p>
              <h3 className="section-heading">
                Discover Cutting-Edge AI and IT Service Strategies
              </h3>
              <HrLine />
            </div>

            {loading ? (
              <div data-aos="fade-up" data-aos-delay="200">
                <FancyLoader />
              </div>
            ) : error ? (
              <div data-aos="fade-up" data-aos-delay="200" className="text-center py-10 text-red-500">{error}</div>
            ) : (
              <div
                data-aos="fade-up"
                data-aos-delay="200"
                className="grid sm:grid-cols-2 md:grid-cols-3 gap-6"
              >
                {blogs.length > 0 ? (
                  blogs.map((blog) => <BlogItem key={blog._id} item={blog} />)
                ) : (
                  <div className="col-span-3 text-center py-10">No blogs found</div>
                )}
              </div>
            )}

            <div data-aos="fade-up" data-aos-delay="300">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogs;
