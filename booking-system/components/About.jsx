"use client";
import Image from "next/image";
import Carousel from "framer-motion-carousel";
import { slides } from "@/constants";

const About = () => {
  return (
    <div id="about" className="py-24">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="max-w-2xl flex flex-col justify-center py-8">
          <h2 className="font-bold text-3xl md:text-5xl text-gray-900">
            Amazing Hotel in front of the sea.
          </h2>
          <p className="text-sm text-gray-600 py-2">
            Discover the perfect blend of luxury and tranquility at our beach
            resort, where each tide carries away your worries and leaves behind
            memories of pure bliss.
          </p>
        </div>
        <div>
          <Carousel>
            {slides.map((slide, i) => (
              <div key={i} className="flex items-center justify-center">
                <Image
                  src={slide.img}
                  width={0}
                  height={400}
                  priority={true}
                  draggable={false}
                  alt="Slides"
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default About;
