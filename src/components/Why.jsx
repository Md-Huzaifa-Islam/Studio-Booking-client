import React from "react";

export default function Why() {
  return (
    <section className="py-16 bg-blue-100">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          Why Choose Us?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white shadow-lg rounded-md">
            <h3 className="text-xl font-semibold mb-4">
              Wide Range of Studios
            </h3>
            <p>
              Choose from a variety of studios designed to meet your unique
              needs.
            </p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-md">
            <h3 className="text-xl font-semibold mb-4">
              Easy and Fast Booking
            </h3>
            <p>
              Book your studio in just a few clicks and get instant
              confirmation.
            </p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-md">
            <h3 className="text-xl font-semibold mb-4">Affordable Rates</h3>
            <p>
              Get access to affordable studio spaces with transparent pricing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
