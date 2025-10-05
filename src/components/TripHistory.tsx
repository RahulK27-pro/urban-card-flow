import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MapPin, Calendar } from 'lucide-react';

interface Trip {
  TripID: number;
  EntryTime: string;
  ExitTime: string | null;
  FareAmount: number | null;
  EntryStationName: string;
  ExitStationName: string | null;
}

interface TripHistoryProps {
  cardNumber: string;
}

export const TripHistory = ({ cardNumber }: TripHistoryProps) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        // First get the card ID using the card number
        const cardsResponse = await fetch(`http://localhost:5000/api/cards`);
        if (!cardsResponse.ok) throw new Error('Failed to fetch cards');
        const cards = await cardsResponse.json();
        const card = cards.find((c: any) => c.CardNumber === cardNumber);

        if (card) {
          // Fetch trips for this card
          const tripsResponse = await fetch(`http://localhost:5000/api/cards/${card.CardID}/trips`);
          if (tripsResponse.ok) {
            const tripsData = await tripsResponse.json();
            setTrips(tripsData);
          }
        }
      } catch (error) {
        console.error('Error fetching trips:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [cardNumber]);

  if (loading) {
    return (
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-accent" />
            Trip History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Loading trips...</p>
        </CardContent>
      </Card>
    );
  }

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
                <TableRow key={trip.TripID}>
                  <TableCell className="font-mono text-muted-foreground">#{trip.TripID}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                      {trip.EntryTime}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{trip.EntryStationName}</TableCell>
                  <TableCell className="font-medium">{trip.ExitStationName || 'In Progress'}</TableCell>
                  <TableCell>{trip.ExitTime || 'In Progress'}</TableCell>
                  <TableCell className="text-right font-semibold text-accent">
                    ${trip.FareAmount?.toFixed(2) || '0.00'}
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
