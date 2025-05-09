import { useKeenSlider } from "keen-slider/react";
import { useState, useEffect } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import HrLine from "../HrLine";
import BlogItem from "./BlogItem";
import { getBlogs } from "../../utils/api";

const BlogsSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sliderLoaded, setSliderLoaded] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getBlogs();
        setBlogs(response.data.blogs.slice(0, 6));
        setLoading(false);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blogs from API.");
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const sliderOptions = {
    loop: true,
    initial: 0,
    slides: {
      perView: 1,
      spacing: 15,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: {
          perView: 2,
          spacing: 15,
        },
      },
      "(min-width: 1024px)": {
        slides: {
          perView: 3,
          spacing: 15,
        },
      },
    },
    created() {
      setSliderLoaded(true);
    },
  };

  const autoplayPlugin = (slider) => {
    let timeout;
    let mouseOver = false;
    
    const clearNextTimeout = () => {
      clearTimeout(timeout);
    };
    
    const nextTimeout = () => {
      clearTimeout(timeout);
      if (mouseOver) return;
      timeout = setTimeout(() => {
        slider.next();
      }, 2500);
    };
    
    slider.on("created", () => {
      slider.container.addEventListener("mouseover", () => {
        mouseOver = true;
        clearNextTimeout();
      });
      slider.container.addEventListener("mouseout", () => {
        mouseOver = false;
        nextTimeout();
      });
      nextTimeout();
    });
    
    slider.on("dragStarted", clearNextTimeout);
    slider.on("animationEnded", nextTimeout);
    slider.on("updated", nextTimeout);
  };

  const [sliderRef, instanceRef] = useKeenSlider(sliderOptions, [autoplayPlugin]);

  // Don't render anything if no blogs and not loading
  if (blogs.length === 0 && !loading) {
    return null;
  }

  return (
    <section className="pt-[4rem] wrapper">
      <div
        data-aos="fade-up"
        className="space-y-4 flex flex-col sm:items-center sm:text-center max-w-2xl mx-auto"
      >
        <p className="uppercase text-primary font-medium">latest blogs</p>
        <h3 className="section-heading">Insights from the KheyaMind Lab</h3>
        <HrLine />
      </div>

      {loading ? (
        <div className="text-center py-10">Loading blogs...</div>
      ) : (
        <>
          {error && (
            <div className="text-center text-yellow-600 mb-4">{error}</div>
          )}
          <div data-aos="fade-up" ref={sliderRef} className="keen-slider mt-7">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <BlogItem key={blog._id || blog.slug} item={blog} />
              ))
            ) : (
              <div className="text-center py-5 w-full">No blogs found</div>
            )}
          </div>
          
          {sliderLoaded && instanceRef.current && blogs.length > 0 && (
            <div
              data-aos="fade-up"
              className="flex items-center justify-center gap-4 mt-5"
            >
              <button
                onClick={() => instanceRef.current?.prev()}
                className="bg-black/5 p-3 rounded-full hover:bg-black/10 transition-colors"
                aria-label="Previous slide"
              >
                <FiArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => instanceRef.current?.next()}
                className="bg-black/5 p-3 rounded-full hover:bg-black/10 transition-colors"
                aria-label="Next slide"
              >
                <FiArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default BlogsSection;
