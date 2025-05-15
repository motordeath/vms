import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full p-6">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <AlertTriangle size={80} className="text-[#a3b18a]" />
        </div>
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <h2 className="text-2xl mb-6">Page Not Found</h2>
        <p className="text-[#a3b18a] mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary">
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;