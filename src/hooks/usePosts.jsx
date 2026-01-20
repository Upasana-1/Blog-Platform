import { useState, useEffect } from 'react';

const usePosts = () => {
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('blog_posts');
    return saved ? JSON.parse(saved) : [];
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // DEFINE the function first
  const addPost = (newPostData) => {
    const newPost = {
      id: Date.now(), // Generate unique ID
      ...newPostData,
      createdAt: new Date().toISOString()
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  const updatePost = (updatedPost) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  };

  const deletePost = (id) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  // SAVE to localStorage whenever posts change
  useEffect(() => {
    localStorage.setItem('blog_posts', JSON.stringify(posts));
  }, [posts]);

  //  RETURN them at the end
  return { 
    posts, 
    loading, 
    error, 
    addPost,    
    updatePost, 
    deletePost 
  };
};

export default usePosts;