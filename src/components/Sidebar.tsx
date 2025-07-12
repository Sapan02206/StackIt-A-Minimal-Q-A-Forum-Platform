
import React from 'react';
import PopularTags from './PopularTags';
import RecentActivity from './RecentActivity';

const Sidebar = () => {
  return (
    <div className="lg:w-80 space-y-6">
      <PopularTags />
      <RecentActivity />
    </div>
  );
};

export default Sidebar;
