
import React, { useState } from 'react';
import { ArrowLeft, ArrowUp, ArrowDown, MessageSquare, Tag, Clock, CheckCircle, Share, Bookmark, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const QuestionDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [newAnswer, setNewAnswer] = useState('');

  // Mock question data - in real app, this would be fetched based on ID
  const question = {
    id: 1,
    title: "How to implement JWT authentication in React?",
    description: "I'm trying to set up JWT authentication in my React application but I'm getting confused about where to store the token and how to handle refresh tokens. I've looked at various tutorials but they all seem to have different approaches.\n\nHere's what I've tried so far:\n\n1. Storing the token in localStorage\n2. Using cookies for token storage\n3. Implementing refresh token logic\n\nBut I'm still facing issues with token expiration and security concerns. What's the best practice for handling JWT authentication in a React application?",
    author: "Alice Johnson",
    authorAvatar: "AJ",
    votes: 15,
    answers: 3,
    views: 234,
    tags: ["React", "JWT", "Authentication"],
    createdAt: "2 hours ago",
    hasAcceptedAnswer: true
  };

  const answers = [
    {
      id: 1,
      content: "For JWT authentication in React, I recommend using a combination of httpOnly cookies for the refresh token and memory storage for the access token. Here's why:\n\n**Access Token (Memory Storage):**\n- Store in a variable or React state\n- Automatically cleared when the browser is closed\n- More secure against XSS attacks\n\n**Refresh Token (httpOnly Cookie):**\n- Cannot be accessed by JavaScript\n- Automatically sent with requests\n- More secure for long-term storage\n\n```javascript\n// Example implementation\nconst useAuth = () => {\n  const [accessToken, setAccessToken] = useState(null);\n  \n  const refreshToken = async () => {\n    try {\n      const response = await fetch('/api/refresh', {\n        method: 'POST',\n        credentials: 'include'\n      });\n      const data = await response.json();\n      setAccessToken(data.accessToken);\n    } catch (error) {\n      // Handle refresh failure\n    }\n  };\n};\n```",
      author: "John Developer",
      authorAvatar: "JD",
      votes: 12,
      createdAt: "1 hour ago",
      isAccepted: true
    },
    {
      id: 2,
      content: "Another approach is to use a library like `@auth0/auth0-react` or `firebase/auth` which handles most of the complexity for you. But if you want to implement it yourself, make sure to:\n\n1. **Validate tokens on the server side**\n2. **Use short-lived access tokens (15-30 minutes)**\n3. **Implement proper error handling for expired tokens**\n4. **Use HTTPS in production**\n\nHere's a simple token refresh interceptor:\n\n```javascript\naxios.interceptors.response.use(\n  (response) => response,\n  async (error) => {\n    if (error.response?.status === 401) {\n      await refreshToken();\n      return axios.request(error.config);\n    }\n    return Promise.reject(error);\n  }\n);\n```",
      author: "Sarah Smith",
      authorAvatar: "SS",
      votes: 8,
      createdAt: "45 minutes ago",
      isAccepted: false
    }
  ];

  const handleVote = (type: 'question' | 'answer', id: number, voteType: 'up' | 'down') => {
    console.log(`Voting ${voteType} on ${type} ${id}`);
    toast({
      title: "Vote recorded",
      description: `Your ${voteType}vote has been recorded.`,
    });
  };

  const handleSubmitAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnswer.trim()) return;
    
    toast({
      title: "Answer posted",
      description: "Your answer has been posted successfully!",
    });
    setNewAnswer('');
  };

  const handleAcceptAnswer = (answerId: number) => {
    toast({
      title: "Answer accepted",
      description: "This answer has been marked as accepted.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/questions')}
                className="flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Questions
              </Button>
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  StackIt
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Bookmark className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Question Section */}
        <section className="mb-8">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <div className="flex gap-4">
                {/* Vote Section */}
                <div className="flex flex-col items-center space-y-2 min-w-[60px]">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="p-2 h-10 w-10"
                    onClick={() => handleVote('question', question.id, 'up')}
                  >
                    <ArrowUp className="w-5 h-5" />
                  </Button>
                  <span className="font-semibold text-xl text-gray-700">{question.votes}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="p-2 h-10 w-10"
                    onClick={() => handleVote('question', question.id, 'down')}
                  >
                    <ArrowDown className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2 h-10 w-10">
                    <Bookmark className="w-5 h-5" />
                  </Button>
                </div>

                {/* Question Content */}
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                    {question.title}
                    {question.hasAcceptedAnswer && (
                      <CheckCircle className="inline-block w-6 h-6 text-green-500 ml-3" />
                    )}
                  </h1>
                  
                  <div className="prose max-w-none mb-6">
                    {question.description.split('\n').map((paragraph, index) => (
                      <p key={index} className="text-gray-700 mb-3 whitespace-pre-wrap">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {question.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-sm">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Separator className="mb-4" />
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    {question.answers} answers
                  </div>
                  <div>{question.views} views</div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">asked</span>
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      {question.authorAvatar}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-gray-900">{question.author}</span>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {question.createdAt}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Answers Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {answers.length} Answer{answers.length !== 1 ? 's' : ''}
            </h2>
            <div className="text-sm text-gray-500">
              Sorted by votes
            </div>
          </div>
          
          <div className="space-y-6">
            {answers.map((answer, index) => (
              <Card key={answer.id} className={`${answer.isAccepted ? 'border-green-200 bg-green-50' : ''}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-600">Answer #{index + 1}</span>
                      {answer.isAccepted && (
                        <Badge className="bg-green-500 text-white">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Accepted
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    {/* Vote Section */}
                    <div className="flex flex-col items-center space-y-2 min-w-[60px]">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="p-2 h-10 w-10"
                        onClick={() => handleVote('answer', answer.id, 'up')}
                      >
                        <ArrowUp className="w-5 h-5" />
                      </Button>
                      <span className="font-semibold text-lg text-gray-700">{answer.votes}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="p-2 h-10 w-10"
                        onClick={() => handleVote('answer', answer.id, 'down')}
                      >
                        <ArrowDown className="w-5 h-5" />
                      </Button>
                      {!answer.isAccepted && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="p-2 h-10 w-10 text-gray-400 hover:text-green-600"
                          onClick={() => handleAcceptAnswer(answer.id)}
                          title="Accept this answer"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </Button>
                      )}
                    </div>

                    {/* Answer Content */}
                    <div className="flex-1">
                      <div className="prose max-w-none mb-4">
                        {answer.content.split('\n').map((paragraph, index) => (
                          <p key={index} className="text-gray-700 mb-3 whitespace-pre-wrap">
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      <Separator className="mb-4" />
                      <div className="flex items-center justify-end text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-600">answered</span>
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs bg-gradient-to-r from-green-500 to-blue-500 text-white">
                              {answer.authorAvatar}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-gray-900">{answer.author}</span>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {answer.createdAt}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Add Answer Section */}
        <section>
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Your Answer
              </h3>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitAnswer}>
                <Textarea
                  placeholder="Write your answer here. Be specific and helpful! You can use markdown formatting."
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  rows={6}
                  className="mb-4"
                />
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    Make sure to follow community guidelines and provide helpful, accurate information.
                  </p>
                  <Button 
                    type="submit" 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={!newAnswer.trim()}
                  >
                    Post Answer
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default QuestionDetail;
