
import React, { useState } from "react";
const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to backend
    console.log(formData);
  };
  return (
    <div>
      <div className="mx-auto mt-2">
        <div className="flex w-full space-x-4">
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Department
            </label>
            <select
              id="country"
              name="country"
              required
              value={formData.country}
              // onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            >
              <option value="" selected hidden>
                Select a area
              </option>
              <option value="rural">Rural</option>
              <option value="urban">Urban</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              District
            </label>
            <select
              id="country"
              name="country"
              required
              value={formData.country}
              // onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            >
              <option value="" selected hidden>
                Select a district
              </option>
              <option value="rural">dd</option>
              <option value="urban">dd1</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Sub-Division
            </label>
            <select
              id="country"
              name="country"
              required
              value={formData.country}
              // onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            >
              <option value="" selected hidden>
                Select a sub-division
              </option>
              <option value="rural">Rural</option>
              <option value="urban">Urban</option>
            </select>
          </div>
        </div>
        <div className="flex w-full space-x-4">
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Block
            </label>
            <select
              id="country"
              name="country"
              required
              value={formData.country}
              // onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            >
              <option value="" selected hidden>
                Select a block
              </option>
              <option value="rural">Rural</option>
              <option value="urban">Urban</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              GP
            </label>
            <select
              id="country"
              name="country"
              required
              value={formData.country}
              // onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            >
              <option value="" selected hidden>
                Select a gp
              </option>
              <option value="rural">Rural</option>
              <option value="urban">Urban</option>
            </select>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              User Id
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={formData.username}
              onChange={handleChange}
              placeholder="type your User Id"
              className="mt-1 p-2 block w-1/3 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="type your Password"
              className="mt-1 p-2 block w-1/3 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Office Name
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={formData.username}
              onChange={handleChange}
              placeholder="type your office name"
              className="mt-1 p-2 block w-1/3 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Nodal Officer Name
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={formData.username}
              onChange={handleChange}
              placeholder="type your Nodal officer name"
              className="mt-1 p-2 block w-1/3 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Contact NUmber
            </label>
            <input
              id="username"
              name="username"
              type="number"
              autoComplete="username"
              required
              value={formData.username}
              onChange={handleChange}
              placeholder="type your Contact number"
              className="mt-1 p-2 block w-1/3 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="username"
              name="username"
              type="email"
              autoComplete="username"
              required
              value={formData.username}
              onChange={handleChange}
              placeholder="type your email id"
              className="mt-1 p-2 block w-1/3 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Designation
            </label>
            <select
              id="country"
              name="country"
              required
              value={formData.country}
              onChange={handleChange}
              className="mt-1 p-2 block w-1/3 border border-gray-300 rounded-md"
            >
              <option value="" selected hidden>
                Select a Designation
              </option>
              <option value="rural">Rural</option>
              <option value="urban">Urban</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              User Address
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={formData.username}
              onChange={handleChange}
              placeholder="type your User address"
              className="mt-1 p-2 block w-1/3 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              id="country"
              name="country"
              required
              value={formData.country}
              onChange={handleChange}
              className="mt-1 p-2 block w-1/3 border border-gray-300 rounded-md"
            >
              <option value="" selected hidden>
                Select a role
              </option>
              <option value="rural">Rural</option>
              <option value="urban">Urban</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="w-1/3 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
