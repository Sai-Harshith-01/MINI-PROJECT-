import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HackathonCard from '../components/HackathonCard';
import hackathonService from '../services/hackathonService';

const Hackathons = () => {
 const [hackathons, setHackathons] = useState([]);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  fetchHackathons();
 }, []);

 const fetchHackathons = async () => {
  try {
   const data = await hackathonService.getAllHackathons();
   setHackathons(data);
  } catch (error) {
   console.error('Failed to fetch hackathons:', error);
  } finally {
   setLoading(false);
  }
 };

 return (
  <div className="min-h-screen">
   <Navbar />

   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 className="text-3xl font-bold text-gray-800 mb-8">🏆 Available Hackathons</h1>

    {loading ? (
     <div className="text-center py-12">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      <p className="mt-4 text-gray-600">Loading hackathons...</p>
     </div>
    ) : (
     <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
       {hackathons.map((hackathon) => (
        <HackathonCard
         key={hackathon.id}
         hackathon={hackathon}
         onRegister={fetchHackathons}
        />
       ))}
      </div>

      {hackathons.length === 0 && (
       <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No hackathons available at the moment.</p>
        <p className="text-gray-400 mt-2">Check back later for exciting opportunities!</p>
       </div>
      )}
     </>
    )}
   </div>
  </div>
 );
};

export default Hackathons;
