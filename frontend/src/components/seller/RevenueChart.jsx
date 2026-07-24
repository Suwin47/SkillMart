import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

function RevenueChart({ analytics = [] }) {
  const labels =
    analytics.length > 0
      ? analytics.map((item) => item.month)
      : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

  const revenue =
    analytics.length > 0
      ? analytics.map((item) => item.revenue)
      : [0, 0, 0, 0, 0, 0, 0];

  const data = {
    labels,

    datasets: [
      {
        label: "Revenue (₹)",

        data: revenue,

        borderColor: "#2563eb",

        backgroundColor: "rgba(37,99,235,0.15)",

        pointBackgroundColor: "#2563eb",

        pointRadius: 5,

        borderWidth: 3,

        tension: 0.4,

        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      title: {
        display: true,
        text: "Monthly Revenue",
        font: {
          size: 18,
        },
      },
    },

    scales: {
      y: {
        beginAtZero: true,

        ticks: {
          callback: (value) => `₹${value}`,
        },
      },
    },
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow">

      <div className="h-96">

        <Line
          data={data}
          options={options}
        />

      </div>

    </div>
  );
}

export default RevenueChart;