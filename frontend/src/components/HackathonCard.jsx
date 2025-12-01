import { useState } from 'react';
import { hackathonService } from '../services/hackathonService';

const HackathonCard = ({ hackathon, onRegister }) => {
 const [loading, setLoading] = useState(false);

 const handleRegister = async () => {
  setLoading(true);
  try {
   const response = await hackathonService.registerForHackathon(hackathon.id);
   alert(`Registration Successful!\n\nYour Unique Code: ${response.unique_code}\n\nPlease save this code for verification.`);
   if (onRegister) onRegister();
  } catch (error) {
   alert('Registration failed: ' + (error.response?.data?.detail || error.message));
  } finally {
   setLoading(false);
  }
 };

 return (
  <div className="card">
   {/* Hackathon Banner */}
   <div className="mb-4 rounded-lg overflow-hidden">
    <img
     src={`http://127.0.0.1:8000/${hackathon.hackathon_image_url}`}
     alt={hackathon.hackathon_name}
     className="w-full h-48 object-cover"
    />
   </div>

   {/* Hackathon Name */}
   <h3 className="text-xl font-bold text-gray-800 mb-2">
    {hackathon.hackathon_name}
   </h3>

   {/* Description */}
   <p className="text-gray-600 mb-4 line-clamp-2">
    {hackathon.description}
   </p>

   {/* Dates */}
   <div className="flex items-center text-sm text-gray-600 mb-2">
    <span className="font-semibold mr-2">📅</span>
    <span>{hackathon.start_date} to {hackathon.end_date}</span>
   </div>

   {/* Remaining Slots */}
   <div className="flex items-center text-sm mb-4">
    <span className="font-semibold mr-2">👥</span>
    <span className={hackathon.remaining_slots > 0 ? 'text-green-600' : 'text-red-600'}>
     {hackathon.remaining_slots} slots remaining
    </span>
   </div>

   {/* Status Badge */}
   <div className="mb-4">
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${hackathon.status === 'UPCOMING' ? 'bg-blue-100 text-blue-700' :
      hackathon.status === 'ONGOING' ? 'bg-green-100 text-green-700' :
       'bg-gray-100 text-gray-700'
     }`}>
     {hackathon.status}
    </span>
   </div>

   {/* Register Button */}
   {hackathon.remaining_slots > 0 && (
    <button
     onClick={handleRegister}
     disabled={loading}
     className="btn-primary w-full"
    >
     {loading ? 'Registering...' : '🎯 Register Now'}
    </button>
   )}

   {hackathon.remaining_slots === 0 && (
    <button disabled className="btn-secondary w-full opacity-50 cursor-not-allowed">
     Hackathon Full
    </button>
   )}
  </div>
 );
};

export default HackathonCard;
