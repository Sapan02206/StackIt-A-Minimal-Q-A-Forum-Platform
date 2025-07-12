
import React, { useState } from 'react';
import { Search, Plus, Bell, User, X, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AuthForms from './AuthForms';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Header = ({ searchQuery, setSearchQuery }: HeaderProps) => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      message: "Your question about JWT authentication received a new answer",
      time: "5 minutes ago",
      read: false
    },
    {
      id: 2,
      message: "Someone upvoted your answer on React state management",
      time: "1 hour ago",
      read: false
    },
    {
      id: 3,
      message: "New comment on your database schema question",
      time: "2 hours ago",
      read: true
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleViewAllNotifications = () => {
    setShowNotifications(false);
    navigate('/notifications');
  };

  const handleUserMenuClick = () => {
    if (isAuthenticated) {
      setShowUserMenu(!showUserMenu);
    } else {
      setShowAuthDialog(true);
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              StackIt
            </span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search questions, answers, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-2 w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/ask-question')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Ask Question
            </Button>
            
            {/* Notifications */}
            <div className="relative">
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative"
                onClick={handleNotificationClick}
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>
              
              {/* Notifications Dropdown */}
              {showNotifications && (
                <Card className="absolute right-0 top-12 w-80 shadow-lg z-50 bg-white">
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between p-4 border-b">
                      <h3 className="font-semibold">Notifications</h3>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setShowNotifications(false)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id}
                          className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${
                            !notification.read ? 'bg-blue-50' : ''
                          }`}
                        >
                          <p className="text-sm text-gray-800">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 text-center">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-blue-600"
                        onClick={handleViewAllNotifications}
                      >
                        View all notifications
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              {isAuthenticated ? (
                <>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={handleUserMenuClick}
                    className="flex items-center gap-2"
                  >
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs bg-blue-100 text-blue-600">
                        {user?.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline">{user?.name}</span>
                  </Button>
                  
                  {/* User Dropdown */}
                  {showUserMenu && (
                    <Card className="absolute right-0 top-12 w-48 shadow-lg z-50 bg-white">
                      <CardContent className="p-2">
                        <div className="space-y-2">
                          <div className="px-3 py-2 border-b">
                            <p className="font-semibold text-sm">{user?.name}</p>
                            <p className="text-xs text-gray-500">{user?.email}</p>
                            <p className="text-xs text-blue-600">Reputation: {user?.reputation}</p>
                          </div>
                          <Button 
                            variant="ghost" 
                            className="w-full justify-start"
                            onClick={() => {
                              setShowUserMenu(false);
                              navigate('/profile');
                            }}
                          >
                            <User className="w-4 h-4 mr-2" />
                            Profile
                          </Button>
                          <Button 
                            variant="ghost" 
                            className="w-full justify-start"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <Settings className="w-4 h-4 mr-2" />
                            Settings
                          </Button>
                          <hr className="my-2" />
                          <Button 
                            variant="ghost" 
                            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={handleLogout}
                          >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </>
              ) : (
                <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <User className="w-5 h-5 mr-2" />
                      Login
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="sr-only">Authentication</DialogTitle>
                    </DialogHeader>
                    <AuthForms onClose={() => setShowAuthDialog(false)} />
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
