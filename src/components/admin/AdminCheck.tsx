"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Background } from "@/components/Background";

const AdminCheck: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  if (isMounted && !loading && (!user || !user.isAdmin)) {
    window.location.href = "/";
    return null;
  }

  return null;
};

export default AdminCheck;
