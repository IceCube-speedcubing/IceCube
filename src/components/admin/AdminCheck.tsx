"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Background } from '@/components/Background';

interface AdminCheckProps {
  children: React.ReactNode;
}

const AdminCheck: React.FC<AdminCheckProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !loading && (!user || !user.isAdmin)) {
      window.location.href = '/';
    }
  }, [user, loading, isMounted]);

  if (!isMounted || loading) {
    return (
      <>
        <Background />
        <div className="flex justify-center items-center h-screen">
          <LoadingSpinner className="h-24 w-24 z-10" />
        </div>
      </>
    );
  }

  if (user && user.isAdmin) {
    return <>{children}</>;
  }

  return null;
}

export default AdminCheck;
