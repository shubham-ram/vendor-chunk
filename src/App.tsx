import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Initialize Day.js plugins
dayjs.extend(relativeTime);

// Placeholder for Insights
const Insights = () => (
  <div style={{ padding: "20px", textAlign: "center" }}>
    <h2>Insights & Analytics</h2>
    <p>Coming soon: Deep dive into your spending habits</p>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="insights" element={<Insights />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
