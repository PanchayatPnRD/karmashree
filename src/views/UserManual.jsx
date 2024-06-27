import { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import { Accordion } from "flowbite-react";
import { getAllLibraryList } from "../Service/Library/LibraryService";
import { devApi } from "../WebApi/WebApi";
const UserManual = () => {
  const [LibraryList, setAllLibraryList] = useState([]);

  useEffect(() => {
    getAllLibraryList("").then(function (result) {
      const response = result?.data?.result;
      setAllLibraryList(response);
    });
  }, []);

  console.log(LibraryList, "LibraryList");
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
              <Accordion.Content className="pl-10 text-zinc-500">
                <ol className="list-decimal flex flex-col space-y-4">
                  {LibraryList?.map((d, index) => {
                    if (d?.category === "U") {
                      return (
                        <li>
                          <p className="mb-2 text-gray-500 dark:text-gray-400 flex items-center space-x-4">
                            <span>{d?.caption}</span>
                            <a href={devApi + "/api/" + d?.UploadFileLink}>
                              <Icon
                                className="text-2xl cursor-pointer text-red-600"
                                icon={"bi:file-earmark-pdf-fill"}
                              />
                            </a>
                          </p>
                        </li>
                      );
                    }
                  })}
                </ol>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>Orders</Accordion.Title>
              <Accordion.Content className="pl-10 text-zinc-500">
                <ol className="list-decimal flex flex-col space-y-4">
                  {LibraryList?.map((d, index) => {
                    if (d?.category === "Or") {
                      return (
                        <li>
                          <span className="flex items-center space-x-4">
                            <span>
                              {d?.caption}-{d?.orderno}-
                              {new Date(d?.orderDate).toLocaleDateString(
                                "fr-CA",
                                {
                                  year: "numeric",
                                  month: "numeric",
                                  day: "numeric",
                                }
                              )}
                            </span>
                            <a href={devApi + "/api/" + d?.UploadFileLink}>
                              <Icon
                                className="text-2xl cursor-pointer text-red-600"
                                icon={"bi:file-earmark-pdf-fill"}
                              />
                            </a>
                          </span>
                        </li>
                      );
                    }
                  })}
                </ol>
              </Accordion.Content>
            </Accordion.Panel>

            <Accordion.Panel>
              <Accordion.Title>Others</Accordion.Title>
              <Accordion.Content className="pl-10 text-zinc-500">
                <ol className="list-decimal flex flex-col space-y-4">
                  {LibraryList?.map((d, index) => {
                    if (d?.category === "Ot") {
                      return (
                        <li>
                          <span className="flex items-center space-x-4">
                            <span>
                              {d?.caption}
                            </span>
                            <a href={devApi + "/api/" + d?.UploadFileLink}>
                              <Icon
                                className="text-2xl cursor-pointer text-red-600"
                                icon={"bi:file-earmark-pdf-fill"}
                              />
                            </a>
                          </span>
                        </li>
                      );
                    }
                  })}
                </ol>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>Video Links</Accordion.Title>
              {LibraryList?.map((d, index) => {
                if (d?.category === "Y") {
                  return (
                    <Accordion.Content>
                      <p className="mb-2 text-gray-500 dark:text-gray-400 flex items-center space-x-12">
                        <span>
                          <li>
                            <b>{d?.caption}</b>
                          </li>
                        </span>
                      </p>
                      <div>
                        <iframe
                          width="560"
                          height="315"
                          src={d?.YoutubeLink}
                          title="YouTube video player"
                          frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerpolicy="strict-origin-when-cross-origin"
                          allowfullscreen
                        ></iframe>
                      </div>
                    </Accordion.Content>
                  );
                }
              })}
            </Accordion.Panel>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default UserManual;
