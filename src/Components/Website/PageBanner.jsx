import { MdOutlineArrowForwardIos } from "react-icons/md";
import { Link } from "react-router-dom";
import { OptimizedImage } from "../LazyImage";

const PageBanner = ({ banner, title, breadcrumbs }) => {
  return (
    <div className="relative w-full h-[450px] md:h-[500px]">
      <OptimizedImage
        src={banner}
        alt={title}
        className="w-full h-full object-cover"
        priority={true}
      />
      <div className="absolute inset-0 bg-black/50" />
      {breadcrumbs ? (
        <nav
          aria-label="breadcrumb"
          className="absolute inset-0 w-full h-full flex items-center justify-center"
        >
          {breadcrumbs}
        </nav>
      ) : (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <div className="text-center space-y-4">
            <nav
              aria-label="breadcrumb"
              className="flex text-white items-center text-xl gap-3 justify-center"
            >
              <Link
                to="/"
                className="hover:text-primary duration-200 transition-all"
              >
                Home
              </Link>
              <MdOutlineArrowForwardIos className="-mt-1" />
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {title}
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageBanner;
