import { useState, useEffect } from 'react';

const useBlogStore = () => {
 
  const [blogs, setBlogs] = useState(() => {
    const saved = localStorage.getItem('local_storage_blogs');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('local_storage_blogs', JSON.stringify(blogs));
  }, [blogs]);

  const saveBlog = (newBlog) => {
    const blogWithId = { 
      ...newBlog, 
      id: Date.now(), 
      date: new Date().toLocaleDateString() 
    };
    setBlogs((prev) => [blogWithId, ...prev]);
  };

  const removeBlog = (id) => {
    setBlogs((prev) => prev.filter(blog => blog.id !== id));
  };

  return { blogs, saveBlog, removeBlog };
};

export default useBlogStore;