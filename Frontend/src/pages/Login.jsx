import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiGoogle } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
      return;
    }

    // Handle OAuth callback
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (token) {
      // Decode token to get user data (in production, fetch from API)
      const tokenParts = token.split('.');
      if (tokenParts.length === 3) {
        try {
          const payload = JSON.parse(atob(tokenParts[1]));
          // Fetch user data from API using token
          fetchUserData(token);
        } catch (error) {
          console.error('Token decode error:', error);
          toast.error('Login failed. Please try again.');
        }
      }
    }

    if (error) {
      toast.error('Authentication failed. Please try again.');
    }
  }, [searchParams, isAuthenticated, navigate, login]);

  const fetchUserData = async (token) => {
    try {
      localStorage.setItem('token', token);
      const response = await fetch('/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const userData = await response.json();
        login(token, userData);
        navigate('/dashboard');
      } else {
        throw new Error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Fetch user data error:', error);
      localStorage.removeItem('token');
      toast.error('Login failed. Please try again.');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = '/api/auth/google';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome to TaskManager
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to manage your tasks efficiently
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="space-y-6">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Secure Authentication
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Sign in with your Google account to get started
              </p>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="w-full flex justify-center items-center space-x-3 py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <FiGoogle className="text-red-500" size={20} />
              <span>Sign in with Google</span>
            </button>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                By signing in, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
            <div>
              <div className="font-medium">✓ Secure</div>
              <div className="text-xs">OAuth 2.0</div>
            </div>
            <div>
              <div className="font-medium">✓ Fast</div>
              <div className="text-xs">Quick Setup</div>
            </div>
            <div>
              <div className="font-medium">✓ Reliable</div>
              <div className="text-xs">Always Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;