import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJs.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
);

function Chart({ income, expense, balance }) {
  const data = {
    labels: ["Income", "Expense", "Balance"],
    datasets: [
      {
        label: "Amount",
        data: [income, expense, balance],
        backgroundColor: ["#10b981", "#f43f5e", "#6366f1"],
        borderColor: ["rgba(16, 185, 129, 0.2)", "rgba(244, 63, 94, 0.2)", "rgba(99, 102, 241, 0.2)"],
        borderWidth: 1,
        hoverOffset: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#cbd5e1", // Slate-300
          padding: 20,
          font: {
            family: "'Plus Jakarta Sans', sans-serif",
            size: 12,
            weight: "500"
          }
        }
      },
      tooltip: {
        backgroundColor: "#110e1a",
        titleColor: "#ffffff",
        bodyColor: "#f3f4f6",
        borderColor: "rgba(255, 255, 255, 0.08)",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== undefined) {
              label += '₹' + context.parsed.toLocaleString();
            }
            return label;
          }
        }
      }
    },
    cutout: "70%" // Creates a sleek donut appearance
  };

  return (
    <div className="w-full h-full min-h-[250px] relative flex items-center justify-center">
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default Chart;
