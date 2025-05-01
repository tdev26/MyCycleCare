import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-purple-600 dark:text-purple-400 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-md font-medium shadow-sm hover:from-purple-600 hover:to-indigo-700 transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" />
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;