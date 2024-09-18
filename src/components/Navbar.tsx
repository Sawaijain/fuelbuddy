// src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Navbar: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) return null;

  return (
    <nav className="bg-blue-500 p-4">
      <div className="max-w-3xl mx-auto flex justify-between">
        <div className="flex space-x-4">
          <Link to="/feed" className="text-white hover:text-gray-200">
            Feed
          </Link>
          <Link to="/create-post" className="text-white hover:text-gray-200">
            Create Post
          </Link>
          <Link to="/profile" className="text-white hover:text-gray-200">
            Profile
          </Link>
        </div>
        <div className="text-white">
          Welcome, {user.name}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
