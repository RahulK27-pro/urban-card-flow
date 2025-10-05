import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface CardFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  card: any;
}

export const CardFormModal = ({ open, onOpenChange, card }: CardFormModalProps) => {
  const [formData, setFormData] = useState({
    passenger: card?.passengerId || '',
    cardType: card?.cardTypeId || '',
    initialBalance: card ? '' : '0',
    status: card?.status || 'Active',
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Mock data - replace with API calls
  const passengers = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Bob Johnson' },
  ];

  const cardTypes = [
    { id: 1, name: 'Adult' },
    { id: 2, name: 'Student' },
    { id: 3, name: 'Senior' },
    { id: 4, name: 'Child' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      toast({
        title: card ? 'Card Updated' : 'Card Created',
        description: card ? 'Card has been updated successfully.' : 'New card has been created successfully.',
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: 'Operation Failed',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{card ? 'Edit Card' : 'New Card'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!card && (
            <>
              <div className="space-y-2">
                <Label htmlFor="passenger">Passenger</Label>
                <Select value={formData.passenger} onValueChange={(value) => setFormData({ ...formData, passenger: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select passenger" />
                  </SelectTrigger>
                  <SelectContent>
                    {passengers.map((passenger) => (
                      <SelectItem key={passenger.id} value={passenger.id.toString()}>{passenger.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardType">Card Type</Label>
                <Select value={formData.cardType} onValueChange={(value) => setFormData({ ...formData, cardType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select card type" />
                  </SelectTrigger>
                  <SelectContent>
                    {cardTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id.toString()}>{type.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="initialBalance">Initial Balance ($)</Label>
                <Input
                  id="initialBalance"
                  type="number"
                  step="0.01"
                  value={formData.initialBalance}
                  onChange={(e) => setFormData({ ...formData, initialBalance: e.target.value })}
                  required
                />
              </div>
            </>
          )}
          {card && (
            <>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Blocked">Blocked</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardType">Card Type</Label>
                <Select value={formData.cardType} onValueChange={(value) => setFormData({ ...formData, cardType: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cardTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id.toString()}>{type.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              {loading ? 'Saving...' : card ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
