import { Link } from "react-router-dom";
import BlogItem from "./BlogItem";
import HrLine from "../HrLine";
import { useBlogs } from "../../hooks/useBlogs";
import { useEffect, useRef, useState } from "react";

const RecentBlogs = ({ slug }) => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);
  
  // Only call useBlogs when the component is in view
  const { data: blogsData, isLoading: isBlogsLoading } = useBlogs({
    enabled: isInView,
  });
  
  // Filter recent blogs
  const recentBlogs = blogsData?.blogs
    ? blogsData.blogs.filter((item) => item.slug !== slug).slice(0, 3)
    : [];
    
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the component enters the viewport
        if (entry.isIntersecting) {
          setIsInView(true);
          // Once we've loaded the data, we can disconnect the observer
          observer.disconnect();
        }
      },
      {
        // Start loading when the element is 200px before it enters the viewport
        rootMargin: "200px",
        threshold: 0.1
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <div className="space-y-8" ref={sectionRef}>
      <div className="space-y-4">
        <h3 className="section-heading text-secondary">Recent Blogs</h3>
        <HrLine />
        <p className="text-gray-600">
          Discover more interesting articles from our blog
        </p>
      </div>

      {isInView && !isBlogsLoading && recentBlogs.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recentBlogs.map((item) => (
            <BlogItem key={item._id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-600">
            {isInView && isBlogsLoading 
              ? "Loading blogs..." 
              : "No other blogs found at the moment"}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {isInView && isBlogsLoading 
              ? "Please wait..." 
              : "Check back soon for more content!"}
          </p>
        </div>
      )}

      <div className="pt-[2rem] flex justify-center">
        <Link to="/blogs" className="primary-btn flex items-center gap-2">
          Explore More Blogs
        </Link>
      </div>
    </div>
  );
};

export default RecentBlogs;
