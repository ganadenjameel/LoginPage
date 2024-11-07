import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Ensure Link is imported
import './SignUp.css'; // Make sure the CSS is imported

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    isRobotChecked: false,  // Initial value for checkbox state
  });

  const [errors, setErrors] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    robot: '',
    form: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;

    if (type === 'checkbox') {
      // Handle checkbox change separately
      setFormData((prevData) => ({
        ...prevData,
        [id]: checked, // Update checkbox state based on checked value
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value, // Handle other input types
      }));
    }
  };

  // Validate the form
  const validateForm = () => {
    let isValid = true;
    let validationErrors = {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      robot: '',
      form: '',
    };

    // Email validation
    if (!formData.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      validationErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    // Username validation
    if (formData.username.length <= 4) {
      validationErrors.username = 'Username must be more than 4 characters.';
      isValid = false;
    }

    // Password validation
    if (formData.password.length <= 5 || !/\d/.test(formData.password)) {
      validationErrors.password = 'Password must be at least 6 characters and contain a number.';
      isValid = false;
    }

    // Confirm password validation
    if (formData.confirmPassword !== formData.password) {
      validationErrors.confirmPassword = 'Passwords do not match.';
      isValid = false;
    }

    // Checkbox validation
    if (!formData.isRobotChecked) {
      validationErrors.robot = 'Please confirm you are not a robot.';
      isValid = false;
    }

    // If any validation failed
    if (!isValid) {
      validationErrors.form = '*Please check the fields above';
    } else {
      openModal();
    }

    setErrors(validationErrors);
    return isValid;
  };

  // Open the success modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close the success modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      // Simulate successful registration and show modal
    }
  };

  return (
    <div className="signup-container">
      <Link to="/login" className="back-button">
        &#8592; Back
      </Link>
      <h1>Sign Up</h1>

      <input
        type="email"
        id="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleInputChange}
      />
      {errors.email && <span className="error">{errors.email}</span>}

      <input
        type="text"
        id="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleInputChange}
      />
      {errors.username && <span className="error">{errors.username}</span>}

      <input
        type="password"
        id="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleInputChange}
      />
      {errors.password && <span className="error">{errors.password}</span>}

      <input
        type="password"
        id="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleInputChange}
      />
      {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}

      <div className="checkbox-container">
        <input
          type="checkbox"
          id="isRobotChecked"
          checked={formData.isRobotChecked}  // Properly link checkbox value
          onChange={handleInputChange}
        />
        <label htmlFor="isRobotChecked">I’m not a robot</label>
      </div>
      {errors.robot && <span className="error">{errors.robot}</span>}

      <button type="button" onClick={handleSubmit}>
        Sign Up
      </button>

      {errors.form && <span className="error">{errors.form}</span>}

      {/* Success Modal */}
      {isModalOpen && (
        <div className="modal">
          <h2>Account successfully created!</h2>
          <button onClick={() => window.location.href = '/'}>Return to Login</button>
        </div>
      )}
    </div>
  );
};

export default SignUp;
