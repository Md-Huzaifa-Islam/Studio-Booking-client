import Link from "next/link";
import React from "react";

export default function Book() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Ready to Book Your Studio?
      </h2>
      <p className="text-lg md:text-xl mb-6">
        Don't wait! Find the perfect studio for your needs and book it today.
      </p>
      <Link
        href={"/studios"}
        className="btn btn-primary bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-md"
      >
        Book Now
      </Link>
    </section>
  );
}
