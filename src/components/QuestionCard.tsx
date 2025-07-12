
import React from 'react';
import { ArrowUp, ArrowDown, MessageSquare, Tag, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';

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

interface QuestionCardProps {
  question: Question;
}

const QuestionCard = ({ question }: QuestionCardProps) => {
  const navigate = useNavigate();

  return (
    <Card 
      className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-blue-500 cursor-pointer"
      onClick={() => navigate(`/question/${question.id}`)}
    >
      <CardContent className="p-6">
        <div className="flex gap-4">
          {/* Vote Section */}
          <div className="flex flex-col items-center space-y-1 min-w-[60px]">
            <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
              <ArrowUp className="w-4 h-4" />
            </Button>
            <span className="font-semibold text-lg text-gray-700">{question.votes}</span>
            <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
              <ArrowDown className="w-4 h-4" />
            </Button>
          </div>

          {/* Question Content */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer leading-tight">
                {question.title}
                {question.hasAcceptedAnswer && (
                  <CheckCircle className="inline-block w-5 h-5 text-green-500 ml-2" />
                )}
              </h3>
            </div>
            
            <p className="text-gray-600 mb-4 line-clamp-2">{question.description}</p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {question.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs hover:bg-blue-100 cursor-pointer">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Question Meta */}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  {question.answers} answers
                </div>
                <div>{question.views} views</div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    {question.authorAvatar}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">{question.author}</span>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {question.createdAt}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
