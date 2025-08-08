import React, { useMemo } from "react";
import banner from "../assets/images/banners/blogs.webp";
import PageBanner from "../Components/Website/PageBanner";
import BlogItem from "../Components/Website/BlogItem";
import HrLine from "../Components/HrLine";
import ContactForm from "../Components/ContactForm";
import FancyLoader from "../Components/FancyLoader";
import { useBlogsPaginated, useBlogs } from "../hooks/useBlogs";
import SEO from "../Components/SEO/SEO";

const Blogs = () => {
  // Get total count first (lightweight call to get just the count)
  const { data: allBlogsData } = useBlogs({ 
    select: (data) => ({ totalBlogs: data?.blogs?.length || 0 }),
    staleTime: 10 * 60 * 1000 // Cache for 10 minutes
  });

  // Use the paginated hook with 6 blogs per page for optimal performance
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error
  } = useBlogsPaginated(6);

  // Flatten all pages of blogs into a single array
  const blogs = useMemo(() => {
    return data?.pages?.flatMap(page => page.blogs) || [];
  }, [data]);

  // Get total count from the dedicated query for accurate count
  const totalBlogs = allBlogsData?.totalBlogs || 0;

  return (
    <>
      <SEO
        type="website"
        title={`AI & Technology Blogs | Latest Insights from KheyaMind AI${totalBlogs ? ` (${totalBlogs} Articles)` : ''}`}
        description={`Explore ${totalBlogs || 'the latest'} insights on AI chatbots, voice assistants, automation, and emerging technologies. Stay updated with KheyaMind AI's expert blog content and industry analysis.`}
        keywords="AI blogs, technology insights, chatbot articles, voice AI content, automation guides, AI trends, KheyaMind AI blog, artificial intelligence news"
        url="https://www.kheyamind.ai/blogs"
        image={banner}
      />
      <div className="min-h-screen">
        <PageBanner banner={banner} title="Blogs" />

        <div className="pt-[3rem]">
          <div className="wrapper space-y-10">
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="space-y-4 flex flex-col md:items-center md:text-center"
            >
              <p className="uppercase text-primary font-medium">
                Blogs {totalBlogs > 0 && <span className="text-sm">({totalBlogs} Articles)</span>}
              </p>
              <h3 className="section-heading">
                Discover Cutting-Edge AI and IT Service Strategies
              </h3>
              <HrLine />
            </div>

            {/* Initial loading state */}
            {isLoading ? (
              <div data-aos="fade-up" data-aos-delay="200">
                <FancyLoader />
              </div>
            ) : isError ? (
              <div
                data-aos="fade-up"
                data-aos-delay="200"
                className="text-center py-10 text-red-500"
              >
                <p className="text-lg font-medium mb-2">Failed to load blogs</p>
                <p className="text-sm">{error?.message || 'Please try again later'}</p>
              </div>
            ) : (
              <>
                {/* Blog Grid */}
                <div
                  data-aos="fade-up"
                  data-aos-delay="200"
                  className="grid sm:grid-cols-2 md:grid-cols-3 gap-6"
                >
                  {blogs.length > 0 ? (
                    blogs.map((blog, index) => (
                      <div
                        key={blog._id}
                        data-aos="fade-up"
                        data-aos-delay={200 + (index % 6) * 50}
                      >
                        <BlogItem item={blog} />
                      </div>
                    ))
                  ) : (
                    <div className="col-span-3 text-center py-16">
                      <div className="max-w-md mx-auto">
                        <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No blogs found</h3>
                        <p className="text-gray-500">We're working on adding new content. Check back soon!</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Show More Button */}
                {hasNextPage && (
                  <div className="text-center" data-aos="fade-up" data-aos-delay="300">
                    <button
                      onClick={() => fetchNextPage()}
                      disabled={isFetchingNextPage}
                      className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isFetchingNextPage ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Loading More...
                        </>
                      ) : (
                        <>
                          Show More Articles
                          <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                          </svg>
                        </>
                      )}
                    </button>
                    <p className="text-sm text-gray-500 mt-2">
                      Showing {blogs.length} of {totalBlogs} articles
                    </p>
                  </div>
                )}

                {/* No more articles message */}
                {!hasNextPage && blogs.length > 0 && (
                  <div className="text-center py-8" data-aos="fade-up">
                    <p className="text-gray-600">
                      You've reached the end! 🎉 <br />
                      <span className="text-sm">That's all {totalBlogs} articles. Stay tuned for more!</span>
                    </p>
                  </div>
                )}
              </>
            )}

            {/* Contact Form - only show after initial content loads */}
            {!isLoading && (
              <div data-aos="fade-up" data-aos-delay="400">
                <ContactForm />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogs;
