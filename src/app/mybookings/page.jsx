"use client";
import SectionHeader from "@/components/SectionHeader";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Retrieve bookings from localStorage
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(storedBookings);
  }, []);

  return (
    <main>
      <div className="container mx-auto p-4 bg-[#DBEAFE]">
        <SectionHeader heading={"Booking List"} />

        {/* Check if there are no bookings */}
        {bookings.length === 0 ? (
          <p className="text-center text-lg text-gray-600">
            No bookings available.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <motion.table
              className="table w-full text-sm text-gray-700 bg-white rounded-lg shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <thead className="bg-blue-500 text-white">
                <tr className="border-b-2 border-gray-200">
                  <th className="px-4 py-2 text-left">User Info</th>
                  <th className="px-4 py-2 text-left">Studio Type</th>
                  <th className="px-4 py-2 text-left">Location</th>
                  <th className="px-4 py-2 text-left">Time & Date</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <motion.tr
                    key={index}
                    className="hover:bg-gray-100 transition-all duration-200"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-4 py-2">
                      <p className="font-semibold">Name: {booking.name}</p>
                      <p className="text-gray-500">Email: {booking.email}</p>
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
                  </motion.tr>
                ))}
              </tbody>
            </motion.table>
          </div>
        )}
      </div>
    </main>
  );
};

export default MyBookings;
