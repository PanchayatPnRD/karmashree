import { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import { Accordion } from "flowbite-react";

const UserManual = () => {
  return (
    <>
      <div className="flex flex-grow flex-col space-y-16 p-4 px-12">
        <div className="p-4 shadow-md rounded">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4 px-4 py-1">
              <svg
                viewBox="0 0 1024 1024"
                fill="currentColor"
                height="1em"
                width="1em"
              >
                <path d="M946.5 505L534.6 93.4a31.93 31.93 0 00-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3 0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8 24.9-25 24.9-65.5-.1-90.5z" />
              </svg>
              <li>
                <Link
                  to="/dashboard"
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  Home
                </Link>
                /
              </li>
              <li className="text-gray-500 font-bold" aria-current="page">
                Library
              </li>
            </ol>
          </nav>
        </div>
        <div>
          <Accordion>
            <Accordion.Panel>
              <Accordion.Title>User Manual</Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-gray-500 dark:text-gray-400 flex items-center space-x-12">
                  <span>1. Karmashree User Manual</span>
                  <Icon
                    className="text-3xl cursor-pointer"
                    icon={"vscode-icons:file-type-pdf2"}
                  />
                </p>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>Orders</Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-gray-500 dark:text-gray-400 flex items-center space-x-12">
                  <span>1. Order Circulation</span>
                  <Icon
                    className="text-3xl cursor-pointer"
                    icon={"vscode-icons:file-type-pdf2"}
                  />
                </p>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>Video Links</Accordion.Title>
              <Accordion.Content>
                <div>
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/wvlHkSbLodc?si=JScHg765osZYNSXh"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  ></iframe>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default UserManual;
