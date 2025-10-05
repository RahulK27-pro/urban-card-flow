import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface CardTypeFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cardType: any;
}

export const CardTypeFormModal = ({ open, onOpenChange, cardType }: CardTypeFormModalProps) => {
  const [formData, setFormData] = useState({
    typeName: cardType?.typeName || '',
    baseFareMultiplier: cardType?.baseFareMultiplier || '',
    description: cardType?.description || '',
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      toast({
        title: cardType ? 'Card Type Updated' : 'Card Type Created',
        description: cardType ? 'Card type has been updated.' : 'New card type has been created.',
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
          <DialogTitle>{cardType ? 'Edit Card Type' : 'New Card Type'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="typeName">Type Name</Label>
            <Input
              id="typeName"
              value={formData.typeName}
              onChange={(e) => setFormData({ ...formData, typeName: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="baseFareMultiplier">Base Fare Multiplier</Label>
            <Input
              id="baseFareMultiplier"
              type="number"
              step="0.1"
              value={formData.baseFareMultiplier}
              onChange={(e) => setFormData({ ...formData, baseFareMultiplier: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              {loading ? 'Saving...' : cardType ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
