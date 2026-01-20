import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import usePosts from '../hooks/usePosts';
import CreatePost from './CreatePost'; 
import EditPost from './EditPost'; // 1. Import your new EditPost component

const Dashboard = () => {
  const { user, logout } = useAuth(); 
  const { posts, loading, error, addPost, updatePost, deletePost } = usePosts();
  
  const [selectedPost, setSelectedPost] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false); // 2. Add state for the Edit modal
  const [viewingPost, setViewingPost] = useState(null);

  const handleSave = (formData) => {
    try {
      if (selectedPost) {
        // Handle Edit Save
        updatePost({ ...selectedPost, ...formData });
      } else {
        // Handle Create Save
        addPost(formData);
      }
      closeModal();
    } catch (err) {
      alert("Storage full! Please delete some posts.");
    }
  };

  const closeModal = () => {
    setIsCreateOpen(false);
    setIsEditOpen(false); // 3. Ensure edit modal closes
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
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCreateOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold transition-all active:scale-95"
            >
              + Create New Post
            </button>
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
                      setIsEditOpen(true); // 4. Open EditPost modal instead of CreatePost
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

        {/* Create Modal */}
        {isCreateOpen && (
          <CreatePost 
            onSave={handleSave} 
            onCancel={closeModal} 
          />
        )}

        {/* 5. NEW: Edit Modal */}
        {isEditOpen && (
          <EditPost 
            post={selectedPost} 
            onSave={handleSave} 
            onCancel={closeModal} 
          />
        )}
        
        {/* Viewing Modal (Remains same) */}
        {viewingPost && (
           <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150] flex items-center justify-center p-4">
             <div className="bg-white dark:bg-gray-800 w-full max-w-3xl max-h-[90vh] rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl">
                {viewingPost.image && <img src={viewingPost.image} className="h-64 w-full object-cover" alt="" />}
                <div className="p-10 overflow-y-auto">
                  <h2 className="text-3xl font-black dark:text-white mb-4">{viewingPost.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">{viewingPost.body}</p>
                  <button onClick={() => setViewingPost(null)} className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold">Back to Dashboard</button>
                </div>
             </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;