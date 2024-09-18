// src/pages/Login.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate, clearError } from '../redux/slices/authSlice';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error } = useSelector((state: RootState) => state.auth);

  const handleSendOtp = () => {
    // Mock sending OTP
    setIsOtpSent(true);
    dispatch(clearError());
  };

  const handleLogin = () => {
    dispatch(authenticate({ phone, otp }));
  };

  useEffect(() => {
    if (user) {
      navigate('/feed');
    }
  }, [user, navigate]);

  return (
    <div>
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {error && (
          <div className="mb-4 text-red-500 text-center">
            {error}
          </div>
        )}
        {!isOtpSent ? (
          <div>
            <input
              className="w-full p-3 mb-4 border rounded-lg"
              type="text"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button
              onClick={handleSendOtp}
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
            >
              Send OTP
            </button>
          </div>
        ) : (
          <div>
            <input
              className="w-full p-3 mb-4 border rounded-lg"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              onClick={handleLogin}
              className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Login;
