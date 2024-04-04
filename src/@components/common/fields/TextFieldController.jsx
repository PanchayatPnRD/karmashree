import React from 'react'
import { Controller } from 'react-hook-form'


const TextFieldController = ({ name, control, label, placeholder, type = "text", required, fullWidth = false, className = "" }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <div className={`${!fullWidth && "min-w-[290px] max-w-[300px]"} flex flex-col ${className}`}>
                    <label className="block font-medium text-black dark:text-white">
                        {label ?? name} {required && <span className='text-danger'>*</span>}
                    </label>
                    <input
                        {...field}
                        type={type}
                        color="blue"
                        placeholder={placeholder ?? label}
                        className={`w-full rounded-lg border border-stroke bg-transparent pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${fieldState?.error && "border-danger focus:border-danger"}`}
                        style={{ borderRadius: '10px', backgroundColor: 'transparent', padding: '8px 9px' }} // Adjust the padding to set the heightoutline: 'none',
                    />
                    {fieldState?.error?.message && <span className='text-danger italic'>{fieldState?.error?.message}</span>}
                </div>
            )}
        />
    )
}

export default TextFieldController