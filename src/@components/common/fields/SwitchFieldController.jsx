import React from 'react'
import { Controller } from 'react-hook-form'


const SwitchFieldController = ({ name, control, label, placeholder, type = "text", required }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <div className='min-w-[290px] max-w-[300px] flex flex-col'>
                    <div class="inline-flex items-center">
                        <div class="relative inline-block w-8 h-4 rounded-full cursor-pointer">
                            <input id={name} type="checkbox"
                                {...field}
                                class="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-gray-900 peer-checked:border-gray-900 peer-checked:before:bg-gray-900" />
                            <label htmlFor={name}
                                class="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-gray-900 peer-checked:before:bg-gray-900">
                                <div class="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                                    data-ripple-dark="true"></div>
                            </label>
                        </div>
                        <label htmlFor={name} class="mt-px mb-0 ml-3 font-light text-gray-700 cursor-pointer select-none">
                            {label ?? name}{required && <span className='text-danger'>*</span>}
                        </label>
                    </div>
                    {fieldState?.error ? <span className='text-danger italic'>{fieldState?.error?.message}</span> : <div className='my-3'></div>}
                </div>
            )}
        />
    )
}

export default SwitchFieldController
// <div className='min-w-[290px] max-w-[300px] flex flex-col'>
//     <label className="block font-medium text-black dark:text-white">
//         {label ?? name} {required && <span className='text-danger'>*</span>}
//     </label>
//     <input
//         {...field}
//         type={type}
//         color="blue"
//         placeholder={placeholder ?? label}
//         className={`w-full rounded-lg border border-stroke bg-transparent pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${fieldState?.error && "border-danger focus:border-danger"}`}
//         style={{ borderRadius: '10px', backgroundColor: 'transparent', padding: '8px 9px' }} // Adjust the padding to set the heightoutline: 'none',
//     />
//     {fieldState?.error ? <span className='text-danger italic'>{fieldState?.error?.message}</span> : <div className='my-3'></div>}
// </div>