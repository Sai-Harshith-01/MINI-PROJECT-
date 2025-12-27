import { useState } from 'react';
import toast from 'react-hot-toast';
import { articleService } from '../services/articleService';

const ArticleCard = ({ article }) => {
 const [showCommentBox, setShowCommentBox] = useState(false);
 const [comment, setComment] = useState('');
 const [loading, setLoading] = useState(false);

 const handleAddComment = async () => {
  if (!comment.trim()) return;

  setLoading(true);
  try {
   await articleService.addComment(article.id, comment);
   toast.success('Comment added successfully!');
   setComment('');
   setShowCommentBox(false);
  } catch (error) {
   toast.error('Failed to add comment: ' + (error.response?.data?.detail || error.message));
  } finally {
   setLoading(false);
  }
 };

 return (
  <div className="card">
   {/* Article Image */}
   <div className="mb-4 rounded-lg overflow-hidden">
    <img
     src={`http://127.0.0.1:8000/${article.image_url}`}
     alt={article.title}
     className="w-full h-48 object-cover"
    />
   </div>

   {/* Title */}
   <h3 className="text-xl font-bold text-gray-800 mb-2">
    {article.title}
   </h3>

   {/* Content */}
   <p className="text-gray-600 mb-4">
    {article.content}
   </p>

   {/* Author */}
   <div className="flex items-center justify-between mb-4">
    <span className="text-sm text-gray-500">
     By: {article.student_email}
    </span>
    <span className="text-sm text-gray-500">
     {new Date(article.created_at).toLocaleDateString()}
    </span>
   </div>

   {/* Comment Button */}
   <button
    onClick={() => setShowCommentBox(!showCommentBox)}
    className="btn-secondary w-full"
   >
    💬 Comment
   </button>

   {/* Comment Box */}
   {showCommentBox && (
    <div className="mt-4">
     <textarea
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      placeholder="Write your comment..."
      className="input-field resize-none"
      rows="3"
     />
     <button
      onClick={handleAddComment}
      disabled={loading}
      className="btn-primary w-full mt-2"
     >
      {loading ? 'Posting...' : 'Post Comment'}
     </button>
    </div>
   )}
  </div>
 );
};

export default ArticleCard;
