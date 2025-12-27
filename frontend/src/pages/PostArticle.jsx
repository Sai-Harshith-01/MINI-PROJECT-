import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import articleService from '../services/articleService';

const PostArticle = () => {
 const navigate = useNavigate();
 const [title, setTitle] = useState('');
 const [content, setContent] = useState('');
 const [image, setImage] = useState(null);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState('');

 const MAX_CONTENT_LENGTH = 500;
 const remainingChars = MAX_CONTENT_LENGTH - content.length;

 const handleImageChange = (e) => {
  if (e.target.files && e.target.files[0]) {
   setImage(e.target.files[0]);
  }
 };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (content.length > MAX_CONTENT_LENGTH) {
   setError(`Content exceeds ${MAX_CONTENT_LENGTH} characters`);
   return;
  }

  if (!image) {
   setError('Please select an image');
   return;
  }

  setError('');
  setLoading(true);

  try {
   const formData = new FormData();
   formData.append('title', title);
   formData.append('content', content);
   formData.append('image', image);

   await articleService.postArticle(formData);
   toast.success('Article posted successfully!');
   navigate('/student/dashboard');
  } catch (err) {
   const errorMsg = err.response?.data?.detail || 'Failed to post article';
   setError(errorMsg);
   toast.error(errorMsg);
  } finally {
   setLoading(false);
  }
 };

 return (
  <div className="min-h-screen">
   <Navbar />

   <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 className="text-3xl font-bold text-gray-800 mb-8">✍️ Post New Article</h1>

    {error && (
     <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
      {error}
     </div>
    )}

    <form onSubmit={handleSubmit} className="card">
     <div className="space-y-6">
      {/* Title */}
      <div>
       <label className="block text-gray-700 font-semibold mb-2">Title</label>
       <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input-field"
        placeholder="Enter article title"
        required
       />
      </div>

      {/* Content */}
      <div>
       <label className="block text-gray-700 font-semibold mb-2">
        Content
        <span className={`ml-2 text-sm ${remainingChars < 0 ? 'text-red-500' : 'text-gray-500'}`}>
         ({remainingChars} characters remaining)
        </span>
       </label>
       <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="input-field resize-none"
        placeholder="Write your article content (max 500 characters)"
        rows="8"
        required
       />
      </div>

      {/* Image Upload */}
      <div>
       <label className="block text-gray-700 font-semibold mb-2">Image</label>
       <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="input-field"
        required
       />
       {image && (
        <p className="mt-2 text-sm text-gray-600">
         Selected: {image.name}
        </p>
       )}
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
       <button
        type="submit"
        disabled={loading || remainingChars < 0}
        className="btn-primary flex-1"
       >
        {loading ? 'Posting...' : 'Post Article'}
       </button>
       <button
        type="button"
        onClick={() => navigate('/student/dashboard')}
        className="btn-secondary flex-1"
       >
        Cancel
       </button>
      </div>
     </div>
    </form>
   </div>
  </div>
 );
};

export default PostArticle;
