import { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import { Accordion } from "flowbite-react";
import DatePicker from "react-datepicker";
import { addLibrary } from "../Service/Library/LibraryService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const UserManual = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("")
  const [youtube, setYoutube] = useState("")
  const [caption, setCaption] = useState("")
  const [orderNumber, setOrderNumber] = useState("")
  const [orderdate, setOrderDate] = useState();
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [getImage, setGetImage] = useState(null);
  const [getImageresult, setGetImageresult] = useState("")
console.log(getImage,"getImage")
  const jsonString = localStorage.getItem("karmashree_User");
  const karmashree_data = JSON.parse(jsonString);
  const { userIndex } = JSON.parse(localStorage.getItem("karmashree_User"));
  const onCategory = (e) => {
    setCategory(e.target.value)
  }
  const onYoutubeLink = (e) => {
    setYoutube(e.target.value)
  }
  console.log(youtube, "youtube")

  const onCaption = (e) => {
    setCaption(e.target.value)
  }
  const onOrderNumber = (e) => {
    setOrderNumber(e.target.value)
  }

  const onFile = (event) => {
    if (event["target"].files.length > 0) {
      const file = event["target"].files[0];
      // setUserData({...userData, profileImage : file});
      setImage({
        preview: URL.createObjectURL(event.target.files[0]),
        raw: event.target.files[0]
      });
      setGetImage(file)
      setGetImageresult(file.name)
      //     const reader = new FileReader();
      //     reader.readAsDataURL(file);
      //     reader.onload = (event) => {
      //         setGetImageresult(reader.result);
      //   };
    }

  }

  const onSubmit = () => {

    let formData = new FormData();

    formData.append('file', getImage);
    formData.append('category', category);
    formData.append('YoutubeLink', youtube);
    formData.append('caption', caption);
    formData.append('orderno', orderNumber);
    formData.append('orderDate', orderdate);
    formData.append('userIndex', karmashree_data?.userIndex);
    formData.append('status', 0);


    if (category === "") {
      toast.error("Please select Category")

    } else if (category === "Y" && youtube === "") {
      toast.error("Please type YouTube link")

    } else if (caption === "") {
      toast.error("Please type Caption/Subject")

    } else if (category === "Or" && orderNumber === "") {
      toast.error("Please type Order Number")

    } else if (category === "Or" && !orderdate) {
      toast.error("Please type Order Date")

    } else if (category === "Ot" && !getImage) {
      toast.error("Please Choose a File")
    }
    else if (category === "U" && !getImage) {
      toast.error("Please Choose a File")
    }
    else if (category === "Or" && !getImage) {
      toast.error("Please Choose a File")
    }
    else {
      addLibrary(formData,
        (r) => {
          console.log(r, "response")
          if (r.errorCode == 0) {
            toast.success(r.message)
            navigate("/dashboard/manual")
          } else {
            console.log("nononononono")
            toast.error(r.message)
          }
        })
    }
  }
  return (
    <>
      <div className="flex flex-grow flex-col space-y-16 p-4 px-12">
        <ToastContainer />
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
                Library Master
              </li>
            </ol>
          </nav>
        </div>
        <div>
          <>
            <div className="flex flex-grow flex-col space-y-16 p-2 px-0">
              {/* <ToastContainer /> */}

              <div className="bg-white shadow-md rounded-lg px-12 pb-12">
                <div className="flex flex-col w-full mb-4 space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="px-4 w-1/2">
                      <label
                        htmlFor="scheme_name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Category
                        <span className="text-red-500 "> * </span>
                      </label>
                      <select
                        id="scheme_name"
                        name="scheme_name"
                        autoComplete="off"
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        onChange={onCategory}
                      >
                        <option value="" selected hidden>
                          Select Category
                        </option>
                        <option value="Or">Order</option>
                        <option value="U">User Manual</option>
                        <option value="Y">Youtube Links</option>
                        <option value="Ot">Others</option>
                      </select>
                    </div>
                    {category === "Y" ?
                      <div className="w-1/2 px-4">
                        <label
                          htmlFor="scheme_name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Youtube Link
                          <span className="text-red-500 "> * </span>
                        </label>
                        <input
                          id="scheme_name"
                          name="scheme_name"
                          type="text"
                          autoComplete="off"
                          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                          // onChange={onGstIn}
                          // maxLength={15}
                          placeholder="Please type Youtube Link"
                          onChange={onYoutubeLink}

                        />
                      </div> : ""}
                  </div>

                  <div className="flex items-center space-x-4">
                    {category ?

                      <div className="w-1/3 px-4">
                        <label
                          htmlFor="scheme_name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Caption/Subject
                          <span className="text-red-500 "> * </span>
                        </label>
                        <input
                          id="Caption/Subject"
                          name="Caption/Subject"
                          type="text"
                          autoComplete="off"
                          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                          placeholder="Please type Caption/Subject"
                          onChange={onCaption}
                        />
                      </div> : ""}
                    {category === "Or" ?

                      <div className="w-1/3 px-4">
                        <label
                          htmlFor="scheme_name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Order Number
                          <span className="text-red-500 "> * </span>
                        </label>
                        <input
                          id="contractor_name"
                          name="contractor_name"
                          type="text"
                          autoComplete="off"
                          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                          onChange={onOrderNumber}
                          placeholder="Please type Order Number"
                        />
                      </div> : ""}
                    {category === "Or" ?
                      <div className="w-1/3 px-4">
                        <label
                          htmlFor="scheme_name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Order Date
                          <span className="text-red-500 "> * </span>
                        </label>
                        <DatePicker
                          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                          dateFormat="dd/MM/yyyy"
                          selectsStart
                          minDate={orderdate}
                          selected={orderdate}
                          onChange={(date) => setOrderDate(date)}
                          placeholderText="dd-mm-yyyy"

                        />
                      </div> : ""}
                  </div>
                </div>

                <div className="flex flex-col w-full mb-4">
                  {category === "Ot" || category === "U" || category === "Or" ?

                    <div className="px-4">
                      <label
                        htmlFor="scheme_name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        File upload
                        <span className="text-red-500 "> * </span>
                      </label>
                      <input
                        id="scheme_name"
                        name="scheme_name"
                        type="file"
                        accept="application/pdf"
                        autoComplete="off"
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        onChange={onFile}

                      />
                    </div> : ""}
                </div>

                <div className="flex justify-center items-center">
                  <button
                    type="button"
                    className="w-1/5 py-2 px-4 border mt-10 border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={onSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default UserManual;
