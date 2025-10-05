import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, DollarSign, TrendingUp, CreditCard } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

export const Analytics = () => {
  const kpis = [
    { label: 'Total Passengers', value: '1,234', icon: Users, color: 'text-accent' },
    { label: 'Active Cards', value: '987', icon: CreditCard, color: 'text-success' },
    { label: 'Monthly Revenue', value: '$12,450', icon: DollarSign, color: 'text-accent' },
    { label: 'Daily Trips', value: '456', icon: TrendingUp, color: 'text-success' },
  ];

  const tripsPerStation = [
    { station: 'Central', trips: 245 },
    { station: 'North', trips: 189 },
    { station: 'East', trips: 156 },
    { station: 'West', trips: 134 },
    { station: 'South', trips: 98 },
  ];

  const dailyRevenue = [
    { day: 'Mon', revenue: 1850 },
    { day: 'Tue', revenue: 2100 },
    { day: 'Wed', revenue: 1980 },
    { day: 'Thu', revenue: 2250 },
    { day: 'Fri', revenue: 2450 },
    { day: 'Sat', revenue: 1680 },
    { day: 'Sun', revenue: 1420 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Overview of transit system performance</p>
      </div>

      {/* KPIs */}
      <div className="grid md:grid-cols-4 gap-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.label} className="shadow-card">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{kpi.label}</p>
                    <p className={`text-3xl font-bold ${kpi.color}`}>{kpi.value}</p>
                  </div>
                  <Icon className={`w-8 h-8 ${kpi.color} opacity-50`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Trips per Station</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={tripsPerStation}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="station" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="trips" fill="hsl(var(--accent))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Daily Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="hsl(var(--success))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
