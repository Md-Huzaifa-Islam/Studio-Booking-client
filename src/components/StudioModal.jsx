import { format, setHours, setMinutes, subHours } from "date-fns";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function StudioModal({ studio, id }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(null);
  const [error, setError] = useState("");

  // Convert time string (e.g., "09:00") to Date object
  const parseTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return setHours(setMinutes(new Date(), minutes), hours);
  };

  const decreaseOneHour = (date) => {
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() - 1);
    return newDate;
  };

  // Get min and max time constraints
  const minTime = studio.Availability
    ? decreaseOneHour(parseTime(studio.Availability.Open))
    : setHours(setMinutes(new Date(), 0), 9);
  console.log(minTime);
  const maxTime = studio.Availability
    ? subHours(parseTime(studio.Availability.Close), 1)
    : setHours(setMinutes(new Date(), 0), 17);

  const handleConfirmBooking = () => {
    if (!name || !email || !time) {
      setError("Please fill in all fields.");
      return;
    }

    const bookingData = {
      name,
      sName: studio.Type,
      email,
      date: format(date, "dd/MM/yyyy"),
      time: format(time, "hh:mm aa"),
      studio: id,
      created: Date.now(),
      city: studio.Location.City,
      area: studio.Location.Area,
    };

    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    // Check if the time slot is already booked
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

    bookings.push(bookingData);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    // Reset fields and close modal
    setTime(null);
    setDate(new Date());
    document.getElementById(`studio-modal-${id}`).close();
  };

  return (
    <div>
      <button
        className="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md shadow-lg transition duration-300"
        onClick={() => {
          document.getElementById(`studio-modal-${id}`).showModal();
          setError("");
        }}
      >
        Book Now
      </button>

      <dialog
        id={`studio-modal-${id}`}
        className="modal mx-auto w-full max-w-4xl"
      >
        <div className="modal-box p-8 bg-white rounded-lg shadow-lg max-w-none">
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

          <h2 className="text-2xl font-bold text-gray-800">{studio.Name}</h2>
          <p className="text-gray-500">{studio.Type}</p>
          <p className="mt-2 text-gray-600">
            📍 {studio.Location.City}, {studio.Location.Area}
          </p>

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
                  minTime={minTime}
                  maxTime={maxTime} // Properly limits selection
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
