'use client';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute requiredRoles={['USER']}>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold">User Dashboard</h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  Welcome, {user?.username}
                </span>
                <button
                  onClick={logout}
                  className="text-sm bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
              <h2 className="text-lg font-medium mb-4">Your Dashboard</h2>
              <p className="text-gray-600">
                This page is only accessible to USER role.
              </p>
              
              {/* User dashboard content here */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded shadow">
                  <h3 className="font-medium">My Profile</h3>
                  <p className="text-sm text-gray-600 mt-2">View and edit your profile</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                  <h3 className="font-medium">My Activities</h3>
                  <p className="text-sm text-gray-600 mt-2">Track your activities</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}