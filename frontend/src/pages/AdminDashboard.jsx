import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import StatsCard from '../components/StatsCard';
import adminService from '../services/adminService';

const AdminDashboard = () => {
 const [stats, setStats] = useState(null);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  fetchStats();
 }, []);

 const fetchStats = async () => {
  try {
   const data = await adminService.getOverviewStats();
   setStats(data);
  } catch (error) {
   console.error('Failed to fetch stats:', error);
  } finally {
   setLoading(false);
  }
 };

 return (
  <div className="min-h-screen">
   <Navbar />

   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="flex justify-between items-center mb-8">
     <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
     <Link to="/admin/approve-colleges" className="btn-primary">
      👑 Approve Colleges
     </Link>
    </div>

    {loading ? (
     <div className="text-center py-12">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      <p className="mt-4 text-gray-600">Loading statistics...</p>
     </div>
    ) : stats ? (
     <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
       <StatsCard
        title="Total Students"
        value={stats.total_students}
        icon="👨‍🎓"
        color="blue"
       />
       <StatsCard
        title="Total Colleges"
        value={stats.total_colleges}
        icon="🏫"
        color="green"
       />
       <StatsCard
        title="Total Hackathons"
        value={stats.total_hackathons}
        icon="🏆"
        color="purple"
       />
       <StatsCard
        title="Total Registrations"
        value={stats.total_registrations}
        icon="📝"
        color="orange"
       />
      </div>

      {/* Statistics Table */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
       <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-transparent">
        Admin Dashboard — Platform Statistics
       </h2>

       {/* Desktop Table View */}
       <div className="hidden md:block overflow-hidden rounded-xl border border-gray-200">
        <table className="w-full">
         <thead className="bg-blue-50">
          <tr>
           <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Metric</th>
           <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Value</th>
           <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Status</th>
          </tr>
         </thead>
         <tbody className="divide-y divide-gray-200">
          <tr className="hover:bg-blue-50 transition-colors duration-150 h-[50px]">
           <td className="px-6 py-3 text-sm font-medium text-gray-800">Total Students</td>
           <td className="px-6 py-3 text-sm text-gray-600 font-semibold">{stats.total_students}</td>
           <td className="px-6 py-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600">
             SUCCESS
            </span>
           </td>
          </tr>
          <tr className="hover:bg-blue-50 transition-colors duration-150 h-[50px]">
           <td className="px-6 py-3 text-sm font-medium text-gray-800">Total Colleges</td>
           <td className="px-6 py-3 text-sm text-gray-600 font-semibold">{stats.total_colleges}</td>
           <td className="px-6 py-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
             INFO
            </span>
           </td>
          </tr>
          <tr className="hover:bg-blue-50 transition-colors duration-150 h-[50px]">
           <td className="px-6 py-3 text-sm font-medium text-gray-800">Approved Colleges</td>
           <td className="px-6 py-3 text-sm text-gray-600 font-semibold">{stats.approved_colleges}</td>
           <td className="px-6 py-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600">
             SUCCESS
            </span>
           </td>
          </tr>
          <tr className="hover:bg-blue-50 transition-colors duration-150 h-[50px]">
           <td className="px-6 py-3 text-sm font-medium text-gray-800">Pending Colleges</td>
           <td className="px-6 py-3 text-sm text-gray-600 font-semibold">{stats.pending_colleges}</td>
           <td className="px-6 py-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-600">
             WARNING
            </span>
           </td>
          </tr>
          <tr className="hover:bg-blue-50 transition-colors duration-150 h-[50px]">
           <td className="px-6 py-3 text-sm font-medium text-gray-800">Total Hackathons</td>
           <td className="px-6 py-3 text-sm text-gray-600 font-semibold">{stats.total_hackathons}</td>
           <td className="px-6 py-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
             INFO
            </span>
           </td>
          </tr>
          <tr className="hover:bg-blue-50 transition-colors duration-150 h-[50px]">
           <td className="px-6 py-3 text-sm font-medium text-gray-800">Total Registrations</td>
           <td className="px-6 py-3 text-sm text-gray-600 font-semibold">{stats.total_registrations}</td>
           <td className="px-6 py-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600">
             SUCCESS
            </span>
           </td>
          </tr>
         </tbody>
        </table>
       </div>

       {/* Mobile Card View */}
       <div className="md:hidden space-y-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
         <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-800">Total Students</span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600">
           SUCCESS
          </span>
         </div>
         <p className="text-2xl font-bold text-gray-900">{stats.total_students}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
         <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-800">Total Colleges</span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
           INFO
          </span>
         </div>
         <p className="text-2xl font-bold text-gray-900">{stats.total_colleges}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
         <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-800">Approved Colleges</span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600">
           SUCCESS
          </span>
         </div>
         <p className="text-2xl font-bold text-gray-900">{stats.approved_colleges}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
         <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-800">Pending Colleges</span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-600">
           WARNING
          </span>
         </div>
         <p className="text-2xl font-bold text-gray-900">{stats.pending_colleges}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
         <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-800">Total Hackathons</span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
           INFO
          </span>
         </div>
         <p className="text-2xl font-bold text-gray-900">{stats.total_hackathons}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
         <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-800">Total Registrations</span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600">
           SUCCESS
          </span>
         </div>
         <p className="text-2xl font-bold text-gray-900">{stats.total_registrations}</p>
        </div>
       </div>
      </div>

      {/* Pending Colleges Alert */}
      {stats.pending_colleges > 0 && (
       <div className="card bg-yellow-50 border-2 border-yellow-200">
        <div className="flex items-center justify-between">
         <div className="flex items-center">
          <span className="text-3xl mr-4">⚠️</span>
          <div>
           <h3 className="font-bold text-gray-800">Pending College Approvals</h3>
           <p className="text-gray-600">
            {stats.pending_colleges} college{stats.pending_colleges > 1 ? 's' : ''} waiting for approval
           </p>
          </div>
         </div>
         <Link to="/admin/approve-colleges" className="btn-primary">
          Review Now
         </Link>
        </div>
       </div>
      )}
     </>
    ) : (
     <div className="text-center py-12 text-gray-500">
      Failed to load statistics
     </div>
    )}
   </div>
  </div>
 );
};

export default AdminDashboard;
