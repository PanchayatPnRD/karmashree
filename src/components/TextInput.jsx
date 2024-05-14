import { useState, useEffect, useMemo } from "react";
import classNames from "classnames";
import { updateVal } from "../functions/updateVal";

export const TextInput = ({
  buttonClicked,
  required,
  dynamic,
  type,
  index,
  name,
  helperText,
  validation,
  state,
  label,
}) => {
  const [touched, setTouched] = useState(false);
  const [validated, setValidated] = validation;
  const [value, setValue] = state;
  const [isFilled, setIsFilled] = useState(false);
  useEffect(() => {
    if (required) {
      setValidated(!isFilled);
    }
  }, []);

  const condition = useMemo(() => {
    if (required) {
      return isFilled && touched;
    }
    if (!required) return true;
  }, [required, isFilled, touched]);

  useEffect(() => {
    if (buttonClicked) setTouched(true);
  }, [buttonClicked]);

  useEffect(() => {
    if (!condition) setValidated(condition);
  }, [condition, value, validated]);

  function handleChange(e) {
    if (name && !dynamic) {
      const new_val = { ...value };
      new_val[e.target.name] = e.target.value;
      setValue(new_val);
    } else if (dynamic) {
      const new_array = [...value];
      new_array[index][name] = e.target.value;
      setValue(new_array);
    } else setValue(e.target.value);
  }

  return (
    <>
      <div className="flex flex-col w-1/3 items-start space-y-1 p-4">
        {label && (
          <label htmlFor="" className="text-start font-medium text-zinc-700">
            {label}
          </label>
        )}
        <input
          type={type}
          name={name}
          value={name ? (dynamic ? value[index][name] : value[name]) : value}
          class={classNames(
            "border-2 block w-full p-2.5 outline-none rounded-lg border-gray-400",
            (!required || isFilled) &&
              "text-gray-900  focus:ring-blue-500 focus:border-blue-500 block ",
            !isFilled &&
              required &&
              touched &&
              "bg-red-50 border border-red-500 text-red-900 placeholder-red-700  focus:ring-red-500 focus:border-red-500 "
          )}
          onBlur={(e) => {
            setTouched(true);
            setIsFilled(e.target.value.length > 0);
            if (required) setValidated(e.target.value.length > 0);
          }}
          onChange={(e) => {
            handleChange(e);
            setIsFilled(true);
            if (required) setValidated(true);
          }}
        />
        {!isFilled && required && touched && (
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">
            {helperText || "This field is required"}
          </p>
        )}
      </div>
    </>
  );
};
