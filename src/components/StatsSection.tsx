
import React from 'react';

interface StatsSectionProps {
  stats: {
    totalQuestions: number;
    totalAnswers: number;
    totalUsers: number;
    questionsToday: number;
  };
}

const StatsSection = ({ stats }: StatsSectionProps) => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <div className="text-3xl font-bold text-blue-600 mb-2">{stats.totalQuestions.toLocaleString()}</div>
            <div className="text-gray-600">Questions</div>
          </div>
          <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
            <div className="text-3xl font-bold text-green-600 mb-2">{stats.totalAnswers.toLocaleString()}</div>
            <div className="text-gray-600">Answers</div>
          </div>
          <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
            <div className="text-3xl font-bold text-purple-600 mb-2">{stats.totalUsers.toLocaleString()}</div>
            <div className="text-gray-600">Users</div>
          </div>
          <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
            <div className="text-3xl font-bold text-orange-600 mb-2">{stats.questionsToday}</div>
            <div className="text-gray-600">Questions Today</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
