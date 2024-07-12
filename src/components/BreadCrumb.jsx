import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BreadCrumb = ({ page }) => {
  return (
    <div className="py-8">
      <ol class="flex items-center whitespace-nowrap">
        <li class="inline-flex items-center">
          <Link
            to="/dashboard"
            className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600"
          >
            Home
          </Link>

          <svg
            class="flex-shrink-0 mx-2 overflow-visible size-4 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </li>
        <li
          class="inline-flex items-center text-sm font-semibold text-gray-800 truncate"
          aria-current="page"
        >
          {page}
        </li>
      </ol>
    </div>
  );
};

export default BreadCrumb;
