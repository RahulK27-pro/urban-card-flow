import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowUpCircle, Calendar } from 'lucide-react';

interface TransactionHistoryProps {
  cardNumber: string;
}

export const TransactionHistory = ({ cardNumber }: TransactionHistoryProps) => {
  // Mock data - replace with API call
  const transactions = [
    { id: 1, date: '2024-01-15', time: '07:00', amount: 20.00, type: 'Top-up', method: 'Credit Card' },
    { id: 2, date: '2024-01-10', time: '12:30', amount: 50.00, type: 'Top-up', method: 'Debit Card' },
    { id: 3, date: '2024-01-05', time: '09:15', amount: 30.00, type: 'Top-up', method: 'Credit Card' },
    { id: 4, date: '2023-12-28', time: '16:45', amount: 25.00, type: 'Top-up', method: 'Cash' },
  ];

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
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                      {transaction.date}
                    </div>
                  </TableCell>
                  <TableCell>{transaction.time}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
                      {transaction.type}
                    </span>
                  </TableCell>
                  <TableCell>{transaction.method}</TableCell>
                  <TableCell className="text-right font-semibold text-success">
                    +${transaction.amount.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
