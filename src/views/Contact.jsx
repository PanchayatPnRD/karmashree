import { useState, useEffect } from "react";
import { TextInput } from "../components/TextInput";

const Contact = () => {
  const [validated, setValidated] = useState();

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
      <TextInput
        required
        helperText={"This field is required"}
        label="Required field"
        validation={[validated, setValidated]}
      />
      <TextInput
        label="Not Required field"
        validation={[validated, setValidated]}
      />
    </div>
  );
};

export default Contact;
