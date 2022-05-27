import { FC } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";
import { useTheme } from "store/theme-context";
import { BAR_COLORS } from "helpers/constants";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export interface FilesChart {
  size: number;
  fileName: string;
}

export interface FileChartProps {
  files: FilesChart[];
  title: string;
}

const FileChart: FC<FileChartProps> = ({ files, title }) => {
  const { isDark } = useTheme();
  const labels: string[] = [];
  const data: number[] = [];

  // populate labels and data by looping into files props
  files.forEach(({ fileName, size }) => {
    labels.push(fileName);
    data.push(+(size * 0.00000095367432).toFixed(2));
  });

  const OPTIONS = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        labels: {
          color: isDark ? "#BDBDBD" : "#000000",
        },
      },
    },
  };

  const DATA = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: BAR_COLORS.slice(0, files.length),
        borderColor: isDark ? "#FF8B3D" : "#FFFFFF",
        borderWidth: 1.2,
      },
    ],
    borderWidth: 1,
  };

  console.log("FileChart.", files);

  return (
    <>
      <small
        style={{ textAlign: "center", color: isDark ? "#BDBDBD" : "#000000" }}
      >
        {title}
      </small>
      <PolarArea redraw={true} options={OPTIONS} data={DATA} />
    </>
  );
};

export default FileChart;
