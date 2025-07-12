
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import QuestionCard from './QuestionCard';

interface Question {
  id: number;
  title: string;
  description: string;
  author: string;
  authorAvatar: string;
  votes: number;
  answers: number;
  views: number;
  tags: string[];
  createdAt: string;
  hasAcceptedAnswer: boolean;
}

interface QuestionsListProps {
  questions: Question[];
}

const QuestionsList = ({ questions }: QuestionsListProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Recent Questions</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">Newest</Button>
          <Button variant="outline" size="sm">Most Voted</Button>
          <Button variant="outline" size="sm">Unanswered</Button>
        </div>
      </div>

      <div className="space-y-4">
        {questions.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <Button 
          onClick={() => navigate('/questions')}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          View All Questions
        </Button>
      </div>
    </div>
  );
};

export default QuestionsList;
