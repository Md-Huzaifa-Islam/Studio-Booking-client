import React from "react";
import StudioModal from "./StudioModal";

export default function StudioCard({ studio }) {
  return (
    <div className="card w-full max-w-xl shadow-lg shadow-blue-400">
      <div className="card-body">
        {/* Studio Name & Type */}
        <h2 className="card-title">{studio.Name}</h2>
        <p className="text-gray-600">{studio.Type}</p>

        {/* Location */}
        <div className="flex justify-between">
          <p className="w-max text-gray-500">
            📍 {studio.Location.City}, {studio.Location.Area}
          </p>
          <p className="w-max">|</p>
          <p className="w-max text-sm text-gray-400">
            {studio.Location.Address}
          </p>
        </div>

        {/* Amenities List */}
        <div className="mt-2">
          <h3 className="text-sm font-semibold">Amenities:</h3>
          <ul className="list-inside list-disc text-sm text-gray-600">
            {studio.Amenities.map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>
        </div>

        {/* Price & Rating */}
        <div className="mt-2 flex justify-between">
          <p className="font-bold text-blue-500">
            💰 {studio.PricePerHour} {studio.Currency}/hr
          </p>
          <p className="text-right text-yellow-500">⭐ {studio.Rating} / 5</p>
        </div>

        {/* Booking Button */}
        <div className="card-actions justify-center">
          <StudioModal studio={studio} id={studio.Id} />
        </div>
      </div>
    </div>
  );
}
