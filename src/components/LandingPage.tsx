import { CreditCard, Shield, TrendingUp, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface LandingPageProps {
  onSelectPortal: (portal: 'passenger' | 'admin') => void;
}

export const LandingPage = ({ onSelectPortal }: LandingPageProps) => {
  const features = [
    {
      icon: Zap,
      title: 'Fast & Convenient',
      description: 'Seamless transit experience with instant card recharge and tap-to-ride functionality',
    },
    {
      icon: CreditCard,
      title: 'Multi-Card Support',
      description: 'Support for adult, student, senior, and child discount cards with flexible pricing',
    },
    {
      icon: TrendingUp,
      title: 'Real-time Analytics',
      description: 'Track your journey history and spending patterns with detailed analytics',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-primary rounded-full mb-6">
              <CreditCard className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              Smart Transit Card
              <span className="block text-accent mt-2">Management System</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your complete solution for modern public transportation management. 
              Fast, secure, and intelligent card-based fare collection.
            </p>
            
            {/* Portal Selection Cards */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-16">
              <Card 
                className="shadow-elevated hover:shadow-xl transition-all cursor-pointer border-2 hover:border-accent group"
                onClick={() => onSelectPortal('passenger')}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <CreditCard className="w-8 h-8 text-accent" />
                  </div>
                  <CardTitle className="text-2xl">Passenger Portal</CardTitle>
                  <CardDescription className="text-base">
                    Access your transit card and manage your journeys
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectPortal('passenger');
                    }}
                  >
                    Login as Passenger
                  </Button>
                </CardContent>
              </Card>

              <Card 
                className="shadow-elevated hover:shadow-xl transition-all cursor-pointer border-2 hover:border-accent group"
                onClick={() => onSelectPortal('admin')}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <Shield className="w-8 h-8 text-accent" />
                  </div>
                  <CardTitle className="text-2xl">Admin Portal</CardTitle>
                  <CardDescription className="text-base">
                    Manage the entire transit system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectPortal('admin');
                    }}
                  >
                    Login as Admin
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Why Choose Our System?</h2>
            <p className="text-xl text-muted-foreground">Modern features for modern transit</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="shadow-card hover:shadow-elevated transition-all">
                  <CardHeader>
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
