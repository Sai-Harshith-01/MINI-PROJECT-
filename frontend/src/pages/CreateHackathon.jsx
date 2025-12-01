import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import hackathonService from '../services/hackathonService';

const CreateHackathon = () => {
 const navigate = useNavigate();
 const [formData, setFormData] = useState({
  hackathon_name: '',
  description: '',
  max_participants: '',
  start_date: '',
  end_date: '',
 });
 const [hackathonImage, setHackathonImage] = useState(null);
 const [paymentQrImage, setPaymentQrImage] = useState(null);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState('');

 const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
 };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!hackathonImage || !paymentQrImage) {
   setError('Please upload both images');
   return;
  }

  setError('');
  setLoading(true);

  try {
   const data = new FormData();
   data.append('hackathon_name', formData.hackathon_name);
   data.append('description', formData.description);
   data.append('max_participants', formData.max_participants);
   data.append('start_date', formData.start_date);
   data.append('end_date', formData.end_date);
   data.append('hackathon_image', hackathonImage);
   data.append('payment_qr_image', paymentQrImage);

   await hackathonService.createHackathon(data);
   alert('Hackathon created successfully!');
   navigate('/college/dashboard');
  } catch (err) {
   setError(err.response?.data?.detail || 'Failed to create hackathon');
  } finally {
   setLoading(false);
  }
 };

 return (
  <div className="min-h-screen">
   <Navbar />

   <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 className="text-3xl font-bold text-gray-800 mb-8">➕ Create New Hackathon</h1>

    {error && (
     <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
      {error}
     </div>
    )}

    <form onSubmit={handleSubmit} className="card">
     <div className="space-y-6">
      {/* Hackathon Name */}
      <div>
       <label className="block text-gray-700 font-semibold mb-2">Hackathon Name</label>
       <input
        type="text"
        name="hackathon_name"
        value={formData.hackathon_name}
        onChange={handleChange}
        className="input-field"
        placeholder="AI Innovation Challenge 2025"
        required
       />
      </div>

      {/* Description */}
      <div>
       <label className="block text-gray-700 font-semibold mb-2">Description</label>
       <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="input-field resize-none"
        placeholder="Describe your hackathon..."
        rows="4"
        required
       />
      </div>

      {/* Max Participants */}
      <div>
       <label className="block text-gray-700 font-semibold mb-2">Maximum Participants</label>
       <input
        type="number"
        name="max_participants"
        value={formData.max_participants}
        onChange={handleChange}
        className="input-field"
        placeholder="100"
        min="1"
        required
       />
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4">
       <div>
        <label className="block text-gray-700 font-semibold mb-2">Start Date</label>
        <input
         type="date"
         name="start_date"
         value={formData.start_date}
         onChange={handleChange}
         className="input-field"
         required
        />
       </div>
       <div>
        <label className="block text-gray-700 font-semibold mb-2">End Date</label>
        <input
         type="date"
         name="end_date"
         value={formData.end_date}
         onChange={handleChange}
         className="input-field"
         required
        />
       </div>
      </div>

      {/* Hackathon Banner Image */}
      <div>
       <label className="block text-gray-700 font-semibold mb-2">Hackathon Banner Image</label>
       <input
        type="file"
        accept="image/*"
        onChange={(e) => setHackathonImage(e.target.files[0])}
        className="input-field"
        required
       />
      </div>

      {/* Payment QR Image */}
      <div>
       <label className="block text-gray-700 font-semibold mb-2">Payment QR Code Image</label>
       <input
        type="file"
        accept="image/*"
        onChange={(e) => setPaymentQrImage(e.target.files[0])}
        className="input-field"
        required
       />
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
       <button
        type="submit"
        disabled={loading}
        className="btn-primary flex-1"
       >
        {loading ? 'Creating...' : 'Create Hackathon'}
       </button>
       <button
        type="button"
        onClick={() => navigate('/college/dashboard')}
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

export default CreateHackathon;
