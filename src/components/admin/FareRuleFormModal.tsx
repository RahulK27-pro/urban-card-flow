import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface FareRuleFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fareRule: any;
}

export const FareRuleFormModal = ({ open, onOpenChange, fareRule }: FareRuleFormModalProps) => {
  const [formData, setFormData] = useState({
    startStation: fareRule?.startStation || '',
    endStation: fareRule?.endStation || '',
    baseFare: fareRule?.baseFare || '',
    peakHourMultiplier: fareRule?.peakHourMultiplier || '',
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const stations = ['Central Station', 'North Terminal', 'East Plaza', 'West Park', 'South Bay'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      toast({
        title: fareRule ? 'Fare Rule Updated' : 'Fare Rule Created',
        description: fareRule ? 'Fare rule has been updated.' : 'New fare rule has been created.',
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
          <DialogTitle>{fareRule ? 'Edit Fare Rule' : 'New Fare Rule'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="startStation">Start Station</Label>
            <Select value={formData.startStation} onValueChange={(value) => setFormData({ ...formData, startStation: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select start station" />
              </SelectTrigger>
              <SelectContent>
                {stations.map((station) => (
                  <SelectItem key={station} value={station}>{station}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="endStation">End Station</Label>
            <Select value={formData.endStation} onValueChange={(value) => setFormData({ ...formData, endStation: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select end station" />
              </SelectTrigger>
              <SelectContent>
                {stations.map((station) => (
                  <SelectItem key={station} value={station}>{station}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="baseFare">Base Fare ($)</Label>
              <Input
                id="baseFare"
                type="number"
                step="0.01"
                value={formData.baseFare}
                onChange={(e) => setFormData({ ...formData, baseFare: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="peakHourMultiplier">Peak Multiplier</Label>
              <Input
                id="peakHourMultiplier"
                type="number"
                step="0.1"
                value={formData.peakHourMultiplier}
                onChange={(e) => setFormData({ ...formData, peakHourMultiplier: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              {loading ? 'Saving...' : fareRule ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
