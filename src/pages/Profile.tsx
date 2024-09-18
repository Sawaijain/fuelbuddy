// src/pages/Profile.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { logout } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const posts = useSelector((state: RootState) =>
    state.posts.filter((post) => post.userId === user?.id)
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="p-4 bg-gray-50 min-h-screen w-screen">
      <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{user.name}'s Profile</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        <img
          src={user.profilePicture}
          alt={`${user.name}'s profile`}
          className="w-24 h-24 rounded-full mb-4"
        />
        <p className="text-gray-700 mb-6">Phone: {user.phone}</p>
        <p className="text-gray-700 mb-6">Bio: {user.bio}</p>
        <h3 className="text-xl font-semibold mb-4">Your Posts</h3>
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-gray-100 p-4 rounded-lg">
              <h4 className="text-lg font-bold mb-2">{post.title}</h4>
              <p className="text-gray-700">{post.content}</p>
              <p className="text-sm text-gray-500 mt-2">Likes: {post.likes}</p>
              <div className="mt-2">
                <h5 className="text-sm font-semibold">Comments:</h5>
                <ul className="list-disc list-inside">
                  {post.comments.map((comment, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      {comment}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
