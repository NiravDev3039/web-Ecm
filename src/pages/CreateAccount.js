import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CreateAccount = () => {
  const [userDetails, setUserDetails] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate successful sign-up and log in
    login();
    navigate('/login'); // After sign-up, navigate to the login page
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Create Your Account</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email Address</label>
          <input
            type="email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-purple-200 focus:outline-none"
            value={userDetails.email}
            onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            type="password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-purple-200 focus:outline-none"
            value={userDetails.password}
            onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 text-white font-medium bg-purple-600 rounded-lg hover:bg-purple-700 focus:ring focus:ring-purple-300"
        >
          Sign Up
        </button>
      </form>

      <div className="mt-6 text-center text-gray-600">
        <p>
          Already have an account?{' '}
          <a href="/login" className="text-purple-600 font-medium hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default CreateAccount;
