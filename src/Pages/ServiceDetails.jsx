import React from "react";
import { useParams } from "react-router-dom";
import { services } from "../data/constant";
import ServiceDetailsBanner from "../Components/Website/ServiceDetailsBanner";
import Testimonials from "../Components/Testimonials";
import ContactForm from "../Components/ContactForm";
import SEO from "../Components/SEO/SEO";
import Breadcrumb from "../Components/Breadcrumb";
import ServiceCTA from "../Components/ServiceCTA";
import InternalLinkHelper from "../Components/InternalLinkHelper";
import { getServiceBreadcrumb } from "../utils/internalLinking";
// Temporary import for schema validation
import { validateServiceSchema } from "../utils/serviceSchemaValidation";
import HelmetDebug from "../Components/SEO/HelmetDebug";

const ServiceDetails = () => {
  const { slug } = useParams();
  const data = services.find((item) => item.slug === slug);

  if (!data) {
    return <div>Service not found</div>;
  }

  const breadcrumbItems = getServiceBreadcrumb(data.title, data.slug);
  
  // Ensure canonical URL is properly constructed
  const canonicalUrl = data.seo?.canonicalUrl || `https://www.kheyamind.ai/services/${slug}`;
  
  // Validate service schema (development only)
  if (process.env.NODE_ENV === 'development') {
    validateServiceSchema(data, canonicalUrl);
  }

  return (
    <>
      <SEO 
        type="service"
        title={data.seo?.title || `${data.title} | KheyaMind AI Technologies`}
        description={data.seo?.description || data.desc}
        keywords={data.seo?.keywords || `${data.title}, AI Solutions, KheyaMind AI, ${data.title.toLowerCase()} services`}
        image={data.detailsPage.banner}
        url={canonicalUrl}
        pageData={{
          title: data.title,
          description: data.seo?.description || data.desc,
          image: data.detailsPage.banner,
          serviceData: data
        }}
      />
      
      {/* Temporary debug component */}
      {process.env.NODE_ENV === 'development' && (
        <HelmetDebug 
          title={`DEBUG: ${data.title} | KheyaMind AI`}
          description={`DEBUG: ${data.desc}`}
          image={data.detailsPage.banner}
          url={canonicalUrl}
        />
      )}
      
      <ServiceDetailsBanner
        banner={data.detailsPage.banner}
        title={data.title}
      />
      
      <div className="wrapper pt-[5rem] space-y-5">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={breadcrumbItems} />
        
        <h1 data-aos="fade-up" className="section-heading">
          {data.title}
        </h1>
        
        <img
          data-aos="fade-up"
          src={data.detailsPage.img1}
          className="aspect-[6/4] md:aspect-[13/6] object-cover rounded-lg"
          alt={data.title}
        />
        
        <InternalLinkHelper
          content={data.detailsPage.firstSection}
          className="pt-[1.5rem]"
          data-aos="fade-up"
        />
        
        <div className="pt-[2rem] md:pt-[2.5rem] flex flex-col-reverse md:grid grid-cols-2 gap-4 md:gap-6">
          <InternalLinkHelper
            content={data.detailsPage.secondSection}
            data-aos="fade-up"
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
          <InternalLinkHelper
            content={data.detailsPage.thirdSection}
            data-aos="fade-up"
          />
        </div>
      </div>

      {/* Service-specific Call to Action */}
      <ServiceCTA 
        serviceSlug={data.slug}
        serviceName={data.title}
        className="mt-16"
      />

     

      <Testimonials />
      <ContactForm />
    </>
  );
};

export default ServiceDetails;
