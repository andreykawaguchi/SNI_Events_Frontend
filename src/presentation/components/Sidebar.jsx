import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faUser, faCalendar, faHome, faCog } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../shared/contexts/AuthContext.jsx';

export default function Sidebar() {
  const { logout, user } = useAuth();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const location = useLocation();

  const isSettingsActive = 
    settingsOpen ||
    location.pathname.startsWith('/users') ||
    location.pathname.startsWith('/events');

  return (
    <aside className="app-sidebar">
      <div className="sidebar-header">
        <h3>SNI Events</h3>
        <p className="sidebar-user">{user?.name || user?.email}</p>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/home"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          <FontAwesomeIcon icon={faHome} className="w-4 h-4" />
          <span>Home</span>
        </NavLink>

        <div style={{ marginBottom: '0.5rem' }}>
          <button
            onClick={() => setSettingsOpen((s) => !s)}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              marginBottom: '0.5rem',
              color: '#cbd5e1',
              textDecoration: 'none',
              borderRadius: '0.5rem',
              fontSize: '0.95rem',
              transition: 'all 150ms ease',
              cursor: 'pointer',
              border: 'none',
              background: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              justifyContent: 'space-between',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(15, 23, 42, 0.5)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            className={isSettingsActive ? 'active' : ''}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <FontAwesomeIcon icon={faCog} className="w-4 h-4" />
              <span>Configurações</span>
            </span>
            <FontAwesomeIcon 
              icon={settingsOpen ? faChevronUp : faChevronDown}
              className="h-4 w-4"
              style={{ transform: settingsOpen ? 'rotate(180deg)' : 'none', transition: 'transform 150ms ease' }}
            />
          </button>

          {settingsOpen && (
            <div style={{ paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <NavLink
                to="/users"
                className={({ isActive }) => isActive ? 'active' : ''}
                style={{ paddingLeft: '2.5rem' }}
              >
                <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                <span>Usuários</span>
              </NavLink>

              <NavLink
                to="/events"
                className={({ isActive }) => isActive ? 'active' : ''}
                style={{ paddingLeft: '2.5rem' }}
              >
                <FontAwesomeIcon icon={faCalendar} className="w-4 h-4" />
                <span>Eventos</span>
              </NavLink>
            </div>
          )}
        </div>
      </nav>

      <div className="sidebar-footer">
        <button onClick={logout} className="btn-logout">
          Sair
        </button>
      </div>
    </aside>
  );
}
