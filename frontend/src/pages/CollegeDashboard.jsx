import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import StatsCard from '../components/StatsCard';
import ConfirmModal from '../components/ConfirmModal';
import hackathonService from '../services/hackathonService';

const CollegeDashboard = () => {
  const [hackathons, setHackathons] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null, name: '' });
  const navigate = useNavigate();

  useEffect(() => {
    loadHackathons();
  }, []);

  const loadHackathons = async () => {
    try {
      const [hackathonsData, statsData] = await Promise.all([
        hackathonService.getCollegeHackathons(),
        hackathonService.getCollegeStats()
      ]);
      setHackathons(hackathonsData);
      setStats(statsData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (hackathonId, hackathonName) => {
    setDeleteModal({ isOpen: true, id: hackathonId, name: hackathonName });
  };

  const confirmDelete = async () => {
    try {
      await hackathonService.deleteHackathon(deleteModal.id);
      toast.success('Hackathon deleted successfully');
      loadHackathons();
      setDeleteModal({ isOpen: false, id: null, name: '' });
    } catch (error) {
      toast.error('Failed to delete: ' + (error.response?.data?.detail || error.message));
      setDeleteModal({ isOpen: false, id: null, name: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900 mb-2">
            College Dashboard — Your Hackathons
          </h1>
          <p className="text-gray-600">Manage and track your hackathon events</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Loading your hackathons...</p>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <StatsCard
                  title="Total Hackathons"
                  value={stats.total_hackathons}
                  icon="🏆"
                  color="purple"
                />
                <StatsCard
                  title="Total Students Registered"
                  value={stats.total_students_registered}
                  icon="👥"
                  color="blue"
                />
              </div>
            )}

            {/* Hackathons Grid */}
            {hackathons.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hackathons.map((hackathon) => (
                  <div key={hackathon.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    {/* Banner Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={`http://127.0.0.1:8000${hackathon.hackathon_image_url}`}
                        alt={hackathon.hackathon_name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=Hackathon';
                        }}
                      />
                      {/* Status Badge */}
                      <div className="absolute top-3 right-3">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold shadow-md ${hackathon.status === 'UPCOMING' ? 'bg-blue-500 text-white' :
                          hackathon.status === 'ONGOING' ? 'bg-green-500 text-white' :
                            'bg-gray-500 text-white'
                          }`}>
                          {hackathon.status}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5">
                      {/* Hackathon Name */}
                      <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                        {hackathon.hackathon_name}
                      </h3>

                      {/* Dates */}
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <span className="mr-2">📅</span>
                        <span className="font-medium">{hackathon.start_date}</span>
                        <span className="mx-1">→</span>
                        <span className="font-medium">{hackathon.end_date}</span>
                      </div>

                      {/* Location */}
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <span className="mr-2">📍</span>
                        <span>{hackathon.location || 'Online'}</span>
                      </div>

                      {/* Max Participants */}
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <span className="mr-2">👤</span>
                        <span>Max: {hackathon.max_participants} participants</span>
                      </div>

                      {/* Registered Students - Highlighted */}
                      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3 mb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="text-lg mr-2">👥</span>
                            <span className="text-sm font-medium text-gray-700">Registered</span>
                          </div>
                          <span className="text-xl font-bold text-blue-600">
                            {hackathon.total_registered_students}
                          </span>
                        </div>
                        <div className="mt-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all duration-300"
                            style={{
                              width: `${Math.min((hackathon.total_registered_students / hackathon.max_participants) * 100, 100)}%`
                            }}
                          ></div>
                        </div>
                      </div>

                      {/* Payment QR Preview */}
                      {hackathon.payment_qr_url && (
                        <div className="mb-4 flex items-center justify-between bg-gray-50 rounded-lg p-3">
                          <span className="text-sm font-medium text-gray-700">Payment QR</span>
                          <img
                            src={`http://127.0.0.1:8000${hackathon.payment_qr_url}`}
                            alt="Payment QR"
                            className="w-12 h-12 object-contain rounded border border-gray-200"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="space-y-2">
                        <Link
                          to={`/college/hackathons/${hackathon.id}/participants`}
                          className="block w-full text-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
                        >
                          👁️ View Registered Students
                        </Link>
                        <button
                          onClick={() => handleDelete(hackathon.id, hackathon.hackathon_name)}
                          className="w-full px-4 py-2 bg-white border-2 border-red-500 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-all duration-200"
                        >
                          🗑️ Delete Hackathon
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="text-6xl mb-4">💡</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    No Hackathons Yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    You haven't created any hackathons yet. Click below to create your first event and start engaging with students!
                  </p>
                  <button
                    onClick={() => navigate('/college/create-hackathon')}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-900 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-blue-950 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    ➕ Create New Hackathon
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Floating Action Button */}
      {hackathons.length > 0 && (
        <button
          onClick={() => navigate('/college/create-hackathon')}
          className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-900 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-200 flex items-center justify-center text-2xl z-50"
          title="Create New Hackathon"
        >
          ➕
        </button>
      )}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })}
        onConfirm={confirmDelete}
        title="Delete Hackathon"
        message={`Are you sure you want to delete "${deleteModal.name}"? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
};

export default CollegeDashboard;
