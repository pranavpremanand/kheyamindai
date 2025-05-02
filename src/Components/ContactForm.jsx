import React, { useState } from "react";
import HrLine from "./HrLine";
import { TiArrowBack } from "react-icons/ti";
import { ImPhone } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { companyDetails } from "../data/constant";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";

// Define validation schema with strict rules
const schema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must not exceed 50 characters")
    .matches(/^[a-zA-Z\s]+$/, "Name should only contain alphabets and spaces"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    ),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
      "Please enter a valid phone number"
    )
    .min(10, "Phone number must be at least 10 digits"),
  subject: yup
    .string()
    .required("Subject is required")
    .min(5, "Subject must be at least 5 characters")
    .max(100, "Subject must not exceed 100 characters"),
  message: yup
    .string()
    .required("Message is required")
    .min(20, "Message must be at least 20 characters")
    .max(1000, "Message must not exceed 1000 characters"),
});

const ContactForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Create HTML email template that matches website theme
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${data.subject}</title>
          <style>
            body {
              font-family: 'Poppins', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 0;
            }
            .email-container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
           
              background-color: #003049;
              padding: 20px;
              text-align: center;
              border-radius: 5px 5px 0 Navigate to thank you page
        navigate('/thank-you'0;
            }
            .header h1 {
              color: #ffffff;
              margin: 0;
              font-size: 24px;
            }
            .content {
              background-color: #ffffff;
              padding: 20px;
              border-left: 1px solid #e1e1e1;
              border-right: 1px solid #e1e1e1;
            }
            .footer {
              background-color: #f5f5f5;
              padding: 15px 20px;
              text-align: center;
              font-size: 14px;
              color: #666;
              border-radius: 0 0 5px 5px;
              border: 1px solid #e1e1e1;
              border-top: none;
            }
            .info-item {
              margin-bottom: 15px;
            }
            .info-label {
              font-weight: bold;
              color: #003049;
            }
            .message-box {
              background-color: #f9f9f9;
              padding: 15px;
              border-left: 4px solid #FFB703;
              margin-top: 20px;
              border-radius: 0 5px 5px 0;
            }
            .highlight {
              color: #FFB703;
              font-weight: bold;
            }
            .button {
              background-color: #FFB703;
              color: #003049;
              padding: 10px 20px;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
              display: inline-block;
              margin-top: 15px;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h1>New Contact Form Submission</h1>
            </div>
            <div class="content">
              <p>You have received a new message from your website contact form:</p>
              
              <div class="info-item">
                <span class="info-label">Name:</span> ${data.fullName}
              </div>
              
              <div class="info-item">
                <span class="info-label">Email:</span> <a href="mailto:${
                  data.email
                }" style="color: #FFB703;">${data.email}</a>
              </div>
              
              <div class="info-item">
                <span class="info-label">Phone:</span> <a href="tel:${
                  data.phone
                }" style="color: #FFB703;">${data.phone}</a>
              </div>
              
              <div class="info-item">
                <span class="info-label">Subject:</span> ${data.subject}
              </div>
              
              <div class="message-box">
                <span class="info-label">Message:</span>
                <p>${data.message.replace(/\n/g, "<br>")}</p>
              </div>
              
              <a href="mailto:${data.email}" class="button">Reply to ${
        data.fullName
      }</a>
            </div>
            <div class="footer">
              <p>This email was sent from the contact form on <span class="highlight">KheyaMind AI</span> website.</p>
              <p>&copy; ${new Date().getFullYear()} KheyaMind AI. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `;

      const payload = {
        html,
        name: "KheyaMind AI",
        to: companyDetails.email,
        subject: data.subject,
      };

      const res = await axios.post(
        "https://send-mail-redirect-boostmysites.vercel.app/send-email",
        payload
      );

      if (res.data.success) {
        toast.success("Your message was sent successfully");
        // Reset the form
        reset();

        // Navigate to thank you page
        navigate("/thank-you");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error(error.response?.data || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact" className="wrapper pt-[5rem]">
      <div className="grid md:grid-cols-[55%_auto] gap-7">
        <div data-aos="fade-up">
          <div className="space-y-4 text-start">
            <p className="uppercase text-primary font-medium">
              request a quote
            </p>
            <h3 className="section-heading">
              Let's Bring AI to Work — Together.
            </h3>
            <HrLine />
          </div>
          <div className="mt-5 grid sm:grid-cols-2 gap-3 sm:gap-5">
            <div className="">
              <TiArrowBack size={25} className="inline -mt-2 text-primary" />
              <span className="font-bold ml-2">Reply within 24 hours</span>
            </div>
            <div className="">
              <ImPhone size={20} className="inline -mt-2 text-primary" />
              <span className="font-bold ml-2">24 hrs telephone support</span>
            </div>
          </div>
          <p className="mt-5"></p>
          <div className="mt-7 flex gap-3 sm:justify-center sm:w-fit w-full">
            <div className="bg-primary h-full aspect-square flex justify-center items-center p-3">
              <ImPhone size={25} className="text-white" />
            </div>
            <div className="flex flex-col capitalize">
              <p className="">Call to ask any question</p>
              <Link
                to={`tel:${companyDetails.phone}`}
                className="font-semibold"
              >
                {companyDetails.phone}
              </Link>
            </div>
          </div>
        </div>
        <form
          data-aos="fade-up"
          className="bg-primary p-7 space-y-3"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div>
            <input
              type="text"
              className={`w-full p-2 bg-primary-5 outline-none ${
                errors.fullName ? "border-2 border-red-500" : ""
              }`}
              placeholder="Full Name*"
              {...register("fullName")}
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="email"
              className={`w-full p-2 bg-primary-5 outline-none ${
                errors.email ? "border-2 border-red-500" : ""
              }`}
              placeholder="Email*"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="tel"
              className={`w-full p-2 bg-primary-5 outline-none ${
                errors.phone ? "border-2 border-red-500" : ""
              }`}
              placeholder="Phone Number*"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              className={`w-full p-2 bg-primary-5 outline-none ${
                errors.subject ? "border-2 border-red-500" : ""
              }`}
              placeholder="Subject*"
              {...register("subject")}
            />
            {errors.subject && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                {errors.subject.message}
              </p>
            )}
          </div>

          <div>
            <textarea
              rows="5"
              className={`w-full p-2 bg-primary-5 outline-none ${
                errors.message ? "border-2 border-red-500" : ""
              }`}
              placeholder="Message*"
              {...register("message")}
            />
            {errors.message && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                {errors.message.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="secondary-btn w-full flex justify-center items-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </>
            ) : (
              "Request A Quote"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
