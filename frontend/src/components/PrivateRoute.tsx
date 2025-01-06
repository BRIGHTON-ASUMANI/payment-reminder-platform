// components/PrivateRoute.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');  // Redirect to login if user is not authenticated
    }
  }, [user, loading, router]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
};

export default PrivateRoute;
