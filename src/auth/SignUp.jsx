import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuthStore } from "../store/useAuthStore";

const SignUp = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    year: "",
    branch: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    rollno: "",
    gender: "",
  });

  const navigate = useNavigate();
  const { signup, isSigningUp } = useAuthStore();

  const [phoneError, setPhoneError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phoneNumber') {
      const cleanedValue = value.replace(/\D/g, '');
      if (cleanedValue.length <= 10) {
        setInput((prevState) => ({ ...prevState, [name]: cleanedValue }));
        
        
      }
    } else {
      setInput((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (input.password !== input.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (input.phoneNumber.length !== 10) {
      toast.error("Phone number must be exactly 10 digits!");
      return;
    }

    signup(input);
    navigate("/login");
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign Up</h2>
        <form onSubmit={submitHandler} className="flex flex-col">
          <input
            required
            name="fullname"
            placeholder="Full Name"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="text"
            value={input.fullname}
            onChange={handleInputChange}
          />
          <input
            required
            name="email"
            placeholder="Email"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="email"
            value={input.email}
            onChange={handleInputChange}
          />
          <input
            required
            name="year"
            placeholder="Year"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="text"
            value={input.year}
            onChange={handleInputChange}
          />
          <input
            required
            name="branch"
            placeholder="Branch"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="text"
            value={input.branch}
            onChange={handleInputChange}
          />
          <input
            required
            name="password"
            placeholder="Password"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="password"
            value={input.password}
            onChange={handleInputChange}
          />
          <input
            required
            name="confirmPassword"
            placeholder="Confirm Password"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="password"
            value={input.confirmPassword}
            onChange={handleInputChange}
          />
          <div className="relative mb-4">
            <input
              required
              name="phoneNumber"
              placeholder="Phone Number"
              className={`bg-gray-100 text-gray-900 border-0 rounded-md p-2 w-full focus:bg-gray-200 focus:outline-none focus:ring-1 ${
                phoneError ? 'focus:ring-red-500' : 'focus:ring-blue-500'
              } transition ease-in-out duration-150`}
              type="tel"
              pattern="[0-9]{10}"
              maxLength="10"
              value={input.phoneNumber}
              onChange={handleInputChange}
            />
            {phoneError && (
              <p className="text-red-500 text-sm mt-1">{phoneError}</p>
            )}
          </div>
          <input
            required
            name="rollno"
            placeholder="Roll No"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="number"
            value={input.rollno}
            onChange={handleInputChange}
          />
          <label
            className="text-sm mb-2 text-gray-900 cursor-pointer"
            htmlFor="gender"
          >
            Gender
          </label>
          <select
            name="gender"
            required
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            id="gender"
            value={input.gender}
            onChange={handleInputChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <p className="text-gray-900 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
          <button
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
