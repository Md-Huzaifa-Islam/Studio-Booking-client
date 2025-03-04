import React from "react";

export default function SectionHeader({ heading }) {
  return (
    <p className="py-8 text-center text-4xl font-bold text-gray-800">
      {heading}
    </p>
  );
}
