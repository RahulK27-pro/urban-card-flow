import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface StationFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  station: any;
}

export const StationFormModal = ({ open, onOpenChange, station }: StationFormModalProps) => {
  const [formData, setFormData] = useState({
    name: station?.name || '',
    lineColor: station?.lineColor || '',
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      toast({
        title: station ? 'Station Updated' : 'Station Created',
        description: station ? 'Station has been updated.' : 'New station has been created.',
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
          <DialogTitle>{station ? 'Edit Station' : 'New Station'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Station Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lineColor">Line Color</Label>
            <Input
              id="lineColor"
              value={formData.lineColor}
              onChange={(e) => setFormData({ ...formData, lineColor: e.target.value })}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              {loading ? 'Saving...' : station ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
