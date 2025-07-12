
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const PopularTags = () => {
  const tags = ["React", "JavaScript", "Python", "Node.js", "Database", "CSS", "HTML", "JWT", "API", "MongoDB"];

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Popular Tags</h3>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-blue-50">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PopularTags;
