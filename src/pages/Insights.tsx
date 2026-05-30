import { useMemo } from "react";
import React from 'react';
import {
  Typography,
  Paper,
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  LinearProgress,
} from "@mui/material";
import { generateMockData, getAggregatedData } from "../data/mockData";
import _ from "lodash";

export default function Insights() {
  const transactions = useMemo(() => generateMockData(100), []);
  const aggregated = useMemo(
    () =>
      _.orderBy(
        getAggregatedData(transactions).filter(
          (d: { category: string }) => d.category !== "Income",
        ),
        ["total"],
        ["desc"],
      ),
    [transactions],
  );

  const maxTotal = _.maxBy(aggregated, "total")?.total || 1;

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
        Financial Insights
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Spending by Category
            </Typography>
            <List>
              {aggregated.map((item: any, index: number) => (
                <React.Fragment key={item.category}>
                  {index > 0 && <Divider component="li" />}
                  <ListItem alignItems="flex-start" sx={{ px: 0, py: 2 }}>
                    <ListItemText
                      primary={
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 1,
                          }}
                        >
                          <Typography variant="subtitle1" fontWeight={600}>
                            {item.category}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="primary.main"
                            fontWeight={700}
                          >
                            ${item.total.toLocaleString()}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box sx={{ width: "100%" }}>
                          <LinearProgress
                            variant="determinate"
                            value={(item.total / maxTotal) * 100}
                            sx={{ height: 8, borderRadius: 4 }}
                          />
                          <Typography
                            variant="caption"
                            sx={{ mt: 1, display: "block" }}
                          >
                            {item.count} transactions this month
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            sx={{
              p: 3,
              bgcolor: "primary.main",
              color: "primary.contrastText",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Smart Tip
            </Typography>
            <Typography variant="body1">
              You've spent the most on{" "}
              <strong>{aggregated[0]?.category}</strong> this period. Consider
              setting a budget for this category to increase your savings rate!
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
