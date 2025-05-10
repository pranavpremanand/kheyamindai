import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const BlogItem = ({ item }) => {
  return (
    <Link
      to={`/blogs/${item.slug}`}
      className="keen-slider__slide space-y-2 border border-black/20 group relative"
    >
      <img
        src={item.imageUrl}
        alt={item.imageAlt}
        className="w-full aspect-video group-hover:brightness-75 duration-200 transition-all"
      />
      <div className="absolute top-0 left-0 w-full px-2 flex justify-between items-center">
        <p className="text-[.7rem] font-medium bg-purple-400 text-white py-1 px-2 rounded-full">
          {item.categoryId.name}
        </p>
        <p className="text-[.7rem] py-1 px-2 text-gray-50 bg-black text-end">
          {new Date(item.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
      <div className="px-5 py-2 space-y-2">
        <h6 className="text-lg font-semibold text-secondary line-clamp-2 group-hover:text-primary duration-200 transition-all">
          {item.title}
        </h6>
        <p className="line-clamp-3">
          {item.excerpt.replace(/<[^>]*>"?/gm, "").substring(0, 150)}...
        </p>
        <Link
          to={`/blogs/${item.slug}`}
          className="text-primary flex items-center gap-2 group-hover:text-secondary w-fit"
        >
          Read More <FaArrowRight />
        </Link>
      </div>
    </Link>
  );
};

export default BlogItem;
