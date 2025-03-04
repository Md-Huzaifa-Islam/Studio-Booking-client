import React from "react";

export default function Testimonials() {
  return (
    <section className="py-16 bg-blue-100">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          What Our Clients Say
        </h2>
        <div className="flex flex-wrap justify-center gap-12">
          <div className="w-80 p-6 bg-white rounded-lg shadow-lg">
            <p className="text-lg text-gray-600 mb-4">
              "The booking process was seamless, and the studio was perfect for
              our team event. Highly recommend!"
            </p>
            <p className="font-semibold text-gray-700">John Doe</p>
            <p className="text-sm text-gray-500">Event Organizer</p>
          </div>
          <div className="w-80 p-6 bg-white rounded-lg shadow-lg">
            <p className="text-lg text-gray-600 mb-4">
              "Great space, easy booking, and very friendly staff. We'll be back
              soon!"
            </p>
            <p className="font-semibold text-gray-700">Jane Smith</p>
            <p className="text-sm text-gray-500">Photographer</p>
          </div>
        </div>
      </div>
    </section>
  );
}
