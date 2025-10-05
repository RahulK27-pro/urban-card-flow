import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MapPin, Calendar } from 'lucide-react';

interface TripHistoryProps {
  cardNumber: string;
}

export const TripHistory = ({ cardNumber }: TripHistoryProps) => {
  // Mock data - replace with API call
  const trips = [
    { id: 1, from: 'Central Station', to: 'North Terminal', date: '2024-01-15', time: '08:30', fare: 2.50 },
    { id: 2, from: 'North Terminal', to: 'East Plaza', date: '2024-01-15', time: '17:45', fare: 1.80 },
    { id: 3, from: 'East Plaza', to: 'Central Station', date: '2024-01-14', time: '09:15', fare: 2.50 },
    { id: 4, from: 'Central Station', to: 'West Park', date: '2024-01-14', time: '18:00', fare: 3.20 },
    { id: 5, from: 'West Park', to: 'South Bay', date: '2024-01-13', time: '10:30', fare: 2.90 },
  ];

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-accent" />
          Trip History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead className="text-right">Fare</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trips.map((trip) => (
                <TableRow key={trip.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                      {trip.date}
                    </div>
                  </TableCell>
                  <TableCell>{trip.time}</TableCell>
                  <TableCell className="font-medium">{trip.from}</TableCell>
                  <TableCell className="font-medium">{trip.to}</TableCell>
                  <TableCell className="text-right font-semibold text-accent">
                    ${trip.fare.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
