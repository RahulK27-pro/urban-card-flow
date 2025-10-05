import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FareRuleFormModal } from './FareRuleFormModal';

export const FareRuleManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingRule, setEditingRule] = useState(null);

  const fareRules = [
    { id: 1, startStation: 'Central Station', endStation: 'North Terminal', baseFare: 2.50, peakHourMultiplier: 1.5 },
    { id: 2, startStation: 'North Terminal', endStation: 'East Plaza', baseFare: 1.80, peakHourMultiplier: 1.3 },
    { id: 3, startStation: 'Central Station', endStation: 'West Park', baseFare: 3.20, peakHourMultiplier: 1.5 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Fare Rule Management</h1>
          <p className="text-muted-foreground">Manage pricing between stations</p>
        </div>
        <Button onClick={() => { setEditingRule(null); setShowModal(true); }} className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Plus className="w-4 h-4 mr-2" />
          New Fare Rule
        </Button>
      </div>

      <Card className="shadow-card">
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Start Station</TableHead>
                <TableHead>End Station</TableHead>
                <TableHead>Base Fare</TableHead>
                <TableHead>Peak Hour Multiplier</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fareRules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell className="font-medium">{rule.startStation}</TableCell>
                  <TableCell className="font-medium">{rule.endStation}</TableCell>
                  <TableCell className="text-accent font-semibold">${rule.baseFare.toFixed(2)}</TableCell>
                  <TableCell>{rule.peakHourMultiplier}x</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => { setEditingRule(rule); setShowModal(true); }} className="mr-2">
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

      <FareRuleFormModal open={showModal} onOpenChange={setShowModal} fareRule={editingRule} />
    </div>
  );
};
