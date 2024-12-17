import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { LogOut, FileText, User as UserIcon, Home } from 'lucide-react';
import { userAtom } from '../store/auth';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center px-2 py-2 text-gray-700 hover:text-gray-900">
                <Home className="h-5 w-5 mr-1" />
                <span>Home</span>
              </Link>
              {user && (
                <>
                  <Link to="/summaries" className="flex items-center px-2 py-2 text-gray-700 hover:text-gray-900 ml-8">
                    <FileText className="h-5 w-5 mr-1" />
                    <span>Summaries</span>
                  </Link>
                </>
              )}
            </div>
            <div className="flex items-center">
              {user ? (
                <>
                  <Link to="/profile" className="flex items-center px-2 py-2 text-gray-700 hover:text-gray-900">
                    <UserIcon className="h-5 w-5 mr-1" />
                    <span>{user.firstName}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="ml-4 flex items-center px-2 py-2 text-gray-700 hover:text-gray-900"
                  >
                    <LogOut className="h-5 w-5 mr-1" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link to="/login" className="text-gray-700 hover:text-gray-900">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  );
}