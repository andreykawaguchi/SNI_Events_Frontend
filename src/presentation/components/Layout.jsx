import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  const location = useLocation();
  // hide sidebar on login page
  const hideSidebar = location.pathname === '/login';

  if (hideSidebar) return <div className="app-content">{children}</div>;

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="app-content">{children}</main>
    </div>
  );
}
