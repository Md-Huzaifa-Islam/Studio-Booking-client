import { format } from "date-fns";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function StudioModal({ studio, id }) {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(null);
  const [error, setError] = useState("");

  const handleConfirmBooking = () => {
    const dateInMilliseconds = date.getTime();
    const timeInMilliseconds = time ? time.getTime() : null;
    if (!name || !email) {
      setError("You have to input both name and email");
      return;
    }
    const bookingData = {
      name: name,
      sName: studio.Type,
      email: email,
      date: format(new Date(dateInMilliseconds), "dd/MM/yyyy"),
      time: format(new Date(timeInMilliseconds), "kk"),
      studio: id,
      created: Date.now(),
      city: studio.Location.City,
      area: studio.Location.Area,
    };
    if (time == null) {
      setError("You need to select a time to proceed");
      return;
    }

    // Check if the booking already exists in localStorage
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    // Check for an existing booking for the same studio, date, and time
    const isBooked = bookings.some(
      (booking) =>
        booking.studio === id &&
        booking.date === bookingData.date &&
        booking.time === bookingData.time
    );

    if (isBooked) {
      setError("The time slot has already been booked.");
      return;
    }

    // Add new booking to the localStorage
    bookings.push(bookingData);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    // Clear form and close modal after booking
    setTime(null);
    setDate(new Date());
    const modal = document.getElementById(`studio-modal-${id}`);
    modal.close();
  };

  return (
    <div>
      {/* Book Now Button */}
      <button
        className="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md shadow-lg transition duration-300"
        onClick={() => {
          document.getElementById(`studio-modal-${id}`).showModal();
          setError("");
        }}
      >
        Book Now
      </button>

      {/* Modal */}
      <dialog
        id={`studio-modal-${id}`}
        className="modal mx-auto w-full max-w-4xl"
      >
        <div className="modal-box p-8 bg-white rounded-lg shadow-lg max-w-none">
          {/* Close button */}
          <form method="dialog">
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2"
              onClick={() =>
                document.getElementById(`studio-modal-${id}`).close()
              }
            >
              ✕
            </button>
          </form>

          {/* Studio Information */}
          <h2 className="text-2xl font-bold text-gray-800">{studio.Name}</h2>
          <p className="text-gray-500">{studio.Type}</p>
          <p className="mt-2 text-gray-600">
            📍 {studio.Location.City}, {studio.Location.Area}
          </p>
          <p className="text-sm text-gray-400">{studio.Location.Address}</p>

          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-700">Amenities:</h3>
            <ul className="list-inside list-disc text-sm text-gray-600">
              {studio.Amenities.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
          </div>

          <p className="mt-4 font-bold text-blue-500">
            💰 {studio.PricePerHour} {studio.Currency}/hr
          </p>
          <p className="text-yellow-500">⭐ {studio.Rating} / 5</p>

          <p className="mt-2 text-green-500">
            🕒 Available: {studio.Availability.Open} -{" "}
            {studio.Availability.Close}
          </p>

          {/* Booking Form */}
          <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-800">Book a Slot</h3>

            <label className="mt-2 block text-sm text-gray-700">Name:</label>
            <input
              type="text"
              placeholder="Your name"
              className="input input-bordered w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
            />

            <label className="mt-2 block text-sm text-gray-700">Email:</label>
            <input
              type="email"
              placeholder="Your email"
              className="input input-bordered w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700">
                  Select Date:
                </label>
                <DatePicker
                  className="input input-bordered w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  selected={date}
                  onChange={(d) => {
                    setDate(d);
                    setError("");
                  }}
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700">
                  Select Time Slot:
                </label>
                <DatePicker
                  className="input input-bordered w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  selected={time}
                  onChange={(t) => {
                    setTime(t);
                    setError("");
                  }}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={60}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  required
                />
              </div>
            </div>

            <p className="text-center text-red-500 mt-2">{error}</p>

            <button
              type="button"
              className="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white py-3 px-6 mt-6 w-full rounded-md shadow-lg transition duration-300"
              onClick={handleConfirmBooking}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
