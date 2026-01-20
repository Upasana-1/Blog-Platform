import React, { useState } from 'react';

const CreatePost = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
   
    onSave({ title, body, image });

    // Reset fields so they are empty for the next new post
    setTitle('');
    setBody('');
    setImage(null);
  };

  return (
    <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-md flex items-center justify-center z-[100] p-4">
      <div className="bg-white dark:bg-gray-800 w-full max-w-xl rounded-[2.5rem] shadow-2xl border border-white/20 overflow-y-auto max-h-[95vh]">
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">Create New Story</h2>
            <button type="button" onClick={onCancel} className="text-gray-400 hover:text-red-500 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          {/*Image Upload Box */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-blue-600 uppercase tracking-widest ml-1">Cover Image</label>
            <div className="relative h-48 w-full bg-blue-50 dark:bg-gray-700 rounded-3xl border-2 border-dashed border-blue-200 overflow-hidden">
              {image ? (
                <>
                  <img src={image} alt="Preview" className="w-full h-full object-cover" />
                  <button 
                    type="button" 
                    onClick={() => setImage(null)} 
                    className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md text-red-500 hover:bg-red-50"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </>
              ) : (
                <label className="flex flex-col items-center justify-center h-full cursor-pointer hover:bg-blue-100/50 transition-all">
                  <svg className="w-8 h-8 text-blue-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                  <span className="text-sm font-bold text-blue-500">Upload Image</span>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                </label>
              )}
            </div>
          </div>

          {/*Title Box */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-blue-600 uppercase tracking-widest ml-1">Title</label>
            <input
              type="text"
              required
              placeholder="Give your story a name..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-5 py-3 rounded-2xl border-2 border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/*Body Box */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-blue-600 uppercase tracking-widest ml-1">Content</label>
            <textarea
              required
              rows="5"
              placeholder="What's on your mind?"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full px-5 py-3 rounded-2xl border-2 border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none dark:bg-gray-700 dark:text-white"
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-2">
            <button 
              type="button" 
              onClick={onCancel} 
              className="flex-1 py-3 font-bold text-gray-400 hover:text-gray-600 transition-colors"
            >
              Discard
            </button>
            <button 
              type="submit" 
              className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95"
            >
              Publish Article
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;