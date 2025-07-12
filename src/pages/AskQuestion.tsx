
import React, { useState } from 'react';
import { ArrowLeft, Plus, Tag, Bold, Italic, List, Link, Image, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const AskQuestion = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || tags.length === 0) {
      toast({
        title: "Error",
        description: "Please fill in all fields and add at least one tag.",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically save to database
    toast({
      title: "Success",
      description: "Your question has been posted successfully!",
    });
    
    navigate('/questions');
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
                onClick={() => navigate('/')}
                className="flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  StackIt
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ask a Question</h1>
          <p className="text-gray-600">Share your problem with the community and get help from experts.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <Card>
            <CardHeader>
              <CardTitle>Question Title</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Be specific and imagine you're asking a question to another person"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg"
              />
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Question Description</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Rich Text Editor Toolbar */}
              <div className="flex items-center space-x-2 p-2 border-b mb-4">
                <Button type="button" variant="ghost" size="sm">
                  <Bold className="w-4 h-4" />
                </Button>
                <Button type="button" variant="ghost" size="sm">
                  <Italic className="w-4 h-4" />
                </Button>
                <Button type="button" variant="ghost" size="sm">
                  <List className="w-4 h-4" />
                </Button>
                <Button type="button" variant="ghost" size="sm">
                  <Link className="w-4 h-4" />
                </Button>
                <Button type="button" variant="ghost" size="sm">
                  <Image className="w-4 h-4" />
                </Button>
                <div className="w-px h-6 bg-gray-300 mx-2" />
                <Button type="button" variant="ghost" size="sm">
                  <AlignLeft className="w-4 h-4" />
                </Button>
                <Button type="button" variant="ghost" size="sm">
                  <AlignCenter className="w-4 h-4" />
                </Button>
                <Button type="button" variant="ghost" size="sm">
                  <AlignRight className="w-4 h-4" />
                </Button>
              </div>
              <Textarea
                placeholder="Provide details about your problem. Include what you tried and what you expected to happen."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={8}
                className="resize-none"
              />
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add a tag (e.g., React, JavaScript, Python)"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  />
                  <Button type="button" onClick={handleAddTag} variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-red-100" onClick={() => handleRemoveTag(tag)}>
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                        <span className="ml-2 text-red-500">×</span>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => navigate('/')}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Post Question
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AskQuestion;
