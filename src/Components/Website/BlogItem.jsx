import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const BlogItem = ({ item }) => {
  return (
    <Link
      to="/blogs/1"
      key={item}
      className="keen-slider__slide space-y-2 border border-black/20 group"
    >
      <img
        src={item}
        alt=""
        className="w-full aspect-video group-hover:brightness-75 duration-200 transition-all"
      />
      <div className="px-5 py-4 space-y-2">
        <h6 className="text-lg font-semibold text-secondary line-clamp-2 group-hover:text-primary duration-200 transition-all">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Lorem ipsum,
          dolor sit amet consectetur adipisicing elit.
        </h6>
        <p className="line-clamp-3">
          Boluptatum dolores porro ex laborum officiis magnam deleniti ea velit
          dolore inventore consequuntur voluptas sit doloribus vero? Eos dolorum
          deleniti provident! Ab incidunt quae quod impedit, veritatis ipsum non
          sint perferendis magni vel facere cumque voluptas nobis alias
          doloremque recusandae error quas inventore.
        </p>
        <Link
          to="/blogs/1"
          className="text-primary flex items-center gap-2 group-hover:text-secondary w-fit"
        >
          Read More <FaArrowRight />
        </Link>
      </div>
    </Link>
  );
};

export default BlogItem;
