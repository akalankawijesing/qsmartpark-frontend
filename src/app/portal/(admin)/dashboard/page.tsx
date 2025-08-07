'use client';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  FiHome,
  FiUsers,
  FiSettings,
  FiPieChart,
  FiLogOut,
  FiMenu,
  FiX,
  FiUser
} from 'react-icons/fi';

export default function SystemPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Navigation items
  const navItems = [
    { name: 'Dashboard', icon: <FiHome size={20} />, path: '/system' },
    { name: 'User Management', icon: <FiUsers size={20} />, path: '/modules/users' },
    { name: 'Settings', icon: <FiSettings size={20} />, path: '/modules/settings' },
    { name: 'Reports', icon: <FiPieChart size={20} />, path: '/modules/reports' },
  ];

  return (
    <ProtectedRoute requiredRoles={['ADMIN', 'STAFF']}>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <aside 
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-indigo-800 text-white transition-all duration-300 lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between p-6">
              <h1 className="text-2xl font-bold">
                <span className="text-indigo-300">Admin</span> Portal
              </h1>
              <button 
                onClick={() => setSidebarOpen(false)} 
                className="lg:hidden"
              >
                <FiX size={24} />
              </button>
            </div>
            
            <div className="mt-4 px-4 py-6 bg-indigo-700 flex items-center space-x-3">
              <div className="bg-indigo-500 p-2 rounded-full">
                <FiUser size={20} />
              </div>
              <div>
                <p className="font-medium">{user?.username}</p>
                <p className="text-sm text-indigo-200">{user?.roles.join(', ')}</p>
              </div>
            </div>
            
            <nav className="flex-1 px-2 py-6">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => {
                        router.push(item.path);
                        setSidebarOpen(false);
                      }}
                      className="flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-left transition-all hover:bg-indigo-700 focus:bg-indigo-700"
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            
            <div className="p-4">
              <button
                onClick={logout}
                className="flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-left transition-all hover:bg-indigo-700"
              >
                <FiLogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex flex-1 flex-col lg:ml-0">
          {/* Topbar */}
          <header className="sticky top-0 z-20 flex items-center justify-between bg-white px-6 py-4 shadow-sm lg:justify-end">
            <button 
              onClick={() => setSidebarOpen(true)} 
              className="lg:hidden"
            >
              <FiMenu size={24} />
            </button>
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="font-medium">{user?.username}</p>
                <p className="text-sm text-gray-500">{user?.roles.join(', ')}</p>
              </div>
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <FiUser className="text-indigo-600" />
                </div>
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="flex-1 p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-800">System Dashboard</h1>
              <p className="text-gray-600">Welcome back, here&apos;s what&apos;s happening today</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { title: 'Total Users', value: '2,842', change: '+12%', icon: <FiUsers /> },
                { title: 'Revenue', value: '$24,300', change: '+8.2%', icon: <FiPieChart /> },
                { title: 'Pending Tasks', value: '14', change: '-3.1%', icon: <FiSettings /> },
                { title: 'Active Sessions', value: '328', change: '+4.3%', icon: <FiUser /> },
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">{stat.title}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      <p className="text-green-500 text-sm mt-1">{stat.change}</p>
                    </div>
                    <div className="bg-indigo-100 text-indigo-600 p-3 rounded-lg">
                      {stat.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Access Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 lg:col-span-2">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
                {/* Activity timeline would go here */}
                <div className="text-center py-12 text-gray-400">
                  Activity timeline component
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  {navItems.slice(1).map((item) => (
                    <button
                      key={item.name}
                      onClick={() => router.push(item.path)}
                      className="flex items-center w-full p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <div className="text-indigo-600 mr-3">
                        {item.icon}
                      </div>
                      <span>{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}