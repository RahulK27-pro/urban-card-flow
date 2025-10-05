import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CardFormModal } from './CardFormModal';

export const CardManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  const cards = [
    { 
      id: 1, 
      cardNumber: 'CARD-001234', 
      passengerName: 'John Doe',
      cardType: 'Adult',
      balance: 45.50, 
      status: 'Active',
      issueDate: '2024-01-15'
    },
    { 
      id: 2, 
      cardNumber: 'CARD-001235', 
      passengerName: 'Jane Smith',
      cardType: 'Student',
      balance: 28.75, 
      status: 'Active',
      issueDate: '2024-02-20'
    },
    { 
      id: 3, 
      cardNumber: 'CARD-001236', 
      passengerName: 'Bob Johnson',
      cardType: 'Senior',
      balance: 12.00, 
      status: 'Inactive',
      issueDate: '2024-03-10'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Card Management</h1>
          <p className="text-muted-foreground">Manage transit cards and assignments</p>
        </div>
        <Button onClick={() => { setEditingCard(null); setShowModal(true); }} className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Plus className="w-4 h-4 mr-2" />
          New Card
        </Button>
      </div>

      <Card className="shadow-card">
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Card Number</TableHead>
                <TableHead>Passenger</TableHead>
                <TableHead>Card Type</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cards.map((card) => (
                <TableRow key={card.id}>
                  <TableCell className="font-medium">{card.cardNumber}</TableCell>
                  <TableCell>{card.passengerName}</TableCell>
                  <TableCell>{card.cardType}</TableCell>
                  <TableCell className="text-accent font-semibold">${card.balance.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      card.status === 'Active' ? 'bg-success/10 text-success' : 
                      card.status === 'Inactive' ? 'bg-muted text-muted-foreground' : 
                      'bg-destructive/10 text-destructive'
                    }`}>
                      {card.status}
                    </span>
                  </TableCell>
                  <TableCell>{card.issueDate}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => { setEditingCard(card); setShowModal(true); }} className="mr-2">
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

      <CardFormModal open={showModal} onOpenChange={setShowModal} card={editingCard} />
    </div>
  );
};
