import React, { memo } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import LazyImage from "../LazyImage";

const BlogItem = memo(({ item }) => {
  return (
    <div className="keen-slider__slide space-y-2 border border-black/20 group relative">
      <Link to={`/blogs/${item.slug}`} className="block">
        <LazyImage
          src={item.imageUrl}
          alt={item.imageAlt || item.title}
          className="w-full aspect-video group-hover:brightness-75 duration-200 transition-all"
          loading="lazy"
          decoding="async"
          errorFallback={
            <div className="w-full aspect-video bg-gray-200 flex items-center justify-center text-gray-400">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          }
        />
      </Link>
      <div className="absolute top-0 left-0 w-full px-2 flex justify-between items-center">
        <p className="text-[.7rem] font-medium bg-purple-400 text-white py-1 px-2 rounded-full">
          {item.categoryId?.name || "Uncategorized"}
        </p>
        <p className="text-[.7rem] py-1 px-2 text-gray-50 bg-black text-end">
          {new Date(item.publishDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
      <div className="px-5 py-2 space-y-2">
        <Link to={`/blogs/${item.slug}`}>
          <h6 className="text-lg font-semibold text-secondary line-clamp-2 group-hover:text-primary duration-200 transition-all">
            {item.title}
          </h6>
        </Link>
        <p className="line-clamp-3 text-gray-600">
          {item.excerpt?.replace(/<[^>]*>"?/gm, "").substring(0, 150)}...
        </p>
        <Link
          to={`/blogs/${item.slug}`}
          className="text-primary flex items-center gap-2 group-hover:text-secondary w-fit"
        >
          Read More <FaArrowRight />
        </Link>
      </div>
    </div>
  );
});

BlogItem.displayName = 'BlogItem';

export default BlogItem;
