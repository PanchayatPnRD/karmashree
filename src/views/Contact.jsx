import { useState, useEffect } from "react";
import { TextInput } from "../components/TextInput";
import { SelectInput } from "../components/SelectInput";
import { DateInput } from "../components/DateInput";
import { Footer } from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Login_logo } from "../components/Logo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getLogin } from "../Service/LoginService";


// const Contact = () => {
//   const [buttonClicked, setButtonClicked] = useState(false);
//   const [validated, setValidated] = useState();
//   const [value, setValue] = useState([
//     { first: "", second: "", third: "", date: "" },
//     { first: "", second: "", third: "", date: "" },
//   ]);

//   return (
//     <div className="flex-grow overflow-auto text-center p-4">
//       {validated ? (
//         <label className="text-white rounded-md px-2 py-1 bg-green-600">
//           Can make API call
//         </label>
//       ) : (
//         <label className="text-white rounded-md px-2 py-1 bg-red-600">
//           Can't make API call
//         </label>
//       )}
//       {Array.isArray(value) &&
//         value.map((e, index) => (
//           <div className="flex">
//             <TextInput
//               buttonClicked={buttonClicked}
//               required
//               dynamic
//               index={index}
//               name="first"
//               helperText={"This field is required"}
//               label="Required field"
//               validation={[validated, setValidated]}
//               state={[value, setValue]}
//             />
//             <TextInput
//               buttonClicked={buttonClicked}
//               dynamic
//               index={index}
//               name="second"
//               label="Not Required field"
//               validation={[validated, setValidated]}
//               state={[value, setValue]}
//             />
//             <SelectInput
//               buttonClicked={buttonClicked}
//               required
//               dynamic
//               index={index}
//               name="third"
//               label="Not Required field"
//               validation={[validated, setValidated]}
//               state={[value, setValue]}
//               helperText={"This field highly required"}
//             >
//               <option value="">select a value</option>
//               <option value="first">first</option>
//               <option value="second">second</option>
//             </SelectInput>
//             <DateInput
//               buttonClicked={buttonClicked}
//               required
//               dynamic
//               label="select date"
//               index={index}
//               name="date"
//               validation={[validated, setValidated]}
//               state={[value, setValue]}
//             />
//           </div>
//         ))}
//       <div>
//         <button
//           className="px-3 text-white py-1 bg-blue-500 rounded-md hover:bg-blue-500/90"
//           onClick={() => setButtonClicked(true)}
//         >
//           submit
//         </button>
//       </div>
//     </div>
//   );
// };

const Contact = () => {

  
  return (
    <>
      <div className="rounded-sm bg-zinc-50 py-20 px-[20rem] flex-grow">
        <div className="flex items-center rounded-xl shadow-2xl bg-white p-8">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 text-center">
              <span className="mt-15 inline-block">
                <Login_logo />
              </span>
            </div>
          </div>

          <div className="w-full xl:w-1/2 ">
            <div className="w-full flex flex-col space-y-5">
              <h2 className="mb-4 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Contact Us
              </h2>
              <div>
                <h2 className="text-xl">
                  Panchayat & Rural Development (P&RD)
                </h2>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Address</h2>
                <p>
                  Joint Administrative Building, Saltlake Sec-III, Kolkata -
                  700106
                </p>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Email</h2>
                <p>support@karmashree</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Phone</h2>
                <p>xxxxxxxxxx</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer bg={"bg-zinc-50"} />
    </>
  );
};

export default Contact;
