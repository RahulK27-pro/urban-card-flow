import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MapPin, Calendar } from 'lucide-react';

interface TripHistoryProps {
  cardNumber: string;
}

export const TripHistory = ({ cardNumber }: TripHistoryProps) => {
  // Mock data - replace with API call to /api/cards/{cardId}/trips
  const trips = [
    { tripId: 1, cardId: cardNumber, entryTime: '2024-01-15 08:30', exitTime: '2024-01-15 09:15', entryStation: 'Central Station', exitStation: 'North Terminal', fareAmount: 2.50 },
    { tripId: 2, cardId: cardNumber, entryTime: '2024-01-15 17:45', exitTime: '2024-01-15 18:20', entryStation: 'North Terminal', exitStation: 'East Plaza', fareAmount: 1.80 },
    { tripId: 3, cardId: cardNumber, entryTime: '2024-01-14 09:15', exitTime: '2024-01-14 10:00', entryStation: 'East Plaza', exitStation: 'Central Station', fareAmount: 2.50 },
    { tripId: 4, cardId: cardNumber, entryTime: '2024-01-14 18:00', exitTime: '2024-01-14 18:45', entryStation: 'Central Station', exitStation: 'West Park', fareAmount: 3.20 },
    { tripId: 5, cardId: cardNumber, entryTime: '2024-01-13 10:30', exitTime: '2024-01-13 11:15', entryStation: 'West Park', exitStation: 'South Bay', fareAmount: 2.90 },
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
                <TableHead>Trip ID</TableHead>
                <TableHead>Entry Time</TableHead>
                <TableHead>Entry Station</TableHead>
                <TableHead>Exit Station</TableHead>
                <TableHead>Exit Time</TableHead>
                <TableHead className="text-right">Fare</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trips.map((trip) => (
                <TableRow key={trip.tripId}>
                  <TableCell className="font-mono text-muted-foreground">#{trip.tripId}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                      {trip.entryTime}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{trip.entryStation}</TableCell>
                  <TableCell className="font-medium">{trip.exitStation}</TableCell>
                  <TableCell>{trip.exitTime}</TableCell>
                  <TableCell className="text-right font-semibold text-accent">
                    ${trip.fareAmount.toFixed(2)}
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
