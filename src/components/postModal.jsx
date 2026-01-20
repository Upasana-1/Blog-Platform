const PostModal = ({ post, onClose, onSave }) => {
  const [formData, setFormData] = useState(
    post || { title: '', body: '' }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-lg border dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6">{post ? 'Edit Post' : 'New Article'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 font-medium">Post Title</label>
            <input 
              className="w-full border dark:border-gray-600 dark:bg-gray-700 rounded p-2 outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1 font-medium">Content</label>
            <textarea 
              rows="5"
              className="w-full border dark:border-gray-600 dark:bg-gray-700 rounded p-2 outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.body}
              onChange={(e) => setFormData({...formData, body: e.target.value})}
              required
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-500 hover:text-gray-700">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
    
  );
};



export default PostModal; 