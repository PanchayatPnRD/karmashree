import React from 'react';
import { Controller } from 'react-hook-form';

const TextAreaFieldController = ({ name, control, label, placeholder, required }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className='min-w-[290px] max-w-[300px] flex flex-col'>
          <label className="block font-medium text-black dark:text-white">
            {label ?? name} {required && <span className='text-danger'>*</span>}
          </label>
          <textarea
            {...field}
            rows={4} // You can adjust the number of rows as needed
            placeholder={placeholder ?? label}
            className={`w-full rounded-lg border border-stroke bg-transparent pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${fieldState?.error && "border-danger focus:border-danger"}`}

          />
          {fieldState?.error ? <span className='text-danger italic'>{fieldState?.error?.message}</span> : <div className='my-4'></div>}
        </div>
      )}
    />
  );
};

export default TextAreaFieldController;
