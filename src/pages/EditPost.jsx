import React, { useState, useEffect } from 'react';

const EditPost = ({ post, onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);

  // Pre-fill the form with existing content
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);
    }
  }, [post]);

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
  };

  return (
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-md flex items-center justify-center z-[200] p-4">
      <div className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white">Edit Your Story</h2>
            <button type="button" onClick={onCancel} className="text-gray-400 hover:text-red-500 text-2xl">×</button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-blue-600 mb-2 uppercase tracking-widest">Cover Image</label>
              <div className="relative h-40 w-full rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-700 border-2 border-dashed border-gray-200 dark:border-gray-600">
                {image ? (
                  <img src={image} className="w-full h-full object-cover" alt="Preview" />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                )}
                <input 
                  type="file" 
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer" 
                />
              </div>
              <p className="text-[10px] text-gray-400 mt-2 text-center">Click image to replace</p>
            </div>

            <input
              type="text"
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-700 dark:text-white border-none focus:ring-2 focus:ring-blue-500 outline-none font-bold text-lg"
              placeholder="Post Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <textarea
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-700 dark:text-white border-none focus:ring-2 focus:ring-blue-500 outline-none min-h-[200px] resize-none"
              placeholder="Write your content here..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              type="submit" 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black shadow-lg shadow-blue-600/30 transition-all active:scale-95"
            >
              Update Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;