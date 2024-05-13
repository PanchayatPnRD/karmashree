import { useState, useEffect } from "react";
import { TextInput } from "../components/TextInput";
import { SelectInput } from "../components/SelectInput";
import { DateInput } from "../components/DateInput";

const Contact = () => {
  const [validated, setValidated] = useState();
  const [value, setValue] = useState([
    { first: "", second: "", third: "", date:"" },
    { first: "", second: "", third: "", date:"" },
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
            <SelectInput
              required
              dynamic
              index={index}
              name="third"
              label="Not Required field"
              validation={[validated, setValidated]}
              state={[value, setValue]}
              helperText={"This field highly required"}
            >
              <option value="">select a value</option>
              <option value="first">first</option>
              <option value="second">second</option>
            </SelectInput>
            <DateInput
              required
              dynamic
              label="select date"
              index={index}
              name="date"
              validation={[validated, setValidated]}
              state={[value, setValue]}
            />
          </div>
        ))}
    </div>
  );
};

export default Contact;
