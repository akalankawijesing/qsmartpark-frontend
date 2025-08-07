'use client';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function SystemPage() {
  const { user, logout } = useAuth();
   const router = useRouter();

  return (
    <ProtectedRoute requiredRoles={['ADMIN', 'STAFF']}>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold">System Management</h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  Welcome, {user?.username} ({user?.roles.join(', ')})
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
              <h2 className="text-lg font-medium mb-4">System Dashboard</h2>
              <p className="text-gray-600">
                This page is only accessible to ADMIN and STAFF users.
              </p>
              
              {/* System management content here */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded shadow" onClick={() => router.push("/modules/users")}>
                  <h3 className="font-medium">User Management</h3>
                  <p className="text-sm text-gray-600 mt-2">Manage system users</p>
                </div>
                <div className="bg-white p-4 rounded shadow" onClick={() => router.push("/modules/settings")}>
                  <h3 className="font-medium">Settings</h3>
                  <p className="text-sm text-gray-600 mt-2">System configuration</p>
                </div>
                <div className="bg-white p-4 rounded shadow" onClick={() => router.push("/modules/reports")}>
                  <h3 className="font-medium">Reports</h3>
                  <p className="text-sm text-gray-600 mt-2">System reports</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}