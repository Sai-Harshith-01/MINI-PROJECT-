import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import NotificationBell from './NotificationBell';

const Navbar = () => {
 const navigate = useNavigate();
 const role = authService.getRole();

 const handleLogout = () => {
  authService.logout();
  navigate('/login');
 };

 const getDashboardLink = () => {
  if (role === 'STUDENT') return '/student/dashboard';
  if (role === 'COLLEGE') return '/college/dashboard';
  if (role === 'ADMIN') return '/admin/dashboard';
  return '/';
 };

 return (
  <nav className="bg-gradient-button shadow-lg">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
     {/* Logo */}
     <Link to={getDashboardLink()} className="flex items-center">
      <span className="text-2xl font-bold text-white">TechOrbit</span>
     </Link>

     {/* Navigation Links */}
     <div className="flex items-center space-x-6">
      {role === 'STUDENT' && (
       <>
        <Link to="/student/dashboard" className="text-white hover:text-primary-100 transition-colors">
         Dashboard
        </Link>
        <Link to="/student/hackathons" className="text-white hover:text-primary-100 transition-colors">
         Hackathons
        </Link>
        <Link to="/student/post-article" className="text-white hover:text-primary-100 transition-colors">
         Post Article
        </Link>
       </>
      )}

      {role === 'COLLEGE' && (
       <>
        <Link to="/college/dashboard" className="text-white hover:text-primary-100 transition-colors">
         Dashboard
        </Link>
        <Link to="/college/create-hackathon" className="text-white hover:text-primary-100 transition-colors">
         Create Hackathon
        </Link>
       </>
      )}

      {role === 'ADMIN' && (
       <>
        <Link to="/admin/dashboard" className="text-white hover:text-primary-100 transition-colors">
         Dashboard
        </Link>
        <Link to="/admin/approve-colleges" className="text-white hover:text-primary-100 transition-colors">
         Approve Colleges
        </Link>
       </>
      )}

      {/* Notification Bell */}
      <NotificationBell />

      {/* Logout Button */}
      <button
       onClick={handleLogout}
       className="bg-white text-primary-500 px-4 py-2 rounded-lg font-semibold hover:bg-primary-50 transition-all"
      >
       Logout
      </button>
     </div>
    </div>
   </div>
  </nav>
 );
};

export default Navbar;
