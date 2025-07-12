
import React, { useState } from 'react';
import { Search, Plus, ArrowUp, ArrowDown, MessageSquare, Tag, Clock, CheckCircle, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';

const Questions = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
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

  const handleVote = (questionId: number, voteType: 'up' | 'down') => {
    console.log(`Voting ${voteType} on question ${questionId}`);
    // Here you would update the vote count
  };

  const filteredQuestions = questions.filter(question =>
    question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    question.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  StackIt
                </span>
              </div>
            </div>

            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search questions, answers, tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 py-2 w-full"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button onClick={() => navigate('/ask-question')} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Ask Question
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">All Questions</h1>
          <div className="flex space-x-2">
            <Button 
              variant={sortBy === 'newest' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSortBy('newest')}
            >
              Newest
            </Button>
            <Button 
              variant={sortBy === 'votes' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSortBy('votes')}
            >
              Most Voted
            </Button>
            <Button 
              variant={sortBy === 'unanswered' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSortBy('unanswered')}
            >
              Unanswered
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredQuestions.map((question) => (
            <Card 
              key={question.id} 
              className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-blue-500 cursor-pointer"
              onClick={() => navigate(`/question/${question.id}`)}
            >
              <CardContent className="p-6">
                <div className="flex gap-4">
                  {/* Vote Section */}
                  <div className="flex flex-col items-center space-y-1 min-w-[60px]">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="p-1 h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVote(question.id, 'up');
                      }}
                    >
                      <ArrowUp className="w-4 h-4" />
                    </Button>
                    <span className="font-semibold text-lg text-gray-700">{question.votes}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="p-1 h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVote(question.id, 'down');
                      }}
                    >
                      <ArrowDown className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Question Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 leading-tight">
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
                        <Badge 
                          key={tag} 
                          variant="secondary" 
                          className="text-xs hover:bg-blue-100 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSearchQuery(tag);
                          }}
                        >
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
          ))}
        </div>
      </main>
    </div>
  );
};

export default Questions;
