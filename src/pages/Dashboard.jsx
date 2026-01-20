import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import usePosts from '../hooks/usePosts';
import CreatePost from './CreatePost'; 

const Dashboard = () => {
  const { user, logout } = useAuth(); // logout is extracted here
  const { posts, loading, error, addPost, updatePost, deletePost } = usePosts();
  
  const [selectedPost, setSelectedPost] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [viewingPost, setViewingPost] = useState(null);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const handleSave = (formData) => {
    try {
      if (selectedPost) {
        updatePost({ ...selectedPost, ...formData });
      } else {
        addPost(formData);
      }
      closeModal();
    } catch (err) {
      alert("Storage full! Please delete some posts.");
    }
  };

  const closeModal = () => {
    setIsCreateOpen(false);
    setSelectedPost(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 bg-white dark:bg-gray-800 p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-gray-900 dark:text-white">
              Blog Dashboard: <span className="text-blue-600 italic">Welcome {user?.username}</span>
            </h1>
            <p className="text-gray-500 font-medium">Managing {posts.length} articles.</p>
          </div>
          
          {/* Action Buttons Group */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCreateOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold transition-all active:scale-95"
            >
              + Create New Post
            </button>
            
            {/* LOGOUT BUTTON ADDED HERE */}
            <button 
              onClick={logout}
              className="bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 px-6 py-4 rounded-2xl font-bold hover:bg-red-100 transition-colors"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-white dark:bg-gray-800 rounded-[2rem] overflow-hidden shadow-sm flex flex-col group hover:shadow-xl transition-all">
              {post.image && <img src={post.image} className="h-52 w-full object-cover transition-transform group-hover:scale-105" alt="" />}
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-xl font-bold dark:text-white mb-3 line-clamp-2">{post.title}</h3>
                <button onClick={() => setViewingPost(post)} className="text-blue-600 text-sm font-bold mb-6 text-left hover:underline">
                  Read full story →
                </button>

                <div className="mt-auto flex justify-between items-center pt-6 border-t dark:border-gray-700">
                  <button 
                    onClick={() => { 
                      setSelectedPost(post); 
                      setIsCreateOpen(true); 
                    }} 
                    className="text-gray-600 dark:text-gray-300 font-bold hover:text-blue-600 transition-colors"
                  >
                    Edit
                  </button>
                  <button onClick={() => deletePost(post.id)} className="text-red-300 hover:text-red-500 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Modals */}
        {isCreateOpen && (
          <CreatePost 
            post={selectedPost} 
            onSave={handleSave} 
            onCancel={closeModal} 
          />
        )}
        
        {viewingPost && (
           <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150] flex items-center justify-center p-4">
             <div className="bg-white dark:bg-gray-800 w-full max-w-3xl max-h-[90vh] rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl">
                {viewingPost.image && <img src={viewingPost.image} className="h-64 w-full object-cover" alt="" />}
                <div className="p-10 overflow-y-auto">
                  <h2 className="text-3xl font-black dark:text-white mb-4">{viewingPost.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">{viewingPost.body}</p>
                  <button 
                    onClick={() => setViewingPost(null)} 
                    className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold"
                  >
                    Back to Dashboard
                  </button>
                </div>
             </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;