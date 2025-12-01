import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';

const Login = () => {
 const navigate = useNavigate();
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState('');

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
   const { role } = await authService.login(email, password);

   // Redirect based on role
   if (role === 'STUDENT') navigate('/student/dashboard');
   else if (role === 'COLLEGE') navigate('/college/dashboard');
   else if (role === 'ADMIN') navigate('/admin/dashboard');
  } catch (err) {
   setError(err.response?.data?.detail || 'Login failed. Please check your credentials.');
  } finally {
   setLoading(false);
  }
 };

 return (
  <div className="min-h-screen flex items-center justify-center px-4">
   <div className="card max-w-md w-full">
    <div className="text-center mb-8">
     <h1 className="text-4xl font-bold text-gray-800 mb-2">TechOrbit</h1>
     <p className="text-gray-600">Welcome back! Please login to your account.</p>
    </div>

    {error && (
     <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
      {error}
     </div>
    )}

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

     <div>
      <label className="block text-gray-700 font-semibold mb-2">Password</label>
      <input
       type="password"
       value={password}
       onChange={(e) => setPassword(e.target.value)}
       className="input-field"
       placeholder="Enter your password"
       required
      />
     </div>

     <button
      type="submit"
      disabled={loading}
      className="btn-primary w-full"
     >
      {loading ? 'Logging in...' : 'Login'}
     </button>
    </form>

    <div className="mt-6 text-center">
     <p className="text-gray-600">
      Don't have an account?{' '}
      <Link to="/register" className="text-primary-500 font-semibold hover:text-primary-700">
       Register here
      </Link>
     </p>
    </div>
   </div>
  </div>
 );
};

export default Login;
