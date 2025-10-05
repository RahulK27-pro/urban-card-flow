import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowUpCircle } from 'lucide-react';

interface RechargeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentBalance: number;
  cardNumber: string;
}

export const RechargeModal = ({ open, onOpenChange, currentBalance, cardNumber }: RechargeModalProps) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const quickAmounts = [10, 20, 50, 100];

  const handleRecharge = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock API call
      // await fetch(`http://localhost:5000/api/cards/${cardNumber}/recharge`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ amount: parseFloat(amount) }),
      // });

      toast({
        title: 'Recharge Successful',
        description: `$${amount} has been added to your card.`,
      });
      onOpenChange(false);
      setAmount('');
    } catch (error) {
      toast({
        title: 'Recharge Failed',
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
          <DialogTitle className="flex items-center">
            <ArrowUpCircle className="w-5 h-5 mr-2 text-accent" />
            Recharge Card
          </DialogTitle>
          <DialogDescription>
            Add funds to your transit card. Current balance: ${currentBalance.toFixed(2)}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleRecharge} className="space-y-4">
          <div className="space-y-2">
            <Label>Quick Select</Label>
            <div className="grid grid-cols-4 gap-2">
              {quickAmounts.map((amt) => (
                <Button
                  key={amt}
                  type="button"
                  variant="outline"
                  onClick={() => setAmount(amt.toString())}
                  className="w-full"
                >
                  ${amt}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Custom Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
              step="0.01"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading || !amount}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {loading ? 'Processing...' : `Recharge $${amount || '0'}`}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
