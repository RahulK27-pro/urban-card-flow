import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowUpCircle, Calendar } from 'lucide-react';

interface Transaction {
  TransactionID: number;
  TransactionType: string;
  Amount: number;
  TransactionDate: string;
}

interface TransactionHistoryProps {
  cardNumber: string;
}

export const TransactionHistory = ({ cardNumber }: TransactionHistoryProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // First get the card ID using the card number
        const cardsResponse = await fetch(`http://localhost:5000/api/cards`);
        if (!cardsResponse.ok) throw new Error('Failed to fetch cards');
        const cards = await cardsResponse.json();
        const card = cards.find((c: any) => c.CardNumber === cardNumber);

        if (card) {
          // Fetch transactions for this card
          const transactionsResponse = await fetch(`http://localhost:5000/api/cards/${card.CardID}/transactions`);
          if (transactionsResponse.ok) {
            const transactionsData = await transactionsResponse.json();
            setTransactions(transactionsData);
          }
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [cardNumber]);

  if (loading) {
    return (
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <ArrowUpCircle className="w-5 h-5 mr-2 text-success" />
            Transaction History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Loading transactions...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center">
          <ArrowUpCircle className="w-5 h-5 mr-2 text-success" />
          Transaction History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => {
                const date = new Date(transaction.TransactionDate);
                const dateStr = date.toISOString().split('T')[0];
                const timeStr = date.toTimeString().slice(0, 5);

                return (
                  <TableRow key={transaction.TransactionID}>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                        {dateStr}
                      </div>
                    </TableCell>
                    <TableCell>{timeStr}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
                        {transaction.TransactionType}
                      </span>
                    </TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right font-semibold text-success">
                      +${transaction.Amount.toFixed(2)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
