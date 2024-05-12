import { useState, useEffect } from "react";
import { TextInput } from "../components/TextInput";

const Contact = () => {
  const [validated, setValidated] = useState();
  const [value, setValue] = useState([
    { first: "", second: "" },
    { first: "", second: "" },
  ]);

  return (
    <div className="flex-grow overflow-auto text-center p-4">
      {validated ? (
        <label className="text-white rounded-md px-2 py-1 bg-green-600">
          Can make API call
        </label>
      ) : (
        <label className="text-white rounded-md px-2 py-1 bg-red-600">
          Can't make API call
        </label>
      )}
      {Array.isArray(value) &&
        value.map((e, index) => (
          <div className="flex">
            <TextInput
              required
              dynamic
              index={index}
              name="first"
              helperText={"This field is required"}
              label="Required field"
              validation={[validated, setValidated]}
              state={[value, setValue]}
            />
            <TextInput
              dynamic
              index={index}
              name="second"
              label="Not Required field"
              validation={[validated, setValidated]}
              state={[value, setValue]}
            />
          </div>
        ))}
    </div>
  );
};

export default Contact;
