import React from "react";

const ContactForm2 = () => {
  return (
    <form data-aos="fade-up" className="grid grid-cols-1 gap-5">
      <div className="grid lg:grid-cols-2 gap-5">
        <div>
          <input
            type="text"
            placeholder="Full Name"
            className="p-2 outline-none bg-secondary/10 rounded w-full"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email Address"
            className="p-2 outline-none bg-secondary/10 rounded w-full"
          />
        </div>
      </div>
      <div>
        <input
          type="text"
          placeholder="Subject"
          className="p-2 outline-none bg-secondary/10 rounded w-full"
        />
      </div>
      <div>
        <textarea
          rows="5"
          placeholder="Message"
          className="p-2 outline-none bg-secondary/10 rounded w-full"
        />
      </div>
      <button type="button" className="primary-btn">
        Send Message
      </button>
    </form>
  );
};

export default ContactForm2;
