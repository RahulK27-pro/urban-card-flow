import { useState } from 'react';
import { CreditCard, ArrowUpCircle, History, User, LogOut, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { RechargeModal } from './RechargeModal';
import { ProfileModal } from './ProfileModal';
import { TripHistory } from './TripHistory';
import { TransactionHistory } from './TransactionHistory';

export const PassengerDashboard = () => {
  const { passenger, logout } = useAuth();
  const [showRecharge, setShowRecharge] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'trips' | 'transactions'>('overview');

  if (!passenger) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-card text-white shadow-elevated">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <CreditCard className="w-8 h-8" />
              <div>
                <h1 className="text-2xl font-bold">Transit Card Portal</h1>
                <p className="text-white/80 text-sm">Manage your card and journeys</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={logout}
              className="border-white/20 text-white bg-white/5"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'overview'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              }`}
            >
              <Wallet className="w-4 h-4 inline mr-2" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('trips')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'trips'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              }`}
            >
              <History className="w-4 h-4 inline mr-2" />
              Trip History
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'transactions'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              }`}
            >
              <ArrowUpCircle className="w-4 h-4 inline mr-2" />
              Transactions
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Card Details */}
            <Card className="shadow-card overflow-hidden">
              <div className="bg-gradient-card text-white p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-white/80 text-sm mb-1">Card Number</p>
                    <p className="text-xl font-mono tracking-wider">{passenger.CardNumber}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    passenger.Status === 'Active' ? 'bg-success text-success-foreground' : 'bg-destructive text-destructive-foreground'
                  }`}>
                    {passenger.Status}
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-white/80 text-sm">Cardholder Name</p>
                    <p className="text-lg font-semibold">{passenger.FirstName} {passenger.LastName}</p>
                  </div>
                  <div>
                    <p className="text-white/80 text-sm">Card Type</p>
                    <p className="text-lg font-semibold">{passenger.CardType}</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Current Balance</p>
                    <p className="text-4xl font-bold text-accent">${passenger.Balance.toFixed(2)}</p>
                  </div>
                  <Wallet className="w-12 h-12 text-accent/20" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    onClick={() => setShowRecharge(true)}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    <ArrowUpCircle className="w-4 h-4 mr-2" />
                    Recharge
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setShowProfile(true)}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">Total Trips</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-accent">24</p>
                  <p className="text-sm text-muted-foreground">This month</p>
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">Total Spent</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-accent">$45.60</p>
                  <p className="text-sm text-muted-foreground">This month</p>
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">Avg Trip Cost</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-accent">$1.90</p>
                  <p className="text-sm text-muted-foreground">Per journey</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'trips' && <TripHistory cardNumber={passenger.CardNumber} />}
        {activeTab === 'transactions' && <TransactionHistory cardNumber={passenger.CardNumber} />}
      </main>

      <RechargeModal 
        open={showRecharge} 
        onOpenChange={setShowRecharge}
        currentBalance={passenger.Balance}
        cardNumber={passenger.CardNumber}
      />
      <ProfileModal
        open={showProfile}
        onOpenChange={setShowProfile}
        passenger={passenger}
      />
    </div>
  );
};
