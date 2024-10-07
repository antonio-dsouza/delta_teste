import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { getStudentDashboard } from "@/services/studentService";
import toastOptions from "@services/toastConfig";
import { toast } from "react-toastify";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type ChartDataType = ChartData<"bar", number[], string>;

export default function StudentChart() {
  const [chartData, setChartData] = useState<ChartDataType>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const stats = await getStudentDashboard();

        const data: ChartDataType = {
          labels: ["Total", "Última Semana", "Último Mês"],
          datasets: [
            {
              label: "Alunos",
              data: [
                stats.total_students,
                stats.students_last_week,
                stats.students_last_month,
              ],
              backgroundColor: ["rgba(75, 192, 192, 0.2)"],
              borderColor: ["rgba(75, 192, 192, 1)"],
              borderWidth: 1,
            },
          ],
        };
        setChartData(data);
      } catch {
        toast.error("Erro ao carregar os dados do gráfico.", toastOptions);
      }
    }

    fetchData();
  }, []);

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}
