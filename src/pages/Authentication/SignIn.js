import { Link } from 'react-router-dom';
import LogoDark from '../../assets/images/logo/logo-dark.svg';
import VVIPL from '../../assets/images/logo/VVIPL.svg';
import { useEffect, useState } from 'react';
import { AiFillEyeInvisible, AiFillEye, AiOutlineMail } from 'react-icons/ai';
import axios from 'axios';
//import useAuthentication from '../../hooks/useAuthentication';
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form';
import { useUserApi } from '../../rdxsga/hooks/actions/user/useUserApiHook';
import { toast } from 'react-toastify';
import { useUserAction } from '../../rdxsga/hooks/actions/user/useUserActionHook';
import { APP_LINK } from '../../config/urls';

const validationSchema = Yup.object({
  username: Yup.string().email('Invalid email address').required('email is required'),
  password: Yup.string().required('Password can\'t be empty'),
});


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const userApi = useUserApi()

  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // Handle form submission
  const onSubmit = (data) => {
    userApi.callLoginUser(data, (message, resp) => {
      console.log("success", resp, message)
    }, (message, resp) => {
      console.log("error", resp, message)
      toast.error(message)
    })
  };

  return (

    <div className="rounded-sm border border-stroke bg-white shadow-default w-9/12 h-5/6 dark:border-strokedark dark:bg-boxdark ">
      <div className="flex flex-wrap items-center justify-center w-full h-full">
        <div className="hidden w-full xl:block xl:w-1/2">
          <div className="py-17.5 px-26 text-center ">
            <Link className="mb-5.5 inline-block" to="http://visitoventures.com/">
              <img className="hidden dark:block" src={VVIPL} style={{ height: '40px' }} alt="Logo" />
              <img className="dark:hidden" src={LogoDark} style={{ height: '40px' }} alt="Logo" />
            </Link>
            <p className="2xl:px-20">
              Visto Ventures India Private Limited
            </p>
          </div>
        </div>
        <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <h2 className="mb-9 font-bold text-black dark:text-white sm:text-title-xl2">
              Sign in to <span className='font-extrabold text-primary '>Hospital</span>
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Email
                </label>
                <div className="relative">
                  <Controller
                    name="username"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        type="text"
                        placeholder="Enter your email"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        {...field}
                      />
                    )}
                  />
                  <span className="absolute right-4 top-4">
                    <AiOutlineMail size={20} />
                  </span>
                </div>
                {errors?.email && <span className='text-danger'>{errors?.email?.message}</span>}
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Password
                </label>
                <div className="relative">
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        {...field}
                      />
                    )}
                  />
                  {errors?.password && <span className='text-danger'>{errors?.password?.message}</span>}
                  <div
                    className="absolute top-4 right-4 cursor-pointer"
                    onClick={() => {
                      setShowPassword(d => !d)
                    }}>
                    {showPassword ? (
                      <AiFillEye size={20} />
                    ) : (
                      <AiFillEyeInvisible size={20} />
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <button
                  type="submit"
                  className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                >
                  Sign in
                </button>
                <div className="mt-6 text-center">
                  <p>
                    <b style={{ fontSize: '18px' }}> Don’t have an account?{' '}</b>
                    <Link to={APP_LINK.SIGN_UP} className="text-primary">
                      <b style={{ fontSize: '18px' }}>Sign Up</b>
                    </Link>
                  </p>
                </div>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
