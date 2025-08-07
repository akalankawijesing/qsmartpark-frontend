'use client';
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles = [],
  redirectTo = '/login',
}) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(redirectTo);
        return;
      }

      if (requiredRoles.length > 0) {
        const hasRequiredRole = requiredRoles.some(role => 
          user.roles.includes(role)
        );

        if (!hasRequiredRole) {
          router.push('/unauthorized');
          return;
        }
      }
    }
  }, [user, loading, requiredRoles, router, redirectTo]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.some(role => 
      user.roles.includes(role)
    );

    if (!hasRequiredRole) {
      return null;
    }
  }

  return <>{children}</>;
};