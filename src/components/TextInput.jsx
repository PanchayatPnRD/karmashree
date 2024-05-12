import { useState, useEffect } from "react";
import classNames from "classnames";

export const TextInput = ({
  required,
  type,
  name,
  helperText,
  validation,
  label,
}) => {
  const [validated, setValidated] = validation;

  const [isFilled, setIsFilled] = useState(true);
  useEffect(() => {
    if (required) {
      setValidated(!isFilled);
    }
  }, []);

  if (required) console.log(validated, required);

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
          class={classNames(
            "border-2 block w-full p-2.5 outline-none rounded-lg border-gray-400",
            (!required || isFilled) &&
              "text-gray-900  focus:ring-blue-500 focus:border-blue-500 block ",
            !isFilled &&
              required &&
              "bg-red-50 border border-red-500 text-red-900 placeholder-red-700  focus:ring-red-500 focus:border-red-500 "
          )}
          onBlur={(e) => {
            setIsFilled(e.target.value.length > 0);
            if (required) setValidated(e.target.value.length > 0);
          }}
          onChange={() => {
            setIsFilled(true);
            if (required) setValidated(true);
          }}
        />
        {helperText && !isFilled && required && (
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">
            {helperText}
          </p>
        )}
      </div>
    </>
  );
};
