import Link from "next/link";
import React from "react";

export default function Banner() {
  return (
    <section className="relative bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20">
      <div className="absolute inset-0 opacity-50 bg-cover bg-center bg-image"></div>
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Find Your Perfect Studio Space
        </h1>
        <p className="mt-4 text-lg md:text-xl">
          Whether it's for work, events, or leisure, we have the perfect space
          for you. Book a studio today!
        </p>
        <Link
          href={"/studios"}
          className="btn btn-primary mt-6 bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-md"
        >
          Book Now
        </Link>
      </div>
    </section>
  );
}
