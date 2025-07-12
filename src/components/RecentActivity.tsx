
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const RecentActivity = () => {
  const activities = [
    {
      action: "New answer posted",
      target: "on \"JWT Authentication in React\"",
      time: "5 minutes ago"
    },
    {
      action: "Question upvoted",
      target: "\"State Management Best Practices\"",
      time: "15 minutes ago"
    },
    {
      action: "New user joined",
      target: "Welcome to StackIt!",
      time: "1 hour ago"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Recent Activity</h3>
      </CardHeader>
      <CardContent className="space-y-3">
        {activities.map((activity, index) => (
          <div key={index} className="text-sm">
            <div className="font-medium">{activity.action}</div>
            <div className="text-gray-500">{activity.target}</div>
            <div className="text-xs text-gray-400">{activity.time}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
