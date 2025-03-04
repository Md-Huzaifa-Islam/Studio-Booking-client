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
        className="btn btn-primary"
        onClick={() => {
          document.getElementById(`studio-modal-${id}`).showModal();
          setError("");
        }}
      >
        Book Now
      </button>

      {/* Modal */}
      <dialog id={`studio-modal-${id}`} className="modal mx-auto w-3xl">
        <div className="modal-box w-full max-w-none">
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
          <h2 className="text-xl font-bold">{studio.Name}</h2>
          <p className="text-gray-600">{studio.Type}</p>
          <p className="mt-2 text-gray-500">
            📍 {studio.Location.City}, {studio.Location.Area}
          </p>
          <p className="text-sm text-gray-400">{studio.Location.Address}</p>

          <div className="mt-2">
            <h3 className="text-sm font-semibold">Amenities:</h3>
            <ul className="list-inside list-disc text-sm text-gray-600">
              {studio.Amenities.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
          </div>

          <p className="mt-2 font-bold text-blue-500">
            💰 {studio.PricePerHour} {studio.Currency}/hr
          </p>
          <p className="text-yellow-500">⭐ {studio.Rating} / 5</p>

          <p className="mt-2 text-green-500">
            🕒 Available: {studio.Availability.Open} -{" "}
            {studio.Availability.Close}
          </p>

          {/* Booking Form */}
          <div className="mt-4">
            <h3 className="text-lg font-bold">Book a Slot</h3>

            <label className="mt-2 block text-sm">Name:</label>
            <input
              type="text"
              placeholder="Your name"
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
            />

            <label className="mt-2 block text-sm">Email:</label>
            <input
              type="email"
              placeholder="Your email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />

            <div className="flex justify-between">
              <div>
                <label className="mt-2 block text-sm">Select Date:</label>
                <DatePicker
                  className="input input-bordered w-full"
                  selected={date}
                  onChange={(d) => {
                    setDate(d);
                    setError("");
                  }}
                  required
                />
              </div>

              <div>
                <label className="mt-2 block text-sm">Select Time Slot:</label>
                <DatePicker
                  className="input input-bordered w-full"
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
            <p className="text-center text-red-500">{error}</p>
            <button
              type="button"
              className="btn btn-primary mt-4 w-full"
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
