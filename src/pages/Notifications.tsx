
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Check, Trash2, MessageSquare, Heart, Award } from 'lucide-react';

const Notifications = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'answer',
      icon: MessageSquare,
      title: "New answer on your question",
      message: "Your question about JWT authentication received a new answer from Alice Johnson",
      time: "5 minutes ago",
      read: false,
      actionUrl: "/question/1"
    },
    {
      id: 2,
      type: 'vote',
      icon: Heart,
      title: "Answer upvoted",
      message: "Someone upvoted your answer on React state management",
      time: "1 hour ago",
      read: false,
      actionUrl: "/question/2"
    },
    {
      id: 3,
      type: 'comment',
      icon: MessageSquare,
      title: "New comment",
      message: "Carol Davis commented on your database schema question",
      time: "2 hours ago",
      read: true,
      actionUrl: "/question/3"
    },
    {
      id: 4,
      type: 'badge',
      icon: Award,
      title: "Badge earned!",
      message: "You earned the 'Helpful Contributor' badge for your recent activity",
      time: "1 day ago",
      read: true,
      actionUrl: "/profile"
    },
    {
      id: 5,
      type: 'answer',
      icon: MessageSquare,
      title: "Answer accepted",
      message: "Your answer was marked as accepted by Bob Smith",
      time: "2 days ago",
      read: true,
      actionUrl: "/question/2"
    }
  ]);

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
                <p className="text-gray-600 mt-1">
                  {unreadCount > 0 ? `You have ${unreadCount} unread notifications` : 'All caught up!'}
                </p>
              </div>
            </div>
            
            {unreadCount > 0 && (
              <Button onClick={markAllAsRead} variant="outline">
                <Check className="w-4 h-4 mr-2" />
                Mark all as read
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {notifications.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Bell className="w-12 h-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications</h3>
                <p className="text-gray-600 text-center">
                  When you have new notifications, they'll appear here.
                </p>
              </CardContent>
            </Card>
          ) : (
            notifications.map((notification) => {
              const IconComponent = notification.icon;
              
              return (
                <Card 
                  key={notification.id} 
                  className={`transition-all hover:shadow-md ${
                    !notification.read ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-full ${
                        notification.type === 'answer' ? 'bg-blue-100 text-blue-600' :
                        notification.type === 'vote' ? 'bg-red-100 text-red-600' :
                        notification.type === 'comment' ? 'bg-green-100 text-green-600' :
                        'bg-yellow-100 text-yellow-600'
                      }`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {notification.title}
                              {!notification.read && (
                                <Badge variant="secondary" className="ml-2 text-xs">New</Badge>
                              )}
                            </h3>
                            <p className="text-gray-600 text-sm mb-2">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500">
                              {notification.time}
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            {!notification.read && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => markAsRead(notification.id)}
                                className="text-blue-600 hover:text-blue-700"
                              >
                                <Check className="w-4 h-4" />
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => deleteNotification(notification.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
};

export default Notifications;
