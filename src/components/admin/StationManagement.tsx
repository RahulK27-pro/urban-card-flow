import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StationFormModal } from './StationFormModal';

export const StationManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingStation, setEditingStation] = useState(null);

  const stations = [
    { id: 1, name: 'Central Station', lineColor: 'Blue' },
    { id: 2, name: 'North Terminal', lineColor: 'Red' },
    { id: 3, name: 'East Plaza', lineColor: 'Green' },
    { id: 4, name: 'West Park', lineColor: 'Yellow' },
    { id: 5, name: 'South Bay', lineColor: 'Purple' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Station Management</h1>
          <p className="text-muted-foreground">Manage all transit stations</p>
        </div>
        <Button onClick={() => { setEditingStation(null); setShowModal(true); }} className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Plus className="w-4 h-4 mr-2" />
          New Station
        </Button>
      </div>

      <Card className="shadow-card">
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Station Name</TableHead>
                <TableHead>Line Color</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stations.map((station) => (
                <TableRow key={station.id}>
                  <TableCell className="font-medium">{station.name}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center">
                      <span className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: station.lineColor.toLowerCase() }}></span>
                      {station.lineColor}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => { setEditingStation(station); setShowModal(true); }} className="mr-2">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <StationFormModal open={showModal} onOpenChange={setShowModal} station={editingStation} />
    </div>
  );
};
