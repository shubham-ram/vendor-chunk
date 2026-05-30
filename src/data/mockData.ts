import _ from 'lodash';
import dayjs from 'dayjs';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: 'Food' | 'Transport' | 'Entertainment' | 'Shopping' | 'Utilities' | 'Income';
  description: string;
  type: 'expense' | 'income';
}

const CATEGORIES = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Utilities'] as const;
const DESCRIPTIONS = {
  Food: ['Grocery Store', 'Restaurant', 'Coffee Shop', 'Fast Food'],
  Transport: ['Uber', 'Gas Station', 'Train Ticket', 'Parking'],
  Entertainment: ['Netflix', 'Cinema', 'Concert', 'Bowling'],
  Shopping: ['Amazon', 'Clothing Store', 'Mall', 'Electronics'],
  Utilities: ['Electricity Bill', 'Water Bill', 'Internet', 'Phone Bill'],
};

export const generateMockData = (count: number = 50): Transaction[] => {
  return _.times(count, (index) => {
    const isIncome = Math.random() > 0.8;
    const category = isIncome ? 'Income' : _.sample(CATEGORIES)!;
    const date = dayjs().subtract(_.random(0, 30), 'day').toISOString();
    
    return {
      id: `tx-${index}`,
      date,
      amount: isIncome ? _.random(1000, 5000) : _.random(10, 500),
      category: category as Transaction['category'],
      description: isIncome ? 'Salary Deposit' : _.sample(DESCRIPTIONS[category as keyof typeof DESCRIPTIONS])!,
      type: isIncome ? 'income' : 'expense',
    };
  });
};

export const getAggregatedData = (transactions: Transaction[]) => {
  const grouped = _.groupBy(transactions, 'category');
  return _.map(grouped, (items: Transaction[], category: string) => ({
    category,
    total: _.sumBy(items, 'amount'),
    count: items.length,
  }));
};

export const getDailySpending = (transactions: Transaction[]) => {
  const expenses = transactions.filter((t: Transaction) => t.type === 'expense');
  const grouped = _.groupBy(expenses, (t: Transaction) => dayjs(t.date).format('YYYY-MM-DD'));
  
  return _.chain(grouped)
    .map((items: Transaction[], date: string) => ({
      date,
      amount: _.sumBy(items, 'amount'),
    }))
    .sortBy('date')
    .value();
};
