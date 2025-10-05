import { useState } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PassengerFormModal } from './PassengerFormModal';

export const PassengerManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingPassenger, setEditingPassenger] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const passengers = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', phone: '+1234567890', cardNumber: 'TC001234', status: 'Active' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', phone: '+1234567891', cardNumber: 'TC001235', status: 'Active' },
    { id: 3, firstName: 'Bob', lastName: 'Johnson', email: 'bob@example.com', phone: '+1234567892', cardNumber: 'TC001236', status: 'Blocked' },
  ];

  const handleEdit = (passenger: any) => {
    setEditingPassenger(passenger);
    setShowModal(true);
  };

  const handleNew = () => {
    setEditingPassenger(null);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Passenger Management</h1>
          <p className="text-muted-foreground">Manage all registered passengers</p>
        </div>
        <Button onClick={handleNew} className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Plus className="w-4 h-4 mr-2" />
          New Passenger
        </Button>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Search className="w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search passengers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Card Number</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {passengers.map((passenger) => (
                  <TableRow key={passenger.id}>
                    <TableCell className="font-medium">
                      {passenger.firstName} {passenger.lastName}
                    </TableCell>
                    <TableCell>{passenger.email}</TableCell>
                    <TableCell>{passenger.phone}</TableCell>
                    <TableCell className="font-mono">{passenger.cardNumber}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        passenger.status === 'Active' 
                          ? 'bg-success/10 text-success' 
                          : 'bg-destructive/10 text-destructive'
                      }`}>
                        {passenger.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(passenger)}
                        className="mr-2"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <PassengerFormModal
        open={showModal}
        onOpenChange={setShowModal}
        passenger={editingPassenger}
      />
    </div>
  );
};
