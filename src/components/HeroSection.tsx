
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to <span className="text-yellow-300">StackIt</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-blue-100">
          Ask questions, share knowledge, and build your expertise with our community
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3"
            onClick={() => navigate('/ask-question')}
          >
            <Plus className="w-5 h-5 mr-2" />
            Ask Your First Question
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3"
            onClick={() => navigate('/questions')}
          >
            Explore Questions
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
