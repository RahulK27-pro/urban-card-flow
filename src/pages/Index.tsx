import { useState } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { LandingPage } from '@/components/LandingPage';
import { PassengerLogin } from '@/components/PassengerLogin';
import { PassengerDashboard } from '@/components/PassengerDashboard';
import { AdminLogin } from '@/components/AdminLogin';
import { AdminDashboard } from '@/components/AdminDashboard';

const AppContent = () => {
  const { passenger, admin } = useAuth();
  const [selectedPortal, setSelectedPortal] = useState<'landing' | 'passenger' | 'admin'>('landing');

  if (passenger) {
    return <PassengerDashboard />;
  }

  if (admin) {
    return <AdminDashboard />;
  }

  if (selectedPortal === 'landing') {
    return <LandingPage onSelectPortal={setSelectedPortal} />;
  }

  if (selectedPortal === 'passenger') {
    return <PassengerLogin />;
  }

  return <AdminLogin />;
};

const Index = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default Index;
