import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CardTypeFormModal } from './CardTypeFormModal';

export const CardTypeManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingCardType, setEditingCardType] = useState(null);

  const cardTypes = [
    { id: 1, typeName: 'Adult', baseFareMultiplier: 1.0, description: 'Standard adult fare' },
    { id: 2, typeName: 'Student', baseFareMultiplier: 0.7, description: 'Student discount card' },
    { id: 3, typeName: 'Senior', baseFareMultiplier: 0.5, description: 'Senior citizen discount' },
    { id: 4, typeName: 'Child', baseFareMultiplier: 0.5, description: 'Child discount card' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Card Type Management</h1>
          <p className="text-muted-foreground">Manage discount card types</p>
        </div>
        <Button onClick={() => { setEditingCardType(null); setShowModal(true); }} className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Plus className="w-4 h-4 mr-2" />
          New Card Type
        </Button>
      </div>

      <Card className="shadow-card">
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type Name</TableHead>
                <TableHead>Fare Multiplier</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cardTypes.map((cardType) => (
                <TableRow key={cardType.id}>
                  <TableCell className="font-medium">{cardType.typeName}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent">
                      {cardType.baseFareMultiplier}x
                    </span>
                  </TableCell>
                  <TableCell>{cardType.description}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => { setEditingCardType(cardType); setShowModal(true); }} className="mr-2">
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

      <CardTypeFormModal open={showModal} onOpenChange={setShowModal} cardType={editingCardType} />
    </div>
  );
};
