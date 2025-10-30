import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Learn: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white max-w-[480px] mx-auto p-4">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-6 hover:opacity-70 transition-opacity"
        aria-label="Go back"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      <h1 className="text-2xl font-semibold mb-4">Learning Resources</h1>
      <p className="text-[#716860]">Coming soon...</p>
    </div>
  );
};

export default Learn;
