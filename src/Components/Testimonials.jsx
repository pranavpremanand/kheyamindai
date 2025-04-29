import { testimonials } from "../data/constant";
import HrLine from "./HrLine";
import { useKeenSlider } from "keen-slider/react";

const Testimonials = () => {
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      breakpoints: {
        "(min-width: 600px)": {
          slides: { perView: 2, spacing: 10 },
        },
        "(min-width: 1024px)": {
          slides: { perView: 3, spacing: 10 },
        },
      },
      slides: { perView: 1, spacing: 10 },
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  return (
    <div className="wrapper pt-[5rem]">
      <div
        data-aos="fade-up"
        className="space-y-4 flex flex-col sm:items-center sm:text-center max-w-2xl mx-auto"
      >
        <p className="uppercase text-primary font-medium">testimonials</p>
        <h3 className="section-heading">
          What Our Clients Say About Our Digital Services
        </h3>
        <HrLine />
      </div>
      <div data-aos="fade-up" className="keen-slider mt-[2rem]" ref={sliderRef}>
        {testimonials.map((item) => (
          <div key={item.name} className="keen-slider__slide bg-primary/10">
            <div className="flex items-center gap-2 px-5 pt-5 pb-3">
              <img
                src={item.image}
                className="w-[3.5rem] min-w-[3.5rem] h-[3.5rem] rounded-full bg-primary"
                alt="Testimonial"
              />
              <div className="space-y-1">
                <p className="font-bold text-primary">{item.name}</p>
                <p>{item.designation}</p>
              </div>
            </div>
            <hr className="border-2" />
            <p className="pt-3 px-5 pb-5">{item.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
