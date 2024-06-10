import { useState, useEffect } from "react";
import { TextInput } from "../components/TextInput";
import { SelectInput } from "../components/SelectInput";
import { DateInput } from "../components/DateInput";

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
  return <div className="flex-grow overflow-auto text-center p-4">Contact Us</div>;
};

export default Contact;
