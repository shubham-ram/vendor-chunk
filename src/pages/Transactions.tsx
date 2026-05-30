import { useState, useMemo } from 'react';
import { 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Chip,
  TextField,
  InputAdornment,
  Box
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { generateMockData } from '../data/mockData';
import dayjs from 'dayjs';
import _ from 'lodash';

const transactions = generateMockData(100);

export default function Transactions() {
  const [search, setSearch] = useState('');

  const filteredTransactions = useMemo(() => {
    return _.chain(transactions)
      .filter(t => 
        t.description.toLowerCase().includes(search.toLowerCase()) || 
        t.category.toLowerCase().includes(search.toLowerCase())
      )
      .orderBy(['date'], ['desc'])
      .value();
  }, [search]);

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
        Transaction History
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search descriptions or categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: 'grey.50' }}>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions.map((tx) => (
              <TableRow key={tx.id} hover>
                <TableCell>
                  {dayjs(tx.date).format('MMM DD, YYYY')}
                  <Typography variant="caption" display="block" color="textSecondary">
                    {dayjs(tx.date).fromNow()}
                  </Typography>
                </TableCell>
                <TableCell sx={{ fontWeight: 500 }}>{tx.description}</TableCell>
                <TableCell>
                  <Chip 
                    label={tx.category} 
                    size="small" 
                    color={tx.type === 'income' ? 'success' : 'default'}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right" sx={{ 
                  color: tx.type === 'income' ? 'success.main' : 'text.primary',
                  fontWeight: 600
                }}>
                  {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
