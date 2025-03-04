"use client";
import SectionHeader from "@/components/SectionHeader";
import React, { useState, useEffect } from "react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Retrieve bookings from localStorage
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(storedBookings);
  }, []);

  return (
    <main>
      <div className="container mx-auto p-4">
        <SectionHeader heading={"Booking List"} />

        {/* Check if there are no bookings */}
        {bookings.length === 0 ? (
          <p className="text-center text-lg text-gray-600">
            No bookings available.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full text-sm text-gray-700">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="px-4 py-2 text-left">User Info</th>
                  <th className="px-4 py-2 text-left">Studio Type</th>
                  <th className="px-4 py-2 text-left">Location</th>
                  <th className="px-4 py-2 text-left">Time & Date</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2">
                      <p className="font-semibold">{booking.name}</p>
                      <p className="text-gray-500">{booking.email}</p>
                    </td>
                    <td className="px-4 py-2">{booking.sName}</td>
                    <td className="px-4 py-2">{`${booking.city}, ${booking.area}`}</td>
                    <td className="px-4 py-2">
                      <p>Date: {booking.date}</p>
                      <p>
                        Time:{" "}
                        {booking.time > 12
                          ? `${booking.time - 12} PM`
                          : `${booking.time} AM`}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
};

export default MyBookings;
