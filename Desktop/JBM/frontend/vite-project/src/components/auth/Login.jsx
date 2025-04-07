import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Link } from 'react-router-dom'; // For navigation
import { Label } from '../ui/label'; // Custom Label component
import { Input } from '../ui/input'; // Custom Input component
import { RadioGroup } from '../ui/radio-group'; // Custom RadioGroup component
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react'; // Assuming you're using this for the spinner icon

const Login = () => {
  // State to handle form inputs and loading state
  const [input, setInput] = useState({
    email: '',
    password: '',
    role: 'student', // Default role
  });
  const [loading, setLoading] = useState(false);

  // Event handler for input changes
  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Form submission handler
  const submitHandler = (e) => {
    e.preventDefault(); // Prevent the default form submission

    setLoading(true);

    // Add your login logic here (e.g., API call to verify credentials)
    setTimeout(() => {
      console.log('Form submitted with:', input);
      // Here you would typically handle success/failure logic, such as redirecting, showing error messages, etc.
      setLoading(false);
    }, 2000); // Simulating an API request for 2 seconds
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form onSubmit={submitHandler} className="w-full md:w-1/2 border border-gray-200 rounded-md p-4 my-10">
          <h1 className="font-bold text-xl mb-5">Login</h1>

          {/* Email input */}
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="patel@gmail.com"
              required
            />
          </div>

          {/* Password input */}
          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="********"
              required
            />
          </div>

          {/* Role selection */}
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Submit button or loading state */}
          {loading ? (
            <Button className="w-full my-4" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Login
            </Button>
          )}

          {/* Signup link */}
          <span className="text-sm">
            Don't have an account? <Link to="/signup" className="text-blue-600">Signup</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
