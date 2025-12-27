import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import ConfirmModal from '../components/ConfirmModal';
import adminService from '../services/adminService';

const ApproveColleges = () => {
 const [colleges, setColleges] = useState([]);
 const [loading, setLoading] = useState(true);
 const [rejectModal, setRejectModal] = useState({ isOpen: false, collegeId: null });

 useEffect(() => {
  fetchPendingColleges();
 }, []);

 const fetchPendingColleges = async () => {
  try {
   const data = await adminService.getPendingColleges();
   setColleges(data);
  } catch (error) {
   console.error('Failed to fetch colleges:', error);
  } finally {
   setLoading(false);
  }
 };

 const handleApprove = async (collegeId) => {
  try {
   await adminService.approveCollege(collegeId);
   toast.success('College approved successfully!');
   fetchPendingColleges();
  } catch (error) {
   toast.error('Failed to approve: ' + (error.response?.data?.detail || error.message));
  }
 };

 const handleReject = (collegeId) => {
  setRejectModal({ isOpen: true, collegeId });
 };

 const confirmReject = async () => {
  try {
   await adminService.rejectCollege(rejectModal.collegeId);
   toast.success('College rejected');
   fetchPendingColleges();
  } catch (error) {
   toast.error('Failed to reject: ' + (error.response?.data?.detail || error.message));
  } finally {
   setRejectModal({ isOpen: false, collegeId: null });
  }
 };

 return (
  <div className="min-h-screen">
   <Navbar />

   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 className="text-3xl font-bold text-gray-800 mb-8">👑 Approve Colleges</h1>

    {loading ? (
     <div className="text-center py-12">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
     </div>
    ) : (
     <>
      {colleges.length === 0 ? (
       <div className="card text-center py-12">
        <p className="text-gray-500 text-lg">No pending college approvals</p>
        <p className="text-gray-400 mt-2">All colleges have been reviewed!</p>
       </div>
      ) : (
       <div className="card overflow-x-auto">
        <table className="w-full">
         <thead>
          <tr className="border-b-2 border-gray-200">
           <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
           <th className="text-left py-3 px-4 font-semibold text-gray-700">Website</th>
           <th className="text-left py-3 px-4 font-semibold text-gray-700">Registered</th>
           <th className="text-center py-3 px-4 font-semibold text-gray-700">Actions</th>
          </tr>
         </thead>
         <tbody>
          {colleges.map((college) => (
           <tr key={college.id} className="border-b border-gray-100 hover:bg-gray-50">
            <td className="py-4 px-4 text-gray-800">{college.email}</td>
            <td className="py-4 px-4">
             <a
              href={college.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 hover:text-primary-700 hover:underline"
             >
              {college.website}
             </a>
            </td>
            <td className="py-4 px-4 text-gray-600 text-sm">
             {new Date(college.created_at).toLocaleDateString()}
            </td>
            <td className="py-4 px-4">
             <div className="flex justify-center gap-2">
              <button
               onClick={() => handleApprove(college.id)}
               className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors font-semibold"
              >
               ✓ Approve
              </button>
              <button
               onClick={() => handleReject(college.id)}
               className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-semibold"
              >
               ✗ Reject
              </button>
             </div>
            </td>
           </tr>
          ))}
         </tbody>
        </table>
       </div>
      )}
     </>
    )}
    <ConfirmModal
     isOpen={rejectModal.isOpen}
     onClose={() => setRejectModal({ ...rejectModal, isOpen: false })}
     onConfirm={confirmReject}
     title="Reject College"
     message="Are you sure you want to reject this college application?"
     confirmText="Reject"
     type="danger"
    />
   </div>
  </div>
 );
};

export default ApproveColleges;
