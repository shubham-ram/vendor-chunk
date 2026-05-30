import { useMemo } from "react";
import { Typography, Grid, Paper, Box, Card, CardContent } from "@mui/material";
import { TrendingUp, TrendingDown, AccountBalance } from "@mui/icons-material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import {
  generateMockData,
  getDailySpending,
  getAggregatedData,
} from "../data/mockData";
import _ from "lodash";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const transactions = generateMockData(30);

export default function Dashboard() {
  const dailySpending = useMemo(() => getDailySpending(transactions), []);
  const aggregated = useMemo(
    () =>
      getAggregatedData(transactions).filter((d) => d.category !== "Income"),
    [],
  );

  const balance = _.sumBy(transactions, (t) =>
    t.type === "income" ? t.amount : -t.amount,
  );
  const totalExpenses = _.sumBy(transactions, (t) =>
    t.type === "expense" ? t.amount : 0,
  );
  const totalIncome = _.sumBy(transactions, (t) =>
    t.type === "income" ? t.amount : 0,
  );

  const lineData = {
    labels: dailySpending.map((d) => d.date),
    datasets: [
      {
        label: "Daily Spending",
        data: dailySpending.map((d) => d.amount),
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const doughnutData = {
    labels: aggregated.map((d) => d.category),
    datasets: [
      {
        data: aggregated.map((d) => d.total),
        backgroundColor: [
          "#3b82f6",
          "#10b981",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
        ],
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
        Financial Overview
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <AccountBalance sx={{ mr: 1, color: "primary.main" }} />
                <Typography color="textSecondary" variant="body2">
                  Current Balance
                </Typography>
              </Box>
              <Typography variant="h4">${balance.toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <TrendingDown sx={{ mr: 1, color: "error.main" }} />
                <Typography color="textSecondary" variant="body2">
                  Total Expenses
                </Typography>
              </Box>
              <Typography variant="h4">
                ${totalExpenses.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <TrendingUp sx={{ mr: 1, color: "success.main" }} />
                <Typography color="textSecondary" variant="body2">
                  Total Income
                </Typography>
              </Box>
              <Typography variant="h4">
                ${totalIncome.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper
            sx={{ p: 3, height: 400, display: "flex", flexDirection: "column" }}
          >
            <Typography variant="h6" gutterBottom>
              Spending Trend (Last 30 Days)
            </Typography>
            <Box sx={{ flexGrow: 1, minHeight: 0 }}>
              <Line
                data={lineData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper sx={{ p: 3, minHeight: 400 }}>
            <Typography variant="h6" gutterBottom>
              Expenses by Category
            </Typography>
            <Box
              sx={{ height: 300, display: "flex", justifyContent: "center" }}
            >
              <Doughnut
                data={doughnutData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
