import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { logout } = useAuthStore();
  const { darkMode, toggleDarkMode } = useThemeStore();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      <aside className="w-64 bg-strava dark:bg-gray-800 text-white p-4">
        <h1 className="text-2xl mb-6">Strava Clone</h1>
        <nav>
          <ul>
            <li><Link to="/" className="block py-2 hover:bg-orange-700 dark:hover:bg-gray-700">Dashboard</Link></li>
            <li><Link to="/activities" className="block py-2 hover:bg-orange-700 dark:hover:bg-gray-700">Activities</Link></li>
            <li><Link to="/training-plans" className="block py-2 hover:bg-orange-700 dark:hover:bg-gray-700">Training Plans</Link></li>
            <li><Link to="/profile" className="block py-2 hover:bg-orange-700 dark:hover:bg-gray-700">Profile</Link></li>
            <li><button onClick={logout} className="block py-2 hover:bg-orange-700 dark:hover:bg-gray-700 w-full text-left">Logout</button></li>
            <li><button onClick={toggleDarkMode} className="block py-2 hover:bg-orange-700 dark:hover:bg-gray-700 w-full text-left">Toggle Dark Mode</button></li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-6 overflow-auto bg-white dark:bg-gray-900 text-black dark:text-white">
        {children}
      </main>
    </div>
  );
};

export default Layout;