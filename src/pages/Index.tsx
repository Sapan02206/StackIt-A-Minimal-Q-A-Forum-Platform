
import React, { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import QuestionsList from '@/components/QuestionsList';
import Sidebar from '@/components/Sidebar';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [questions] = useState([
    {
      id: 1,
      title: "How to implement JWT authentication in React?",
      description: "I'm trying to set up JWT authentication in my React application but I'm getting confused about where to store the token and how to handle refresh tokens...",
      author: "Alice Johnson",
      authorAvatar: "AJ",
      votes: 15,
      answers: 3,
      views: 234,
      tags: ["React", "JWT", "Authentication"],
      createdAt: "2 hours ago",
      hasAcceptedAnswer: true
    },
    {
      id: 2,
      title: "Best practices for state management in large React applications",
      description: "What are the current best practices for managing state in large-scale React applications? Should I use Redux, Zustand, or Context API?",
      author: "Bob Smith",
      authorAvatar: "BS",
      votes: 23,
      answers: 7,
      views: 567,
      tags: ["React", "State Management", "Redux", "Context API"],
      createdAt: "4 hours ago",
      hasAcceptedAnswer: false
    },
    {
      id: 3,
      title: "Database schema design for e-commerce platform",
      description: "I need help designing a database schema for an e-commerce platform. What tables should I create and how should they be related?",
      author: "Carol Davis",
      authorAvatar: "CD",
      votes: 8,
      answers: 2,
      views: 123,
      tags: ["Database", "SQL", "E-commerce", "Schema Design"],
      createdAt: "6 hours ago",
      hasAcceptedAnswer: false
    }
  ]);

  const [stats] = useState({
    totalQuestions: 1247,
    totalAnswers: 3891,
    totalUsers: 589,
    questionsToday: 23
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <HeroSection />
      <StatsSection stats={stats} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <QuestionsList questions={questions} />
          <Sidebar />
        </div>
      </main>
    </div>
  );
};

export default Index;
