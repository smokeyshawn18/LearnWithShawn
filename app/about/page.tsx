import React from "react";
import Learn from ".././../public/learn.jpg";
import Image from "next/image";

const page = () => {
  return (
    <section className="w-full bg-background py-16 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Image or illustration */}
        <div className="flex justify-center">
          <Image
            src={Learn} // Replace with your image
            alt="About us illustration"
            className="w-50 max-w-md md:max-w-50"
          />
        </div>

        {/* Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
            About ShawnLearn
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            ShawnLearn is dedicated to providing beginner-friendly resources to
            help you learn Modern Web Development with confidence. We believe
            learning web development should be accessible and practical.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Whether you are just getting started or want to solidify your
            foundation, our eBooks and resources are designed with simplicity
            and clarity in mind.
          </p>
        </div>
      </div>
    </section>
  );
};

export default page;
