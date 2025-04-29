import React from "react";
import PageBanner from "../Components/Website/PageBanner";
import banner from "../assets/images/banners/blogs.webp";
import { blogs } from "../Components/Website/BlogsSection";
import BlogItem from "../Components/Website/BlogItem";
import HrLine from "../Components/HrLine";
import { Link } from "react-router-dom";

const BlogDetails = () => {
  return (
    <>
      <PageBanner banner={banner} title="Blogs" />
      <div className="wrapper pt-[5rem]">
        <img
          src={blogs[0]}
          alt="Blog"
          className="md:aspect-video lg:aspect-[13/6] object-cover rounded-lg"
        />
        <div className="pt-[2rem] space-y-4">
          <h2 className="section-heading">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </h2>
          <div className="flex gap-4 justify-between">
            <HrLine />
            <HrLine />
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat,
            sit. Ut aliquid at minus labore cupiditate, tempore cum hic
            incidunt, delectus dolore pariatur veniam soluta culpa nostrum quia
            perferendis placeat! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Dolor velit explicabo, reiciendis dolorem
            veritatis recusandae ab odit ipsam sapiente blanditiis perferendis a
            optio officiis asperiores obcaecati ullam officia saepe qui! Alias
            minus repellat nemo, impedit eius, sunt consequatur hic perspiciatis
            asperiores placeat esse neque ratione expedita nobis iure quam
            veniam accusamus, cumque eaque aperiam maxime. Similique illum
            corrupti rerum doloribus? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Tempore provident iure mollitia in fuga at eveniet
            quos, ea, unde similique expedita, reiciendis ullam eius ipsam sequi
            dicta? Accusantium, deserunt dicta. Consequatur rerum incidunt
            excepturi modi eos dolores. Consequatur porro magnam optio. Qui eius
            consequatur, earum quam, accusantium possimus sunt suscipit, alias
            voluptates atque quo porro vitae ipsa praesentium velit neque!
            Cupiditate, reiciendis veritatis consequuntur debitis dolor harum
            possimus modi obcaecati pariatur asperiores porro sed.
          </p>
        </div>
        <hr className="border-primary/30 my-[3rem]" />
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="section-heading">Recent Blogs</h3>
            <HrLine />
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {blogs.map((item) => (
              <BlogItem key={item} item={item} />
            ))}
          </div>
          <div className="pt-[2rem]">
            <Link to="/blogs" className="w-fit mx-auto primary-btn">
              Explore More
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
