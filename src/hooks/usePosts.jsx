import { useState, useEffect } from 'react';

const usePosts = () => {
  const [posts, setPosts] = useState(() => {
    
    const savedPosts = localStorage.getItem('blog_posts_data');
    return savedPosts ? JSON.parse(savedPosts) : [];
  });
  
  const [loading, setLoading] = useState(posts.length === 0);
  const [error, setError] = useState(null);

  // Fetch initial data ONLY if localStorage is empty
  useEffect(() => {
    const fetchPosts = async () => {
      if (posts.length > 0) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=8');
        if (!res.ok) throw new Error("Failed to load posts");
        const data = await res.json();
        
        
        const postsWithImages = data.map(post => ({
          ...post,
          image: `https://picsum.photos/seed/${post.id}/600/400`
        }));

        setPosts(postsWithImages);
        localStorage.setItem('blog_posts_data', JSON.stringify(postsWithImages));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // 2. Save to localStorage whenever the posts state changes
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem('blog_posts_data', JSON.stringify(posts));
    }
  }, [posts]);

  // CRUD Actions
  const addPost = (post) => {
    // Generate a unique ID
    const newPost = { ...post, id: Date.now() };
    setPosts(prev => [newPost, ...prev]);
  };
  
  const updatePost = (updatedPost) => {
    setPosts(prev => prev.map(p => p.id === updatedPost.id ? updatedPost : p));
  };

  const deletePost = (id) => {
    if(window.confirm("Are you sure you want to delete this post?")) {
      setPosts(prev => prev.filter(p => p.id !== id));
    }
  };

  return { posts, loading, error, addPost, updatePost, deletePost };
};

export default usePosts;