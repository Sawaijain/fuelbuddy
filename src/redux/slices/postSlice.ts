// src/redux/slices/postSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import initialPosts from '../../data/posts.json';

interface Post {
  id: number;
  userId: number;
  title: string;
  content: string;
  likes: number;
  image:string;
  comments: string[];
}

const initialState: Post[] = initialPosts;

interface CreatePostPayload {
  userId: number;
  title: string;
  content: string;
  image:string;
}

interface AddCommentPayload {
  postId: number;
  comment: string;
}

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    createPost: (state, action: PayloadAction<CreatePostPayload>) => {
      const newPost: Post = {
        id: state.length > 0 ? state[state.length - 1].id + 1 : 1,
        userId: action.payload.userId,
        title: action.payload.title,
        content: action.payload.content,
        image:action.payload.image,
        likes: 0,
        comments: [],
      };
      state.push(newPost);
    },
    likePost: (state, action: PayloadAction<number>) => {
      const post = state.find((p) => p.id === action.payload);
      if (post) post.likes += 1;
    },
    addComment: (state, action: PayloadAction<AddCommentPayload>) => {
      const post = state.find((p) => p.id === action.payload.postId);
      if (post) post.comments.push(action.payload.comment);
    },
  },
});

export const { createPost, likePost, addComment } = postSlice.actions;
export default postSlice.reducer;
