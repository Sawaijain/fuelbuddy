// src/pages/Feed.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { likePost, addComment } from '../redux/slices/postSlice';
import image from "../assets/first.png"

const Feed: React.FC = () => {
  const posts = useSelector((state: RootState) => state.posts);
  const user: any = useSelector((state: RootState) => state.auth.user);
  const [commentContent, setCommentContent] = useState('');
  const [activePostId, setActivePostId] = useState<number | null>(null);
  const dispatch = useDispatch();

  const handleLike = (postId: number) => {
    dispatch(likePost(postId));
  };

  const handleComment = (postId: number) => {
    if (!commentContent) return;

    dispatch(addComment({
      postId,
      comment: commentContent,
    }));

    setCommentContent('');
    setActivePostId(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-6">Feed</h2>
      <div className="w-full md:w-2/3 lg:w-1/2">
        {posts.map((post) => (
          <div key={post.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
            {/* Post Content */}
            <div className="mb-2">
              <strong>User {post.userId}:</strong> {post.title}
            </div>
            <div className="mb-4">
              {post.content}
            </div>

            {/* Post Image */}
            {post.image && (
              <div className="mb-4">
                <img src={image} alt="Post image" className="w-full h-auto rounded-lg" />
              </div>
            )}

            {/* Like and Comment Buttons */}
            <div className="flex items-center space-x-4">
              <button
                className="text-blue-500 hover:underline"
                onClick={() => handleLike(post.id)}
              >
                Like ({post.likes})
              </button>
              <button
                className="text-blue-500 hover:underline"
                onClick={() => setActivePostId(post.id)}
              >
                Comment
              </button>
            </div>

            {/* Comment Section */}
            {activePostId === post.id && (
              <div className="mt-2">
                <input
                  className="w-full p-2 border rounded-lg"
                  type="text"
                  placeholder="Add a comment..."
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                />
                <button
                  className="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                  onClick={() => handleComment(post.id)}
                >
                  Submit
                </button>
              </div>
            )}

            {/* Display Comments */}
            <div className="mt-4">
              <strong>Comments:</strong>
              <ul>
                {post.comments.map((comment, index) => (
                  <li key={index} className="ml-4 mt-1">
                    {user?.name || 'Anonymous'}: {comment}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
