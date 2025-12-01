import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';

const Register = () => {
 const navigate = useNavigate();
 const [userType, setUserType] = useState('STUDENT');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [website, setWebsite] = useState('');
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState('');
 const [success, setSuccess] = useState('');

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setSuccess('');
  setLoading(true);

  try {
   if (userType === 'STUDENT') {
    await authService.registerStudent(email, password);
    setSuccess('Student registered successfully! Please login.');
   } else {
    await authService.registerCollege(email, website, password);
    setSuccess('College registered successfully! Pending admin approval. You will be notified once approved.');
   }

   setTimeout(() => navigate('/login'), 2000);
  } catch (err) {
   setError(err.response?.data?.detail || 'Registration failed. Please try again.');
  } finally {
   setLoading(false);
  }
 };

 return (
  <div className="min-h-screen flex items-center justify-center px-4 py-8">
   <div className="card max-w-md w-full">
    <div className="text-center mb-8">
     <h1 className="text-4xl font-bold text-gray-800 mb-2">Join TechOrbit</h1>
     <p className="text-gray-600">Create your account to get started</p>
    </div>

    {error && (
     <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
      {error}
     </div>
    )}

    {success && (
     <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
      {success}
     </div>
    )}

    {/* User Type Selection */}
    <div className="flex gap-4 mb-6">
     <button
      type="button"
      onClick={() => setUserType('STUDENT')}
      className={`flex-1 py-3 rounded-lg font-semibold transition-all ${userType === 'STUDENT'
        ? 'bg-gradient-button text-white'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
       }`}
     >
      Student
     </button>
     <button
      type="button"
      onClick={() => setUserType('COLLEGE')}
      className={`flex-1 py-3 rounded-lg font-semibold transition-all ${userType === 'COLLEGE'
        ? 'bg-gradient-button text-white'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
       }`}
     >
      College
     </button>
    </div>

    <form onSubmit={handleSubmit} className="space-y-4">
     <div>
      <label className="block text-gray-700 font-semibold mb-2">Email</label>
      <input
       type="email"
       value={email}
       onChange={(e) => setEmail(e.target.value)}
       className="input-field"
       placeholder="Enter your email"
       required
      />
     </div>

     {userType === 'COLLEGE' && (
      <div>
       <label className="block text-gray-700 font-semibold mb-2">Website</label>
       <input
        type="url"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="input-field"
        placeholder="https://www.college.edu"
        required
       />
      </div>
     )}

     <div>
      <label className="block text-gray-700 font-semibold mb-2">Password</label>
      <input
       type="password"
       value={password}
       onChange={(e) => setPassword(e.target.value)}
       className="input-field"
       placeholder="Enter your password (min 6 characters)"
       minLength={6}
       required
      />
     </div>

     <button
      type="submit"
      disabled={loading}
      className="btn-primary w-full"
     >
      {loading ? 'Registering...' : 'Register'}
     </button>
    </form>

    <div className="mt-6 text-center">
     <p className="text-gray-600">
      Already have an account?{' '}
      <Link to="/login" className="text-primary-500 font-semibold hover:text-primary-700">
       Login here
      </Link>
     </p>
    </div>
   </div>
  </div>
 );
};

export default Register;
