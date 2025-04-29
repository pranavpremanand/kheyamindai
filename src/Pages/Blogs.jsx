import React from "react";
import banner from "../assets/images/banners/blogs.webp";
import PageBanner from "../Components/Website/PageBanner";
import { blogs } from "../Components/Website/BlogsSection";
import BlogItem from "../Components/Website/BlogItem";
import HrLine from "../Components/HrLine";
import ContactForm from "../Components/ContactForm";

const Blogs = () => {
  return (
    <>
      <PageBanner banner={banner} title="Blogs" />
      <div className="wrapper pt-[5rem] space-y-6">
        <div
          data-aos="fade-up"
          className="space-y-4 flex flex-col md:items-center md:text-center"
        >
          <p className="uppercase text-primary font-medium">
            Blogs
          </p>
          <h3 className="section-heading">
            Discover Cutting-Edge AI and IT Service Strategies
          </h3>
          <HrLine />
        </div>
        <div
          data-aos="fade-up"
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {blogs.map((item) => (
            <BlogItem key={item} item={item} />
          ))}
        </div>
        <ContactForm />
      </div>
    </>
  );
};

export default Blogs;
