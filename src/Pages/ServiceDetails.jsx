import React from "react";
import { useParams } from "react-router-dom";
import { services } from "../data/constant";
import ServiceDetailsBanner from "../Components/Website/ServiceDetailsBanner";
import Testimonials from "../Components/Testimonials";
import ContactForm from "../Components/ContactForm";
import { createUrlParam } from "../utils/helper";
import SEO from "../Components/SEO/SEO";

const ServiceDetails = () => {
  const { title } = useParams();
  const data = services.find((item) => createUrlParam(item.title) === title);

  return (
    <>
      <SEO 
        type="service"
        title={`${data.title} | KheyaMind AI Technologies`}
        description={data.description}
        keywords={`${data.title}, AI Solutions, KheyaMind AI, ${data.title.toLowerCase()} services`}
        image={data.detailsPage.banner}
        pageData={{
          title: data.title,
          description: data.description,
          image: data.detailsPage.banner
        }}
      />
      <ServiceDetailsBanner
        banner={data.detailsPage.banner}
        title={data.title}
      />
      <div className="wrapper pt-[5rem] space-y-5">
        <h1 data-aos="fade-up" className="section-heading">
          {data.title}
        </h1>
        <img
          data-aos="fade-up"
          src={data.detailsPage.img1}
          className="aspect-[6/4] md:aspect-[13/6] object-cover rounded-lg"
          alt={data.title}
        />
        <div
          data-aos="fade-up"
          className="pt-[1.5rem]"
          dangerouslySetInnerHTML={{ __html: data.detailsPage.firstSection }}
        />
        <div className="pt-[2rem] md:pt-[2.5rem] flex flex-col-reverse md:grid grid-cols-2 gap-4 md:gap-6">
          <div
            data-aos="fade-up"
            dangerouslySetInnerHTML={{ __html: data.detailsPage.secondSection }}
          />
          <div className="flex rounded-lg aspect-[4/3] overflow-hidden h-full">
            <img
              data-aos="fade-up"
              src={data.detailsPage.img2}
              alt={data.title}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="pt-[2rem] md:pt-[2.5rem] grid md:grid-cols-2 gap-4 md:gap-6">
          <div
            data-aos="fade-up"
            className="flex rounded-lg aspect-[4/3] overflow-hidden h-full"
          >
            <img
              src={data.detailsPage.img3}
              alt={data.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div
            data-aos="fade-up"
            dangerouslySetInnerHTML={{ __html: data.detailsPage.thirdSection }}
          />
        </div>
      </div>
      <Testimonials />
      <ContactForm />
    </>
  );
};

export default ServiceDetails;
