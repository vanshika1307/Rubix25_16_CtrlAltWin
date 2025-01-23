import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ data }) => {
  // Extract dates and scores from the array
  const labels = data.map((item) => new Date(item.date).toDateString());
  const scores = data.map((item) => item.score);

  // Chart.js data configuration
  const chartData = {
    labels,
    datasets: [
      {
        label: "User Scores Over Time",
        data: scores,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  // Chart.js options
  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
    scales: {
      x: { title: { display: true, text: "Dates" } },
      y: { title: { display: true, text: "Scores" } },
    },
  };

  return <Line data={chartData} options={options} />;
};

export const Graph = ({ data }) => {
  if (!data) return <></>;
  return (
    <>
      <LineChart data={data} />
    </>
  );
};
