import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppProvider';

function Login() {
  // Destructure login, register, and navigate functions from context
  const { login, register, navigate } = useAppContext();

  // Track current form state: either 'login' or 'sign-up'
  const [state, setState] = useState('login');

  // Form input values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error message to display to user
  const [error, setError] = useState("");

  // Loading state to prevent double submissions
  const [loading, setLoading] = useState(false);

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior
    setError(""); // Clear previous error
    setLoading(true); // Set loading to true during request

    try {
      if (state === 'sign-up') {
        // Call register function with user data
        await register({ name, email, password });
        setState('login'); // Switch to login view after successful sign-up
      } else {
        // Call login function
        await login({ email, password });
      }
    } catch (err) {
      // Show a user-friendly error message
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-slate-950 relative overflow-hidden'>
      {/* Background glowing orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/20 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className='bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-8 rounded-2xl shadow-2xl w-full sm:w-96 text-slate-200 relative z-10'>

        {/* Logo and Title */}
        <div className='border-b border-slate-700/50 px-2 py-6 mb-6'>
          <div className='flex justify-center gap-2 items-center text-3xl font-black text-emerald-400'>
            <img src="./logo.png" className="size-12 drop-shadow-md" alt="Logo" />
            <h1>CashFlowX</h1>
          </div>
          <p className='text-sm font-medium mt-2 text-center text-slate-400'>Track Your Finances</p>
        </div>

        {/* Header */}
        <h2 className='text-3xl font-semibold text-slate-100 text-center mb-4'>
          {state === "sign-up" ? "Create account" : "Welcome back"}
        </h2>
        <p className='text-center text-sm mb-6 text-slate-400'>
          {state === "sign-up" ? "Start managing your finances" : "Login to your account"}
        </p>

        {/* Show error message */}
        {error && (
          <p className='text-red-500 text-sm text-center mb-4'>{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Name input only for sign-up */}
          {state === "sign-up" && (
            <div className='mb-4'>
              <input
                type="text"
                className="w-full p-3 bg-slate-800/50 border border-slate-700 rounded-lg shadow-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder='Full Name'
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
          )}

          {/* Email input */}
          <div className='mb-4'>
            <input
              type="email"
              className="w-full p-3 bg-slate-800/50 border border-slate-700 rounded-lg shadow-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder='Email Address'
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          {/* Password input */}
          <div className='mb-4'>
            <input
              type="password"
              className="w-full p-3 bg-slate-800/50 border border-slate-700 rounded-lg shadow-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder='Password'
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className='w-full py-3 mt-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] disabled:opacity-50 disabled:hover:shadow-[0_0_15px_rgba(37,99,235,0.3)]'
          >
            {loading ? "Please wait..." : state === "sign-up" ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* Switch between Login and Sign Up */}
        <div className='text-center mt-6'>
          {state === "sign-up" ? (
            <p className='text-sm text-slate-400'>
              Already have an account?{" "}
              <span
                className='text-blue-400 font-medium cursor-pointer hover:text-blue-300 transition-colors'
                onClick={() => setState("login")}
              >
                Login here
              </span>
            </p>
          ) : (
            <p className='text-sm text-slate-400'>
              Don't have an account?{" "}
              <span
                className='text-blue-400 font-medium cursor-pointer hover:text-blue-300 transition-colors'
                onClick={() => setState("sign-up")}
              >
                Sign Up
              </span>
            </p>
          )}
        </div>

      </div>
    </div>
  );
}

export default Login;
