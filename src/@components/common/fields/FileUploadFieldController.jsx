import React from 'react';
import { Controller } from 'react-hook-form';
import * as Yup from 'yup';

const FileUploadController = ({ name, control, label, placeholder, required, fullWidth = false, className = "" }) => {
    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = (error) => reject(error);
        });
    };

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
                        type="file"
                        onChange={async (event) => {
                            const file = event.target.files[0];
                            const base64String = await fileToBase64(file);
                            field.onChange(base64String);
                        }}
                        className={`w-full rounded-lg border border-stroke bg-transparent pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${fieldState?.error && "border-danger focus:border-danger"}`}
                        style={{ borderRadius: '10px', backgroundColor: 'transparent', padding: '8px 9px' }} // Adjust the padding to set the heightoutline: 'none',
                    />
                    {fieldState?.error?.message && <span className='text-danger italic'>{fieldState?.error?.message}</span>}
                </div>
            )}
            rules={{
                validate: async (value) => {
                    if (!value) {
                        return Promise.reject('File is required');
                    }
                    const schema = Yup.mixed().required('File is required');
                    try {
                        await schema.validate(value.file);
                        return true;
                    } catch (error) {
                        return Promise.reject(error.message);
                    }
                },
            }}
        />
    );
};

export default FileUploadController;
