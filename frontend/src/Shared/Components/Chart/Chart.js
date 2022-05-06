import { Line, Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  BarController, 
  LinearScale, 
  BarElement, 
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend} 
from "chart.js";
import { ConvertChartData} from './ProcessData';

ChartJS.register(CategoryScale, BarController, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);


export const BarChart = (props) => {
  const { data, type } = props; 
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: "THỐNG KÊ",
      },
      tooltip: {
        callbacks: {
          title: function (type) {
            return type === "total" ? "Tổng tiền: " : "Lượng đặt phòng: ";
          }
        }
      },
    },
  };
  if (type === "total") {
    options.indexAxis = "y"
  }
  const labels = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"];
  const dataChart = {
    labels,
    datasets: ConvertChartData(data, type)
  };
  return <Bar options={options} data={dataChart} />;
}
