import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faUser, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../shared/contexts/AuthContext';

export default function Sidebar() {
  const { logout, user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={`app-sidebar flex flex-col bg-slate-900 text-slate-100 p-4 box-border transition-all duration-200 ${
        collapsed ? 'w-16' : 'w-56'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="font-bold text-lg">{collapsed ? 'S' : 'SNI Events'}</div>
          {!collapsed && <div className="sidebar-user text-sm opacity-90">{user?.name || user?.email}</div>}
        </div>

        <button
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="p-1 rounded hover:bg-slate-800 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transform transition-transform ${collapsed ? '' : 'rotate-180'}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <nav className="sidebar-nav flex flex-col gap-1">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `flex items-center gap-3 px-2 py-2 rounded hover:bg-slate-800 ${isActive ? 'bg-slate-800 text-white' : 'text-slate-200'}`
          }
        >
          <span className="font-semibold">{collapsed ? 'H' : 'Home'}</span>
        </NavLink>

        <div>
          {(() => {
            const isSettingsActive =
              settingsOpen ||
              location.pathname.startsWith('/users') ||
              location.pathname.startsWith('/events');

            return (
              <NavLink
                onClick={() => setSettingsOpen((s) => !s)}
                aria-expanded={settingsOpen}
                className={`flex items-center justify-between gap-3 px-2 py-2 rounded hover:bg-slate-800 ${isSettingsActive ? 'bg-slate-800 text-white' : 'text-slate-200'}`}
              >
                <span className="flex items-center gap-3">
                  <span className="font-semibold">{collapsed ? 'C' : 'Configurações'}</span>
                </span>

                {!collapsed && (
                  <FontAwesomeIcon
                    icon={settingsOpen ? faChevronUp : faChevronDown}
                    className={`h-4 w-4 transform transition-transform ${settingsOpen ? 'rotate-180' : ''}`}
                  />
                )}
              </NavLink>
            );
          })()}

          {settingsOpen && (
            <div className="flex flex-col pl-4 mt-1">
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-2 py-2 rounded hover:bg-slate-800 ${isActive ? 'bg-slate-800 text-white' : 'text-slate-200'}`
                }
              >
                <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                <span className="text-sm">{collapsed ? 'U' : 'Usuários'}</span>
              </NavLink>

              <NavLink
                to="/events"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-2 py-2 rounded hover:bg-slate-800 ${isActive ? 'bg-slate-800 text-white' : 'text-slate-200'}`
                }
              >
                <FontAwesomeIcon icon={faCalendar} className="w-4 h-4" />
                <span className="text-sm">{collapsed ? 'E' : 'Eventos'}</span>
              </NavLink>
            </div>
          )}
        </div>
      </nav>

      <div className="sidebar-footer mt-auto">
        <button onClick={logout} className="btn-logout w-full">
          {collapsed ? '\u238b' : 'Logout'}
        </button>
      </div>
    </aside>
  );
}
