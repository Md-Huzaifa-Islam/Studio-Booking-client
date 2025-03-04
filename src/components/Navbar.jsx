import Link from "next/link";
import React from "react";

export default function Navbar() {
  const link = (
    <>
      <li>
        <Link href={"/"}>Home</Link>
      </li>
      <li>
        <Link href={"/studios"}>All studios</Link>
      </li>
      <li>
        <Link href={"/mybookings"}>My bookings</Link>
      </li>
    </>
  );

  return (
    <div>
      <div className="navbar bg-indigo-700 shadow-md px-4 py-3">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white text-black rounded-box mt-3 w-52 p-2 shadow-lg"
            >
              {link}
            </ul>
          </div>
          <Link
            href={"/"}
            className="btn btn-ghost text-2xl font-semibold text-white"
          >
            StudioSpace
          </Link>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-4 text-white space-x-6">
            {link}
          </ul>
        </div>
      </div>
    </div>
  );
}
