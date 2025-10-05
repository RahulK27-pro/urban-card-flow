import { useState } from 'react';
import { Shield, Users, MapPin, DollarSign, CreditCard, LogOut, BarChart3, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { PassengerManagement } from './admin/PassengerManagement';
import { StationManagement } from './admin/StationManagement';
import { FareRuleManagement } from './admin/FareRuleManagement';
import { CardTypeManagement } from './admin/CardTypeManagement';
import { CardManagement } from './admin/CardManagement';
import { Analytics } from './admin/Analytics';

type AdminView = 'analytics' | 'passengers' | 'cards' | 'stations' | 'fares' | 'cardtypes';

export const AdminDashboard = () => {
  const { logout } = useAuth();
  const [activeView, setActiveView] = useState<AdminView>('analytics');

  const menuItems = [
    { id: 'analytics' as AdminView, label: 'Analytics', icon: BarChart3 },
    { id: 'passengers' as AdminView, label: 'Passengers', icon: Users },
    { id: 'cards' as AdminView, label: 'Cards', icon: Wallet },
    { id: 'stations' as AdminView, label: 'Stations', icon: MapPin },
    { id: 'fares' as AdminView, label: 'Fare Rules', icon: DollarSign },
    { id: 'cardtypes' as AdminView, label: 'Card Types', icon: CreditCard },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-card text-white flex flex-col shadow-elevated">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <Shield className="w-8 h-8" />
            <div>
              <h1 className="text-xl font-bold">Admin Portal</h1>
              <p className="text-xs text-white/70">Transit Management</p>
            </div>
          </div>
          
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeView === item.id
                      ? 'bg-white/20 text-white'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-white/10">
          <Button
            variant="ghost"
            onClick={logout}
            className="w-full justify-start text-white hover:bg-white/10 hover:text-white"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {activeView === 'analytics' && <Analytics />}
          {activeView === 'passengers' && <PassengerManagement />}
          {activeView === 'cards' && <CardManagement />}
          {activeView === 'stations' && <StationManagement />}
          {activeView === 'fares' && <FareRuleManagement />}
          {activeView === 'cardtypes' && <CardTypeManagement />}
        </div>
      </main>
    </div>
  );
};
