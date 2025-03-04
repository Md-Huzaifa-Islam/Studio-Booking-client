"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState, useEffect } from "react";

import { FaFilter } from "react-icons/fa";
import { RiResetLeftLine } from "react-icons/ri";
import SectionHeader from "@/components/SectionHeader";
import StudioCard from "@/components/StudioCard";

// Fetch studios from the API
const fetchStudios = async () => {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/rash3dul-islam/88e1565bea2dd1ff9180ff733617a565/raw/684afa147a8e726d7a5e4fdeb390f2d48b35051d/studio-mock-api,json"
  );
  return data.Studios;
};

// Haversine formula to calculate distance between two coordinates
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180); // Convert to radians
  const dLon = (lon2 - lon1) * (Math.PI / 180); // Convert to radians
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
};

export default function StudioContainer() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["studios"],
    queryFn: fetchStudios,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [filteredStudios, setFilteredStudios] = useState([]);
  const [radius, setRadius] = useState(10); // Default radius to 10 km
  const [userLocation, setUserLocation] = useState(null);

  // Extract unique places from the studio data
  const places = new Set();
  data &&
    data.forEach((d) => {
      if (d.Location && d.Location.Area) {
        places.add(d.Location.Area);
      }
    });

  const uniquePlaces = ["Any Where", ...places];

  // Handle search term input
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter the suggestions based on search term
    const filteredPlaces = uniquePlaces.filter((place) =>
      place.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredPlaces);
  };

  // Handle suggestion click (when user selects a suggestion)
  const handleSuggestionClick = (place) => {
    setSearchTerm(place);
    setSuggestions([]); // Hide suggestions once a place is selected
    filterStudiosByPlace(place); // Filter studios by place
  };

  // Get user's current location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting location: ", error);
          alert(
            "Unable to retrieve your location. Please enable location access."
          );
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Filter studios by location (place)
  const filterStudiosByPlace = (place) => {
    if (place === "Any Where") {
      setFilteredStudios(data); // Show all studios
    } else {
      const filtered = data.filter((studio) => studio.Location.Area === place);
      setFilteredStudios(filtered);
    }
  };

  // Filter studios by radius (within the given distance from user's location)
  const filterStudiosByRadius = () => {
    if (userLocation && data) {
      const { latitude, longitude } = userLocation;
      const studiosWithinRadius = data.filter((studio) => {
        const { Latitude, Longitude } = studio.Location.Coordinates;
        const distance = calculateDistance(
          latitude,
          longitude,
          Latitude,
          Longitude
        );
        return distance <= radius; // Filter studios within the given radius
      });
      setFilteredStudios(studiosWithinRadius);
    }
  };

  // Reset all filters and show all studios
  const resetFilters = () => {
    setFilteredStudios(data); // Reset to the original data
    setSearchTerm("");
    setSuggestions([]);
    setRadius(10); // Reset radius filter to 10 km
  };

  useEffect(() => {
    getUserLocation(); // Get user location on component mount
  }, []);

  useEffect(() => {
    if (data) {
      setFilteredStudios(data); // Show all studios initially
    }
  }, [data]);

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <SectionHeader heading={"All Studios"} />
      <div className="flex items-center justify-center gap-10">
        {/* Search bar */}
        {data && (
          <div className="relative z-50">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full rounded-md border p-2"
              placeholder="Search for a location"
            />
            {/* Suggestions dropdown */}
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 mt-1 max-h-60 w-full overflow-y-auto border bg-black shadow-md">
                {suggestions.map((place) => (
                  <div
                    key={place}
                    onClick={() => handleSuggestionClick(place)}
                    className="cursor-pointer p-2"
                  >
                    {place}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Search by radius */}
        <div className="mt-4 flex items-center">
          <label htmlFor="radius" className="mr-2">
            Search by radius (km):
          </label>
          <input
            type="number"
            id="radius"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            min="1"
            max="100"
            className="rounded-md border p-2"
          />
          <button
            onClick={filterStudiosByRadius}
            className="ml-2 rounded-md bg-blue-500 px-4 py-2 text-white"
          >
            <FaFilter />
          </button>
        </div>

        {/* Reset button */}
        <div className="mt-4">
          <button
            onClick={resetFilters}
            className="rounded-md bg-red-500 px-4 py-2 text-white"
          >
            <RiResetLeftLine />
          </button>
        </div>
      </div>
      <hr className="mx-auto my-8" />
      {/* Display the filtered studios */}
      <div className="grid grid-cols-3 justify-items-center gap-10 px-5">
        {filteredStudios && filteredStudios.length > 0 ? (
          filteredStudios.map((studio) => (
            <StudioCard key={studio.Id} studio={studio} />
          ))
        ) : (
          <p>No studios found.</p>
        )}
      </div>
    </div>
  );
}
