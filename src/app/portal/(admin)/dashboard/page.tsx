'use client';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Users,
  Settings,
  PieChart,
  User,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  ArrowRight,
  Calendar,
  Shield,
} from 'lucide-react';

export default function SystemPage() {
  const { user } = useAuth();
  const router = useRouter();
  //const [timeframe, setTimeframe] = useState('today');

  // Enhanced stats with trends and colors
  const stats = [
    { 
      title: 'Total Users', 
      value: '2,847', 
      change: '+12.5%', 
      trend: 'up',
      icon: <Users className="h-5 w-5" />,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      description: 'Active users this month'
    },
    { 
      title: 'Monthly Revenue', 
      value: '$24,380', 
      change: '+8.2%', 
      trend: 'up',
      icon: <TrendingUp className="h-5 w-5" />,
      color: 'from-emerald-500 to-green-500',
      bgColor: 'bg-emerald-50',
      description: 'Compared to last month'
    },
    { 
      title: 'Pending Tasks', 
      value: '12', 
      change: '-24.1%', 
      trend: 'down',
      icon: <Clock className="h-5 w-5" />,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      description: 'Tasks requiring attention'
    },
    { 
      title: 'System Health', 
      value: '99.9%', 
      change: '+0.3%', 
      trend: 'up',
      icon: <Activity className="h-5 w-5" />,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      description: 'Uptime this week'
    },
  ];

  // Quick actions with enhanced styling
  const quickActions = [
    {
      name: 'User Management',
      description: 'Manage users, roles & permissions',
      icon: <Users className="h-5 w-5" />,
      path: '/modules/users',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
    },
    {
      name: 'System Settings',
      description: 'Configure system preferences',
      icon: <Settings className="h-5 w-5" />,
      path: '/modules/settings',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50',
    },
    {
      name: 'Analytics',
      description: 'View detailed reports & insights',
      icon: <PieChart className="h-5 w-5" />,
      path: '/modules/reports',
      color: 'from-emerald-500 to-green-500',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-green-50',
    },
  ];

  // Recent activities
  const recentActivities = [
    {
      id: 1,
      action: 'New user registration',
      user: 'Sarah Chen',
      time: '2 minutes ago',
      type: 'user',
      icon: <User className="h-4 w-4" />,
    },
    {
      id: 2,
      action: 'System backup completed',
      user: 'System',
      time: '15 minutes ago',
      type: 'system',
      icon: <Shield className="h-4 w-4" />,
    },
    {
      id: 3,
      action: 'Report generated',
      user: 'Mike Johnson',
      time: '1 hour ago',
      type: 'report',
      icon: <PieChart className="h-4 w-4" />,
    },
    {
      id: 4,
      action: 'Settings updated',
      user: 'Admin',
      time: '3 hours ago',
      type: 'settings',
      icon: <Settings className="h-4 w-4" />,
    },
  ];

  return (
    <ProtectedRoute requiredRoles={['ADMIN', 'STAFF']}>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 rounded-2xl border border-slate-200/60 p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Welcome back, {user?.firstName}! 👋
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl">
                Here&apos;s what&apos;s happening with your system today. Everything looks great!
              </p>
            </div>
            <div className="hidden lg:flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 border border-slate-200 shadow-sm">
                <Calendar className="h-4 w-4 text-slate-500" />
                <span className="text-sm font-medium text-slate-700">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}>
                  {stat.icon}
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                  stat.trend === 'up' 
                    ? 'text-emerald-700 bg-emerald-100' 
                    : 'text-red-700 bg-red-100'
                }`}>
                  {stat.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</h3>
                <p className="text-sm font-medium text-slate-500 mb-1">{stat.title}</p>
                <p className="text-xs text-slate-400">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-1">Recent Activity</h2>
                  <p className="text-sm text-slate-500">Latest system events and user actions</p>
                </div>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 hover:gap-2 transition-all duration-200">
                  View all
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div 
                    key={activity.id} 
                    className="flex items-center gap-4 p-4 rounded-xl bg-slate-50/50 hover:bg-slate-100/50 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-white border border-slate-200 group-hover:border-slate-300 transition-colors">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">{activity.action}</p>
                      <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                        <span>by {activity.user}</span>
                        <span>•</span>
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions & System Status */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900 mb-1">Quick Actions</h2>
                <p className="text-sm text-slate-500">Frequently used tools and features</p>
              </div>
              
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => router.push(action.path)}
                    className={`group w-full p-4 rounded-xl border border-slate-200 hover:border-slate-300 ${action.bgColor} hover:shadow-md transition-all duration-200 text-left hover:scale-[1.02]`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${action.color} text-white shadow-sm group-hover:shadow-md transition-shadow`}>
                        {action.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 group-hover:text-slate-800">
                          {action.name}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {action.description}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all duration-200" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* System Status */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-green-500 text-white shadow-sm">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-green-900">System Status</h3>
                  <p className="text-sm text-green-700">All systems operational</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-800">Server Health</span>
                  <span className="text-sm font-bold text-green-600">99.9%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-800">Database</span>
                  <span className="text-sm font-bold text-green-600">Online</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-800">API Status</span>
                  <span className="text-sm font-bold text-green-600">Healthy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}